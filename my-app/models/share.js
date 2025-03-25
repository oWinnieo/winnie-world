import mongoose from 'mongoose'

const shareSchema = new mongoose.Schema({
    belongToItemId: { type: String, required: true },
    belongToItemCollection: { type: String, required: true },
    authorId: { type: String, required: true },
}, {timestamps: true,
    toJSON: { virtuals: true }, // 允许 JSON 包含虚拟字段
    toObject: { virtuals: true }
 });


const modelShare = mongoose.models.share || mongoose.model('share', shareSchema);
export {
    modelShare
}
