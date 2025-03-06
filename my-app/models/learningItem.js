import mongoose from 'mongoose';

const LearningItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }, // unique: true
  authorId: { type: String, required: true },
  // createdAt: { type: Date, default: Date.now },
  // updatedAt: { type: Date },
},{ timestamps: true } // ✅ 启用 `createdAt` & `updatedAt`
);

// 添加静态方法来处理删除操作
// LearningItemSchema.statics.deleteById = async function (id) {
//   console.log('deleteById id', id)
//   try {
//     const deletedItem = await this.findByIdAndDelete(id);
//     return deletedItem;
//   } catch (error) {
//     throw new Error(`Failed to delete item with ID ${id}: ${error.message}`);
//   }
// };

const modelEn = mongoose.models.english || mongoose.model('english', LearningItemSchema);
const modelJp = mongoose.models.japanese || mongoose.model('japanese', LearningItemSchema);
const modelServer = mongoose.models.server || mongoose.model('server', LearningItemSchema);
const LearningItem = mongoose.models.LearningItem || mongoose.model('LearningItem', LearningItemSchema);

// 防止重复编译模型
export {
  modelEn,
  modelJp,
  modelServer,
  LearningItem // wtest
}
// export default 
