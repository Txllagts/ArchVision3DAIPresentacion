import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/v1', apiRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'ArchVision 3D AI API Service is running',
    version: '1.0.0',
    documentation: '/api/v1/health'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 ArchVision Backend Server running on http://localhost:${PORT}`);
});
