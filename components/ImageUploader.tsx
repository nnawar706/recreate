import { CldUploadWidget } from 'next-cloudinary'

import { useToast } from './ui/use-toast'
import { imageUploaderProps } from '@/types/general'

const ImageUploader = ({onValueChange, setImage, image, 
    publicId, type, credit}: imageUploaderProps) => {
    const { toast } = useToast()

    const onSuccess = (response: any) => {
        toast({
            title: 'Image uploaded successfully',
            description: `2 credits used. Reamining credit: ${credit - 2}`,
            duration: 5000,
            className: "bg-blue-100 text-light-600"
        })
    }
    
    const onError = () => {
        toast({
            title: 'Something went wrong while uploading',
            description: 'Pleast try again',
            duration: 5000,
            className: "bg-red-100 text-light-600"
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
            

                {publicId ? (<>the image</>) : (<>no image</>)}
            </div>
        )}
        </CldUploadWidget>
    )
}

export default ImageUploader
