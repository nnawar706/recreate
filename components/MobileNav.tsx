"use client"

import Link from "next/link"
import Image from 'next/image'
import { usePathname } from "next/navigation"

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { SignedIn, UserButton } from "@clerk/nextjs"
import { menu } from "@/app/assets"
import { navLinks } from "@/constants"

const MobileNav = () => {
    const pathname = usePathname()
    
    return (
        <section className="fixed flex justify-between items-center h-16 
        w-full shadow-md shadow-purple-200/50 py-5 px-8 lg:hidden">
            <Link href="/" className="flex items-center md:py-2">
                <Image src="/logo.svg" alt="logo" width="120" height="20"/>
            </Link>
            <nav className="flex gap-4">
                <SignedIn>
                    <UserButton afterSignOutUrl="/"/>

                    <Sheet>
                        <SheetTrigger>
                            <Image src={menu} alt="menu" width="32" height="32" 
                            className="cursor-pointer brightness-200"/>
                        </SheetTrigger>
                        <SheetContent className="sm:w-64">
                            <Image src="/logo.svg" alt="logo" width="120" height="20"
                            className="mb-8"/>
                            <ul className="w-full flex flex-col gap-3">
                                {navLinks.map((link, index) => {
                                    const isActive = link.route === pathname

                                    return <li key={index}
                                    className={`w-full whitespace-nowrap rounded-md cursor-pointer
                                    ${isActive ? 'bg-purple-600 text-light-700' : 'text-light-400'}`}
                                    >
                                        <Link href={link.route} className="flex gap-4 p-2">
                                            <Image src={link.icon} alt="icon" width={24} height={24}
                                            className={`${isActive ? 'brightness-200' : 'brightness-300'}`}/>
                                            {link.label}
                                        </Link>
                                    </li>
                                })}
                            </ul>
                        </SheetContent>
                    </Sheet>
                </SignedIn>
            </nav>
        </section>
    )
}

export default MobileNav
