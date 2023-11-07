import mongoose from 'mongoose'
const Schema = mongoose.Schema

const FileSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    file: {
        type: String,
        require: true
    },
    size: {
        type: Number,
        require: true
    },
    idSolicitation: {
        type: Number,
        require: true
    },
    createdAt: {
        type: Date,
    }
})

export default mongoose.model("File", FileSchema)