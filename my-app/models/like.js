import mongoose from 'mongoose'

const likeSchema = new mongoose.Schema({
    belongToItemId: { type: String },
    belongToItemCollection: { type: String },
    authorId: { type: String },
}, {timestamps: true,
    toJSON: { virtuals: true }, // 允许 JSON 包含虚拟字段
    toObject: { virtuals: true }
 });


const modelLike = mongoose.models.like || mongoose.model('like', likeSchema);
export {
    modelLike
}
