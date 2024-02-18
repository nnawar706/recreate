import { transformedImageProps } from '@/types/transformation'
import { Button } from './ui/button'
import { Download } from 'lucide-react'

const TransformedImage = ({ image, type, title, isTransforming, setIsTransforming, 
    transformationConfig, hasDownload = false }: transformedImageProps) => {

    // TODO: add download function
    const onDownload = () => {}

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between">
                <h3 className="text-light-600">Transformed</h3>

                {/* {hasDownload && ( */}
                    <Button variant="outline" size="icon" 
                    onClick={onDownload}>
                        <Download className="h-4 w-4"/>
                    </Button>
                {/* )} */}
            </div>

            {image?.publicId && transformationConfig ? (
                <div className="relative"></div>
            ) : (
                <div className="flex flex-col items-center justify-center gap-5 h-full
                rounded-md border border-dashed bg-gray-800 shadow-inner">
                    Transformed Image
                </div>
            )}
        </div>
    )
}

export default TransformedImage
