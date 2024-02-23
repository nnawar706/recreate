import Image from "next/image"
import Link from "next/link"

import {ImageCollection} from "@/components/ImageCollection"
import { navLinks } from "@/constants"
import { getImages } from "@/lib/actions/image.actions"
import { searchParamProps } from "@/types/general"

const Dashboard = async ({ searchParams }: searchParamProps) => {
  const page = Number(searchParams?.page) || 1
  const query = (searchParams?.query as string) || ''

  const imageList = await getImages({ page, query })

  return (
    <main>
      <div className="hidden md:flex flex-col items-center justify-center h-72 
      gap-6 rounded-md border bg-banner bg-cover bg-no-repeat py-10 shadow-inner">
        <h1 className="font-semibold flex-wrap text-4xl shadow-sm capitalize">
          recreate your imagination
        </h1>
        <ul className="flex items-center justify-center w-full gap-20">
          {navLinks.slice(2,7).map((link, index) => (
            <Link key={index} href={link.route}
            className="flex flex-col items-center justify-center gap-2">
              <li className="flex items-center justify-center w-fit rounded-full bg-white p-2">
                <Image src={link.icon} height={24} width={24} alt={link.label} className="brightness-100"/>
              </li>
              <p className="text-sm text-center">{link.label}</p>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sm:mt-12">
        <ImageCollection 
          hasSearch={true}
          images={imageList?.data}
          totalPages={imageList?.totalPage}
          page={page}
        />
      </div>
    </main>
  )
}

export default Dashboard