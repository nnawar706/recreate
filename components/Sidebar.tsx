"use client"

import { navLinks } from '@/constants'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button'

const Sidebar = () => {
    const pathname = usePathname()

    return (
        <aside className="hidden lg:flex h-screen w-72 p-5 shadow-md shadow-purple-200/50">
            <div className="flex size-full items-center flex-col gap-4">
                <Link href="/" className="flex items-center md:py-2">
                    <Image src="/logo.svg" alt="logo" width="200" height="200"/>
                </Link>

                <nav className="h-full flex-col justify-between md:flex md:gap-4">
                    <SignedIn>
                        <ul className="hidden w-full flex-col gap-2 md:flex">
                            <li className="flex justify-center items-center cursor-pointer gap-2 p-4">
                                <UserButton afterSignOutUrl='/'/>
                            </li>
                            {navLinks.map((link, index) => {
                                const isActive = link.route === pathname

                                return <li key={index}
                                className={`w-full whitespace-nowrap rounded-md cursor-pointer
                                ${isActive ? 'bg-purple-600 text-light-700' : 'text-light-400'}`}
                                >
                                    <Link href={link.route} className="flex gap-4 p-4">
                                        <Image src={link.icon} alt="icon" width={24} height={24}
                                        className={`${isActive ? 'brightness-200' : 'brightness-300'}`}/>
                                        {link.label}
                                    </Link>
                                </li>
                            })}
                        </ul>
                    </SignedIn>

                    <SignedOut>
                        <Button asChild className="bg-purple-600 hover:bg-purple-600 text-light-400">
                            <Link href="/sign-in">Get Started</Link>
                        </Button>
                    </SignedOut>
                </nav>
            </div>
        </aside>
    )
}

export default Sidebar
