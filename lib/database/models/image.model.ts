import { Document, Schema, model, models } from "mongoose"

export interface IImage extends Document {
    title: string;
    transformationType: string;
    publicId: string;
    secureURL: string; 
    width?: number;
    height?: number;
    config?: object; 
    transformationUrl?: string; 
    aspectRatio?: string;
    color?: string;
    prompt?: string;
    author: {
        _id: string;
        firstName: string;
        lastName: string;
    }
    createdAt?: Date;
    updatedAt?: Date;
}

const ImageSchema = new Schema({
    author: {type:Schema.Types.ObjectId, ref: 'User'},
    publicId: {type: String, required: true},
    title: {type: String, required: true},
    transformationType: {type: String, required: true},
    secureURL: {type: String, required: true},
    width: {type: Number},
    height: {type: Number},
    config: {type: Object},
    transformationURL: {type: String},
    aspectRatio: {type:String},
    color: {type: String},
    prompt: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
})

const Image = models?.Image || model('Image', ImageSchema)

export default Image