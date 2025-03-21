import mongoose from 'mongoose';

export const listNavSchema = new mongoose.Schema({
    title: { type: String, requied: true }, // wtest unique: true 
    link: { type: String },
    colName: { type: String, required: true },
    groupName: { type: String, required: true },
    authorId: { type: String, required: true },
}, { timestamps: true});

const modelListNav = mongoose.models.ListNav || mongoose.model('ListNav', listNavSchema)
export {
    modelListNav
}