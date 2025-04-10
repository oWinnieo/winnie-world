import mongoose from 'mongoose';

// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   createdAt: { type: Date, default: Date.now },
// });
export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  image: { type: String, required: true },
  // 可根据需求添加更多字段
  role: { type: String, default: 'viewer' }, // wtest viewer, editor, owner, admin
  // authorId: { type: String },
  editorId: { type: String }
},{ timestamps: true });

const modelUser = mongoose.models.User || mongoose.model('User', UserSchema);

export {
  modelUser
}
// 防止重复编译模型
// export default mongoose.models.User || mongoose.model('User', UserSchema);