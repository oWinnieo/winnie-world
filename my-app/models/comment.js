import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    belongToItemId: { type: String, required: true },
    belongToItemCollection: { type: String, required: true },
    replyToCommentId: { type: String },
    authorId: { type: String, required: true },
    like: { type: Number },
    favorite: { type: Number },
}, {timestamps: true,
    toJSON: { virtuals: true }, // 允许 JSON 包含虚拟字段
    toObject: { virtuals: true }
 });


const modelComment = mongoose.models.comment || mongoose.model('comment', commentSchema);
export {
    modelComment
}
