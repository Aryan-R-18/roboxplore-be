import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logFile = path.join(__dirname, 'error.log');

export const logError = (message, error) => {
  const timestamp = new Date().toISOString();
  const logMessage = `
===========================================
${timestamp}
${message}
${error ? `Error: ${error.message}\nStack: ${error.stack}` : ''}
===========================================
`;
  
  console.error(logMessage);
  fs.appendFileSync(logFile, logMessage);
};

export const logInfo = (message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  
  console.log(logMessage);
  fs.appendFileSync(logFile, logMessage);
};
