import { auth } from '@clerk/nextjs'
import React from 'react'

import { getImageById } from '@/lib/actions/image.actions'
import { searchParamProps } from '@/types/general'
import Image from 'next/image'
import { getImageSize } from '@/lib/utils'
import TransformedImage from '@/components/TransformedImage'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import RemoveAlert from '@/components/RemoveAlert'

const TransformationInfo = async ({ params: { id } }: searchParamProps) => {
    const { userId } = auth()

    const image = await getImageById(id)

    return (
        <section>
            <div className="flex flex-row justify-between items-center mt-2">
                <div className=" mb-4">
                    <h2 className="font-bold">{image.title}</h2>
                    {userId !== image.author.clerkId && (
                        <small className="text-gray-400 text-xs">@{image.author.username}</small>
                    )}
                </div>
                {userId === image.author.clerkId && (
                    <div className="mt-4 space-x-2">
                        <Button asChild type="button">
                            <Link 
                                href={`/transformations/${image._id}/edit`}>
                                Edit
                            </Link>
                        </Button>

                        <RemoveAlert imageId={image._id}/>
                    </div>
                )}
            </div>
            <div className="flex gap-1 font-medium md:font-normal text-sm md:text-md 
            leading-[120%] md:leading-[140%]">
                <p>Transformation Type: </p>
                <p className="capitalize">{image.transformationType}</p>
            </div>

            {image.prompt && (
                <div className="flex items-center gap-2">
                    <p className="hidden md:block">&#x25CF;</p>
                    <div className="flex gap-1 font-medium md:font-normal text-sm md:text-md 
                    leading-[120%] md:leading-[140%]">
                        <p>Prompt:</p>
                        <p className="capitalize">{image.prompt}</p>
                    </div>
                </div>
            )}

            {image.color && (
                <div className="flex items-center gap-2">
                    <p className="hidden md:block">&#x25CF;</p>
                    <div className="flex gap-1 font-medium md:font-normal text-sm md:text-md 
                    leading-[120%] md:leading-[140%]">
                        <p>Color:</p>
                        <p className="capitalize">{image.color}</p>
                    </div>
                </div>
            )}

            {image.aspectRatio && (
                <div className="flex items-center gap-2">
                    <p className="hidden md:block">&#x25CF;</p>
                    <div className="flex gap-1 font-medium md:font-normal text-sm md:text-md 
                    leading-[120%] md:leading-[140%]">
                        <p>Aspect Ratio:</p>
                        <p className="capitalize">{image.aspectRatio}</p>
                    </div>
                </div>
            )}

            <div className="mt-10 border-t border-dark-400/15">
                <div className="grid grid-cols-1 md:grid-cols-2 h-fit min-h-[200px] gap-5 py-8">
                    <div className="flex flex-col gap-4">
                        <h3 className="text-light-600">Original</h3>
                        
                        <Image 
                            width={getImageSize(image.transformationType, image, 'width')}
                            height={getImageSize(image.transformationType, image, 'height')}
                            src={image.secureURL}
                            alt={image.title}
                            className="h-fit min-h-72 w-full rounded-md border border-dashed 
                            bg-purple-100/20 object-cover p-2 mt-4"
                        />
                    </div>

                    <TransformedImage
                        image={image}
                        type={image.transformationType}
                        title={image.title}
                        isTransforming={false}
                        transformationConfig={image.config}
                        hasDownload={true}                   
                    />
                </div>
            </div>
        </section>
    )
}

export default TransformationInfo