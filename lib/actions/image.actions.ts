"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { v2 as cloudinary } from "cloudinary"

import { addImageParams, getAllImageParams, updateImageParams } from "@/types/image"
import { connectToDatabase } from "../database/mongoose"
import { handleError } from "../utils"
import User from "../database/models/user.model"
import Image from "../database/models/image.model"

// add image to db
export async function addImage({ image, userId, path }: addImageParams) {
    try {
        await connectToDatabase()

        const author = await User.findById(userId);

        if (!author) {
            throw new Error('User not found.')
        }

        const newImage = await Image.create({
            ...image,
            author: author._id,
        })
        
        revalidatePath(path)

        return JSON.parse(JSON.stringify(newImage))
    } catch (error) {
        handleError(error)
    }
}

export async function updateImage({ image, userId, path }: updateImageParams) {
    try {
        await connectToDatabase()

        const imageToUpdate = await Image.findById(image._id)

        if (!imageToUpdate || imageToUpdate.author.toHexString() !== userId) {
            throw new Error('No image found')
        }

        const updatedImage = Image.findByIdAndUpdate(
            imageToUpdate._id, 
            image, 
            {new: true}
        )
        
        revalidatePath(path)

        return JSON.parse(JSON.stringify(updatedImage))
    } catch (error) {
        handleError(error)
    }
}

export async function deleteImage(imageId: string) {
    try {
        await connectToDatabase()

        await Image.findByIdAndDelete(imageId)
    } catch (error) {
        handleError(error)
    } finally {
        redirect('/')
    }
}
export async function getImageById(imageId: string) {
    try {
        await connectToDatabase()

        const image = await populateUser(Image.findById(imageId))

        if (!image) {
            throw new Error('Image not found.')
        }

        return JSON.parse(JSON.stringify(image))
    } catch (error) {
        handleError(error)
    }
}

export async function getImages({ limit = 5, page = 1, query = '' }: getAllImageParams) {
    try {
        await connectToDatabase()

        cloudinary.config({
            cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true
        })

        let expression = 'folder=recreate'

        if (query) {
            expression += ` AND ${query}`
        }

        const { resources } = await cloudinary.search.expression(expression).execute()

        const resourceIds = resources.map((item: any) => item.public_id)

        let searchQuery = {}

        if (query) {
            searchQuery = {
                publicId: {
                    $in: resourceIds
                }
            }
        }

        const skipAmount = (Number(page) - 1) * limit

        const images = await populateUser(Image.find(searchQuery))
            .sort({ updatedAt: -1 })
            .skip(skipAmount)
            .limit(limit)

        const totalImages = await Image.find(searchQuery).countDocuments()
        const savedImages = await Image.find().countDocuments()

        return {
            data: JSON.parse(JSON.stringify(images)),
            totalPage: Math.ceil(totalImages / limit),
            savedImages
        }
    } catch (error) {
        handleError(error)
    }
}

const populateUser = (query: any) => query.populate({
        path: 'author',
        model: User,
        select: '_id clerkId firstName lastName username'
    })
