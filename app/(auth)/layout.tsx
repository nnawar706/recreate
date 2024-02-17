export default function AuthLayout ({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="flex justify-center items-center min-h-screen w-full">
            {children}
        </main>
    )
}