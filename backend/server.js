import express from 'express';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import itemsRouter from './routes/items.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const LOG_DIR = path.join(__dirname, 'logs');
fs.mkdirSync(LOG_DIR, { recursive: true });

const accessLog = fs.createWriteStream(
  path.join(LOG_DIR, 'access.log'),
  { flags: 'a' }
);

const app = express();
app.use(express.json());
app.use(morgan('combined', { stream: accessLog }));

app.use('/items', itemsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Micro-service démarré sur http://localhost:${PORT}`);
});
