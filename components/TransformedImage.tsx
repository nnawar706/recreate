"use client"

import { transformedImageProps } from '@/types/transformation'
import { Button } from './ui/button'
import { Download } from 'lucide-react'
import { CldImage } from 'next-cloudinary'
import { dataUrl, debounce, getImageSize } from '@/lib/utils'
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import { spinner } from '@/app/assets'

const TransformedImage = ({ image, type, title, isTransforming, setIsTransforming, 
    transformationConfig, hasDownload = false }: transformedImageProps) => {

    // TODO: add download function
    const onDownload = () => {}

    return (
        <div className="flex flex-col gap-4 h-full">
            <div className="flex justify-between">
                <h3 className="text-light-600">Transformed</h3>

                <Button variant="outline" size="icon" 
                onClick={onDownload} disabled={!hasDownload}>
                    <Download className="h-4 w-4"/>
                </Button>
            </div>

            {image?.publicId && transformationConfig ? (
                <div className="relative">
                    <CldImage 
                        width={getImageSize(type, image, 'width')}
                        height={getImageSize(type, image, 'height')}
                        src={image.publicId}
                        alt={image.title}
                        sizes={"(max-width: 767px) 100vw, 50vw"}
                        placeholder={dataUrl as PlaceholderValue}
                        className="h-fit min-h-72 w-full rounded-md border border-dashed bg-purple-100/20 
                        object-cover p-2"
                        onLoad={() => {
                            setIsTransforming && setIsTransforming(false)
                        }}
                        onError={() => {
                            debounce(() => {
                                setIsTransforming && setIsTransforming(false)
                            }, 8000)
                        }}
                        {...transformationConfig}
                    />

                    {isTransforming && (
                        <div className="flex flex-col items-center justify-center gap-2 absolute border bg-gray-800 
                        left-2/4 top-2/4 size-full -translate-x-1/2 -translate-y-1/2 rounded-md">
                            <Image src={spinner} width="50" height="50" alt="transforming-icon"/>
                            <p className="text-white/80">Please wait...</p>
                        </div>
                    )}
                </div>
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
