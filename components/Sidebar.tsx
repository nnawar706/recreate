import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
    return (
        <aside className="hidden lg:flex h-screen w-72 p-5 shadow-md shadow-purple-200/50">
            <div className="flex size-full items-center flex-col gap-4">
                <Link href="/" className="flex items-center md:py-2">
                    <Image src="/logo.svg" alt="logo" width="200" height="200"/>
                </Link>
            </div>
        </aside>
    )
}

export default Sidebar
