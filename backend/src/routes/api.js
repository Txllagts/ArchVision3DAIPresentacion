import express from 'express';
import { generate3DModel } from '../controllers/aiController.js';
import { processChatMessage } from '../controllers/chatController.js';

const router = express.Router();

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'ArchVision 3D AI Backend API' });
});

// AI endpoints
router.post('/image-to-3d/generate', generate3DModel);

// Copilot Chat & Audit endpoints
router.post('/chat', processChatMessage);

export default router;
