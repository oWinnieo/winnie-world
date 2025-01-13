import mongoose from 'mongoose';

const LearningItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

// 防止重复编译模型
export default mongoose.models.LearningItem || mongoose.model('LearningItem', LearningItemSchema);