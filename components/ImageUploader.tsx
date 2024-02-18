"use client"

import { CldImage, CldUploadWidget } from 'next-cloudinary'
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

import { useToast } from './ui/use-toast'
import { imageUploaderProps } from '@/types/general'
import { add } from '@/app/assets'
import { dataUrl, getImageSize } from '@/lib/utils'

const ImageUploader = ({onValueChange, setImage, image, 
    publicId, type, credit}: imageUploaderProps) => {
    const { toast } = useToast()

    const onSuccess = (response: any) => {
        setImage((prev: any) => ({
            ...prev,
            publicId: response?.info?.public_id,
            width: response?.info?.width,
            height: response?.info?.height,
            secureUrl: response?.info?.secure_url
        }))

        onValueChange(response?.info?.public_id)

        toast({
            title: 'Image uploaded successfully',
            description: `2 credits used. Reamining credit: ${credit - 2}`,
            duration: 5000,
            className: "bg-grey-900 text-light-600"
        })
    }
    
    const onError = () => {
        toast({
            title: 'Something went wrong while uploading',
            description: 'Pleast try again',
            duration: 5000,
            className: "bg-grey-900 text-red-600"
        })
    }

    return (
        <CldUploadWidget
            uploadPreset="next_recreate"
            options={{ 
                multiple: false,
                resourceType: 'image'
            }}
            onSuccess={onSuccess}
            onError={onError}
        >
        {({ open }) => (
            <div className="flex flex-col gap-4">
                <h3 className="text-light-600">Original</h3>
            

                {publicId ? (<div className="cursor-pointer overflow-hidden rounded-md mt-4">
                    <CldImage 
                        width={getImageSize(type, image, 'width')}
                        height={getImageSize(type, image, 'height')}
                        src={publicId}
                        alt="image"
                        sizes={"(max-width: 767px) 100vw, 50vw"}
                        placeholder={dataUrl as PlaceholderValue}
                        className="h-fit min-h-72 w-full rounded-md border border-dashed bg-purple-100/20 
                        object-cover p-2"
                    ></CldImage>
                </div>) 
                : (
                    <div className="flex flex-col items-center justify-center h-72 cursor-pointer 
                    rounded-md border border-dashed bg-gray-900 shadow-inner mt-4"
                    onClick={() => open()}>
                        <div className="rounded-md bg-dark-700 p-2 shadow-sm shadow-purple-200/50">
                            <Image src={add} alt="add-icon" height={24} width={24}/>
                        </div>
                        <p className="p-3">Click here to select image.</p>
                    </div>
                )}
            </div>
        )}
        </CldUploadWidget>
    )
}

export default ImageUploader
