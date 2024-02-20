"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { close, stacked } from "@/app/assets"

const CreditAlert = () => {
    const { push } = useRouter()

    return (
        <AlertDialog defaultOpen>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="flex justify-between items-center">
                        <p className="capitalize">insufficient credits alert</p>
                        <AlertDialogCancel className="border-0 p-0 hover:bg-transparent"
                        onClick={() => push('/profile')}>
                            <Image className="cursor-pointer"
                            src={close} height={24} width={24} alt="insufficient-credit"/>
                        </AlertDialogCancel>
                    </div>
                    <Image src={stacked} alt="credit-coins" width={462} height={122}/>

                    <AlertDialogTitle className="font-normal text-md">
                        Oops... Looks like you&#39;ve run out of free credits!
                    </AlertDialogTitle>
                    <AlertDialogDescription className="py-3">
                        No worries, though! You can keep enjoying our services by grabbing
                        more credits.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        className="button w-full text-light-400"
                        onClick={() => push("/")}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="button w-full bg-purple-600 hover:bg-purple-600 text-light-400"
                        onClick={() => push("/credits")}
                    >
                        Proceed!
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default CreditAlert