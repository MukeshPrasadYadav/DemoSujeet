import express from 'express'
import ConnectDB from './config/DBSettings';
import { logger } from './Utils/logger'
import app from './app';
import dotenv from 'dotenv';
dotenv.config();

const Port=process.env.PORT;
console.log(Port);

(async () => {
  try {
    await ConnectDB(); // ✅ wait for DB to connect
    app.listen(Port, () => {
      logger.info(`🚀 Server running on port ${Port}`);
    });
  } catch (error: any) {
    logger.error(`❌ Failed to start server: ${error.message}`);
    process.exit(1);
  }
})();