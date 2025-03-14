import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    belongToItemId: { type: String, required: true },
    belongToItemCollection: { type: String, required: true },
    replyToCommentId: { type: String },
    authorId: { type: String, required: true },
    like: { type: Number },
    favorite: { type: Number },
}, {timestamps: true });


const modelComment = mongoose.models.comment || mongoose.model('comment', commentSchema);
export {
    modelComment
}
