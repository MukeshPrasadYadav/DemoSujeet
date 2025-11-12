import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, RefreshCw, Activity, ZoomIn, ZoomOut } from 'lucide-react';

export default function PageWithGraph() {
  const canvasRef = useRef(null);
  const [chartData, setChartData] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [priceChange, setPriceChange] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [pair, setPair] = useState('EUR/USD');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hoveredCandle, setHoveredCandle] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const generateRealisticData = () => {
    const dataPoints = 120;
    const data = [];
    const startPrice = 1.10 + Math.random() * 0.15;
    let price = startPrice;
    
    const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
    const startMonth = Math.floor(Math.random() * 3);
    
    for (let i = 0; i < dataPoints; i++) {
      const volatility = 0.003;
      const trend = (Math.random() - 0.48) * volatility;
      const noise = (Math.random() - 0.5) * volatility * 0.5;
      
      const open = price;
      price = price + trend + noise;
      price = Math.max(1.08, Math.min(1.22, price));
      const close = price;
      
      const high = Math.max(open, close) + Math.random() * 0.002;
      const low = Math.min(open, close) - Math.random() * 0.002;
      
      const monthIndex = startMonth + Math.floor((i / dataPoints) * 4);
      const month = months[Math.min(monthIndex, months.length - 1)];
      
      data.push({
        time: month,
        open: parseFloat(open.toFixed(5)),
        high: parseFloat(high.toFixed(5)),
        low: parseFloat(low.toFixed(5)),
        close: parseFloat(close.toFixed(5))
      });
    }
    
    return data;
  };

  const drawChart = () => {
    const canvas = canvasRef.current;
    if (!canvas || chartData.length === 0) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, width, height);

    // Calculate visible data points based on zoom
    const visiblePoints = Math.floor(chartData.length / zoomLevel);
    const startIndex = Math.max(0, chartData.length - visiblePoints);
    const visibleData = chartData.slice(startIndex);

    if (visibleData.length === 0) return;

    // Find min and max prices
    const prices = visibleData.flatMap(d => [d.high, d.low]);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;
    const padding = priceRange * 0.1;

    // Drawing parameters
    const chartTop = 40;
    const chartBottom = height - 60;
    const chartHeight = chartBottom - chartTop;
    const chartLeft = 60;
    const chartRight = width - 40;
    const chartWidth = chartRight - chartLeft;

    // Draw grid
    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = chartTop + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.setLineDash([5, 5]);
      ctx.moveTo(chartLeft, y);
      ctx.lineTo(chartRight, y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Price labels
      const price = maxPrice + padding - ((maxPrice + padding - (minPrice - padding)) / 5) * i;
      ctx.fillStyle = '#6b7280';
      ctx.font = '12px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(price.toFixed(4), chartLeft - 10, y + 4);
    }

    // Draw current price line
    const currentPriceY = chartTop + ((maxPrice + padding - currentPrice) / (maxPrice + padding - (minPrice - padding))) * chartHeight;
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(chartLeft, currentPriceY);
    ctx.lineTo(chartRight, currentPriceY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Current price label
    ctx.fillStyle = '#06b6d4';
    ctx.fillRect(chartRight + 5, currentPriceY - 12, 70, 24);
    ctx.fillStyle = '#000';
    ctx.font = 'bold 12px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(currentPrice.toFixed(4), chartRight + 10, currentPriceY + 4);

    // Calculate candle width based on zoom
    const candleSpacing = chartWidth / visibleData.length;
    const candleWidth = Math.max(2, Math.min(candleSpacing * 0.7, 20));

    // Draw candles
    visibleData.forEach((candle, i) => {
      const x = chartLeft + (i * candleSpacing) + (candleSpacing / 2);
      const isGreen = candle.close >= candle.open;
      
      const openY = chartTop + ((maxPrice + padding - candle.open) / (maxPrice + padding - (minPrice - padding))) * chartHeight;
      const closeY = chartTop + ((maxPrice + padding - candle.close) / (maxPrice + padding - (minPrice - padding))) * chartHeight;
      const highY = chartTop + ((maxPrice + padding - candle.high) / (maxPrice + padding - (minPrice - padding))) * chartHeight;
      const lowY = chartTop + ((maxPrice + padding - candle.low) / (maxPrice + padding - (minPrice - padding))) * chartHeight;

      // Draw wick (high-low line)
      ctx.strokeStyle = isGreen ? '#10b981' : '#ef4444';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, highY);
      ctx.lineTo(x, lowY);
      ctx.stroke();

      // Draw candle body
      if (zoomLevel > 2) {
        // Show full candles when zoomed in
        ctx.fillStyle = isGreen ? '#10b981' : '#ef4444';
        const bodyHeight = Math.abs(closeY - openY);
        const bodyTop = Math.min(openY, closeY);
        ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, Math.max(bodyHeight, 1));
        
        // Add border for hollow candles effect
        ctx.strokeStyle = isGreen ? '#10b981' : '#ef4444';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(x - candleWidth / 2, bodyTop, candleWidth, Math.max(bodyHeight, 1));
      } else {
        // Show line chart when zoomed out
        if (i > 0) {
          const prevCandle = visibleData[i - 1];
          const prevX = chartLeft + ((i - 1) * candleSpacing) + (candleSpacing / 2);
          const prevCloseY = chartTop + ((maxPrice + padding - prevCandle.close) / (maxPrice + padding - (minPrice - padding))) * chartHeight;
          
          ctx.strokeStyle = '#10b981';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(prevX, prevCloseY);
          ctx.lineTo(x, closeY);
          ctx.stroke();
        }
      }

      // Highlight hovered candle
      if (hoveredCandle === i) {
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2;
        ctx.strokeRect(x - candleWidth / 2 - 2, highY - 2, candleWidth + 4, lowY - highY + 4);
      }
    });

    // Draw time labels
    const labelInterval = Math.ceil(visibleData.length / 6);
    visibleData.forEach((candle, i) => {
      if (i % labelInterval === 0) {
        const x = chartLeft + (i * candleSpacing) + (candleSpacing / 2);
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(candle.time, x, height - 35);
      }
    });

    // Draw zoom level indicator
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`Finnhub - OANDA:${pair.replace('/', '_')} chart`, chartLeft, 25);
  };

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    
    const chartLeft = 60;
    const chartRight = canvas.width - 40;
    const chartWidth = chartRight - chartLeft;
    
    const visiblePoints = Math.floor(chartData.length / zoomLevel);
    const startIndex = Math.max(0, chartData.length - visiblePoints);
    const visibleData = chartData.slice(startIndex);
    
    const candleSpacing = chartWidth / visibleData.length;
    const clickedIndex = Math.floor((x - chartLeft) / candleSpacing);
    
    if (clickedIndex >= 0 && clickedIndex < visibleData.length) {
      setHoveredCandle(clickedIndex);
    }
  };

  const handleCanvasMouseMove = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePos({ x: e.clientX, y: e.clientY });
    
    const chartLeft = 60;
    const chartRight = canvas.width - 40;
    const chartWidth = chartRight - chartLeft;
    
    const visiblePoints = Math.floor(chartData.length / zoomLevel);
    const startIndex = Math.max(0, chartData.length - visiblePoints);
    const visibleData = chartData.slice(startIndex);
    
    const candleSpacing = chartWidth / visibleData.length;
    const hoveredIndex = Math.floor((x - chartLeft) / candleSpacing);
    
    if (hoveredIndex >= 0 && hoveredIndex < visibleData.length && x >= chartLeft && x <= chartRight) {
      setHoveredCandle(hoveredIndex);
    } else {
      setHoveredCandle(null);
    }
  };

  useEffect(() => {
    drawChart();
  }, [chartData, zoomLevel, hoveredCandle]);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        drawChart();
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [chartData, zoomLevel]);

  const loadNewGraph = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newData = generateRealisticData();
      setChartData(newData);
      
      const lastCandle = newData[newData.length - 1];
      const firstCandle = newData[0];
      const change = ((lastCandle.close - firstCandle.open) / firstCandle.open) * 100;
      
      setCurrentPrice(lastCandle.close);
      setPriceChange(change);
      setIsLoading(false);
      setZoomLevel(1);
    }, 800);
  };

  useEffect(() => {
    loadNewGraph();
  }, []);

  const tradingPairs = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD', 'USD/CHF'];

  const visiblePoints = Math.floor(chartData.length / zoomLevel);
  const startIndex = Math.max(0, chartData.length - visiblePoints);
  const visibleData = chartData.slice(startIndex);
  const hoveredCandleData = hoveredCandle !== null ? visibleData[hoveredCandle] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-cyan-400" />
              <h1 className="text-3xl font-bold text-white">Live Trading Chart</h1>
            </div>
          
          </div>

          {/* Trading Pair Selector */}
          <div className="flex gap-3 mb-6">
            {tradingPairs.map((p) => (
              <button
                key={p}
                onClick={() => {
                  setPair(p);
                  loadNewGraph();
                }}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  pair === p
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/50'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Price Info */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Current Price</p>
                <h2 className="text-4xl font-bold text-white">{currentPrice.toFixed(5)}</h2>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm mb-1">24h Change</p>
                <div className={`flex items-center gap-2 text-2xl font-bold ${
                  priceChange >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {priceChange >= 0 ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
                  {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Container */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 shadow-2xl">
          {/* Zoom Controls */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setZoomLevel(Math.max(1, zoomLevel - 0.5))}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-all"
              >
                <ZoomOut className="w-4 h-4" />
                Zoom Out
              </button>
              <button
                onClick={() => setZoomLevel(Math.min(10, zoomLevel + 0.5))}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-all"
              >
                <ZoomIn className="w-4 h-4" />
                Zoom In
              </button>
              <span className="text-gray-400 text-sm">Zoom: {zoomLevel.toFixed(1)}x</span>
            </div>
            <div className="text-gray-400 text-sm">
              {zoomLevel > 2 ? 'Candlestick View' : 'Line View'}
            </div>
          </div>

          {isLoading ? (
            <div className="h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-400 border-t-transparent mx-auto mb-4"></div>
                <p className="text-gray-400">Loading chart data...</p>
              </div>
            </div>
          ) : (
            <div className="relative">
              <canvas
                ref={canvasRef}
                onClick={handleCanvasClick}
                onMouseMove={handleCanvasMouseMove}
                onMouseLeave={() => setHoveredCandle(null)}
                className="w-full h-96 cursor-crosshair"
                style={{ width: '100%', height: '400px' }}
              />
              
              {/* Tooltip */}
              {hoveredCandleData && (
                <div 
                  className="absolute bg-gray-900/95 border border-cyan-500/30 rounded-lg p-3 shadow-xl pointer-events-none z-10"
                  style={{
                    left: mousePos.x - 300,
                    top: mousePos.y - 250
                  }}
                >
                  <p className="text-cyan-400 font-semibold text-sm mb-2">{hoveredCandleData.time}</p>
                  <div className="space-y-1 text-sm">
                    <p className="text-white"><span className="text-gray-400">Open:</span> <span className="font-bold">{hoveredCandleData.open.toFixed(5)}</span></p>
                    <p className="text-white"><span className="text-gray-400">High:</span> <span className="font-bold text-green-400">{hoveredCandleData.high.toFixed(5)}</span></p>
                    <p className="text-white"><span className="text-gray-400">Low:</span> <span className="font-bold text-red-400">{hoveredCandleData.low.toFixed(5)}</span></p>
                    <p className="text-white"><span className="text-gray-400">Close:</span> <span className="font-bold">{hoveredCandleData.close.toFixed(5)}</span></p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Chart Instructions */}
          <div className="mt-6 flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-400">Bullish</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-400">Bearish</span>
              </div>
            </div>
            <div className="text-gray-500">
              Zoom in to see candlestick patterns • Hover for details
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-2">High</p>
            <p className="text-2xl font-bold text-green-400">
              {chartData.length > 0 ? Math.max(...chartData.map(d => d.high)).toFixed(5) : '0.00000'}
            </p>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-2">Low</p>
            <p className="text-2xl font-bold text-red-400">
              {chartData.length > 0 ? Math.min(...chartData.map(d => d.low)).toFixed(5) : '0.00000'}
            </p>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-2">Volatility</p>
            <p className="text-2xl font-bold text-cyan-400">
              {chartData.length > 0 ? 
                ((Math.max(...chartData.map(d => d.high)) - Math.min(...chartData.map(d => d.low))) * 100).toFixed(2) 
                : '0.00'}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}