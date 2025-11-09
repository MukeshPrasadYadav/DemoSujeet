import BeneathHero from '@/components/OtherComponent/BeneathHero'
import Header from '@/components/OtherComponent/Header'
import HeroSection from '@/components/OtherComponent/HeroSection'
import PricingSection from '@/components/OtherComponent/PricingSection'
import ProductSection from '@/components/OtherComponent/ProductSection'
import TradingPlatformSection from '@/components/OtherComponent/TradingPlatformSection'
import React from 'react'
import TrustSection from '../components/OtherComponent/ToggleAccordance'
import MarketNewsSection from '@/components/OtherComponent/TradingMarketSection'
import LatestHighlights from '@/components/OtherComponent/LatestHighlight'
import StartInvestingSection from '@/components/OtherComponent/StartInvestingSection'
import Footer from '@/components/OtherComponent/Footer'

const LandingPage = () => {
  return (
    <div className='flex flex-col'>
        <Header/>
        <HeroSection/>
        <BeneathHero />
        <ProductSection />
        <PricingSection />
        <TradingPlatformSection/>
        <TrustSection />
        <MarketNewsSection/>
        <LatestHighlights />
        <StartInvestingSection/>
        <Footer />
    

    </div>
  )
}

export default LandingPage