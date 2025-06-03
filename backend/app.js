import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

import logRoutes from './routes/log.js';

app.use('/api', apiRoutes);
app.use('/api', logRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
