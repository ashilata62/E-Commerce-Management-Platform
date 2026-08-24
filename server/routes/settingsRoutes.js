import express from 'express';
import {
  getSettings,
  updateSettings,
  getUsersAndRoles,
  addUser,
  deleteUser,
} from '../controllers/settingsController.js';

const router = express.Router();

router.get('/', getSettings);
router.put('/', updateSettings);
router.get('/users', getUsersAndRoles);
router.post('/users', addUser);
router.delete('/users/:id', deleteUser);

export default router;
