import Sidebar from "@/components/Sidebar"

export default function MainLayout ({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="flex flex-col lg:flex-row w-full min-h-screen">
            {/* sidebar */}
            <Sidebar/>
            <div className="flex-1 py-8 lg:py-10 mt-16 lg:mt-0 lg:max-h-screen 
            overflow-auto">
                <div className="max-w-5xl mx-auto px-5 md:px-10 w-full text-light-400 p-16-regular">
                    {children}
                </div>
            </div>
        </main>
    )
}