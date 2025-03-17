import mongoose from 'mongoose'

const favoriteSchema = new mongoose.Schema({
    belongToItemId: { type: String, required: true },
    belongToItemCollection: { type: String, required: true },
    authorId: { type: String, required: true },
}, {timestamps: true,
    toJSON: { virtuals: true }, // 允许 JSON 包含虚拟字段
    toObject: { virtuals: true }
 });


const modelFavorite = mongoose.models.favorite || mongoose.model('favorite', favoriteSchema);
export {
    modelFavorite
}
