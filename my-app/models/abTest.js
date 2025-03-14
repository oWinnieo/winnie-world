import mongoose from 'mongoose'

const abtestSchema = new mongoose.Schema({
    content: { type: String, required: true },
    belongToItemId: { type: String, required: true },
    belongToItemCollection: { type: String, required: true },
    replyToCommentId: { type: String },
    authorId: { type: String, required: true },
    like: { type: Number },
    favorite: { type: Number },
    // aha: { type: String, required: true }
}, {
    timestamps: true,
    toJSON: { virtuals: true }, // 允许 JSON 包含虚拟字段
    toObject: { virtuals: true }
 });

const modelabtest = mongoose.models.abtest || mongoose.model('abtest', abtestSchema);
export {
    modelabtest
}