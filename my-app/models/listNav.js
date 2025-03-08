import mongoose from 'mongoose';

export const listNavSchema = new mongoose.Schema({
    title: { type: String, requied: true },
    link: { type: String, required: true },
    colName: { type: String, required: true }  
}, { timestamps: true});

const modelListNav = mongoose.models.ListNav || mongoose.model('ListNav', listNavSchema)
export {
    modelListNav
}