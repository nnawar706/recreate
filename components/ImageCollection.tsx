"use client"

import Image from "next/image"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { CldImage } from "next-cloudinary"

import {
    Pagination,
    PaginationContent,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"
import { transformationTypes } from "@/constants"
import { formUrlQuery } from "@/lib/utils"
import { collection } from "@/types/image"
import Search from "./Search"
import { IImage } from "@/lib/database/models/image.model"
import { TransformationTypeKey } from "@/types/general"


export const ImageCollection = ({ hasSearch = false, images, totalPages = 1, 
    page }: collection) => {
    const searchParams = useSearchParams()
    const { push } = useRouter()

    const onPageChange = (type: string) => {
        const pageValue = type === "next" ? Number(page) + 1 : Number(page) - 1

        const newUrl = formUrlQuery({
            searchParams: searchParams.toString(),
            key: "page",
            value: pageValue,
        })

        push(newUrl, { scroll: false })
    }

    return (
        <section>
            <div className="mb-14 flex flex-col md:flex-row gap-5 md:justify-between md:items-center">
                <h2 className="font-semibold text-lg capitalize">recent edits</h2>
                {hasSearch && <Search/>}
            </div>

            {images.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {images.map((item: IImage) => (
                        <ImageCard image={item} key={item._id}/>
                    ))}
                </ul>
            ) 
            : (
                <div className="flex items-center justify-center h-60 w-full rounded-md">
                    <p className="font-semibold">No Collection Found.</p>
                </div>
            )}

            {totalPages > 1 && (
                <Pagination className="mt-10">
                    <PaginationContent className="flex w-full">
                        <Button disabled={Number(page) <= 1}
                        onClick={() => onPageChange('prev')}>
                            <PaginationPrevious/>
                        </Button>
                        <p className="flex flex-1 items-center justify-center w-fit">
                            {page} / {totalPages}
                        </p>
                        <Button disabled={Number(page) >= totalPages}
                        onClick={() => onPageChange('next')}>
                            <PaginationNext/>
                        </Button>
                    </PaginationContent>
                </Pagination>
            )}
        </section>
    )
}

const ImageCard = ({ image }: { image: IImage }) => {
    return (
        <li>
            <Link href={`/transformations/${image._id}`}
            className="flex flex-1 flex-col gap-5 cursor-pointer rounded-md p-4 border-2 
            border-purple-600/15 shadow-md shadow-purple-500/10 transition-all hover:shadow-purple-500/20">
                <CldImage
                    src={image.publicId}
                    alt={image.title}
                    width={image.width}
                    height={image.height}
                    {...image.config}
                    loading="lazy"
                    className="h-52 w-full rounded-md object-cover"
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                />
                <div className="flex justify-between">
                    <p className="mr-3 line-clamp-1">{image.title}</p>
                    <Image src={`/icons/${transformationTypes[image.transformationType as TransformationTypeKey].icon}`} 
                    alt={image.title} width={24} height={24}/>
                </div>
            </Link>
        </li>
    )
}