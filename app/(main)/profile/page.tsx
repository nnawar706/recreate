import { auth } from "@clerk/nextjs"
import Image from "next/image"
import { redirect } from "next/navigation"

import { searchParamProps } from "@/types/general"
import { getUserById } from "@/lib/actions/user.actions"
import { getUserImages } from "@/lib/actions/image.actions"
import TransformationHeader from "@/components/TransformationHeader"
import { coins, photo } from "@/app/assets"
import { ImageCollection } from "@/components/ImageCollection"

const Profile = async ({ searchParams }: searchParamProps) => {
    const { userId } = auth()
    const page = Number(searchParams?.page) || 1

    if (!userId) redirect('/sign-in')

    const user = await getUserById(userId)
    const files = await getUserImages({page, userId: user._id})
    
    return (
        <section>
            <TransformationHeader title="Profile"/>

            <div className="mt-5 md:mt-8 flex flex-col md:flex-row gap-5 md:gap-10">
                <div className="w-full rounded-lg border-2 border-purple-600/20 p-5 shadow-sm 
                shadow-purple-600/20 md: px-6 md: py-8">
                    <p className="font-medium uppercase test-sm md:text-base">credits available</p>
                    <div className="mt-4 flex items-center gap-4">
                        <Image src={coins} alt="coins" width={50} height={50}/>

                        <h2 className="text-3xl font-bold leading-[110%]">{user.remainingCredit}</h2>
                    </div>
                </div>

                <div className="w-full rounded-md border-2 border-purple-600/20 p-5 shadow-sm 
                shadow-purple-600/20 md: px-6 md: py-8">
                    <p className="font-medium uppercase test-sm md:text-base">files completed</p>
                    <div className="mt-4 flex items-center gap-4">
                        <Image src={photo} alt="coins" width={50} height={50}/>

                        <h2 className="text-3xl font-bold leading-[110%]">{files?.data.length}</h2>
                    </div>
                </div>
            </div>

            <div className="mt-8 md:mt-14">
                <ImageCollection
                    hasSearch={true}
                    images={files?.data}
                    totalPages={files?.totalPage}
                    page={page}
                />
            </div>
        </section>
    )
}

export default Profile
