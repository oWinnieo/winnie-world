import mongoose from 'mongoose'

const IntroSchema = new mongoose.Schema({
    content: { type: String },
    authorId: { type: String }
}, { timestamps: true });

const modelIntro = mongoose.models.intro || mongoose.model('intro', IntroSchema)

export {
    modelIntro
}