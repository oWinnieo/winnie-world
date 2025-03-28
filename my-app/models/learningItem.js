import mongoose from 'mongoose';
// import defaultUserSchema, { UserSchema } from './Users' // wtest

const LearningItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }, // unique: true
  // author: { type: authorSchema, required: true }
  authorId: { type: String, required: true },
  tags: { type: [String] },
  like: { type: Number },
  favorite: { type: Number },
  likeStatus: { type: Boolean },
  favoriteStatus: { type: Boolean }
},{ timestamps: true } // ✅ 启用 `createdAt` & `updatedAt`
);

const modelEn = mongoose.models.english || mongoose.model('english', LearningItemSchema);
const modelJp = mongoose.models.japanese || mongoose.model('japanese', LearningItemSchema);
const modelServer = mongoose.models.server || mongoose.model('server', LearningItemSchema);
const ModelLearningItem = mongoose.models.LearningItem || mongoose.model('LearningItem', LearningItemSchema);

// 防止重复编译模型
export {
  modelEn,
  modelJp,
  modelServer,
  ModelLearningItem // wtest
}
// export default 
