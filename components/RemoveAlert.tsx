"use client"

import { useTransition } from "react"
import { AlertDialog, AlertDialogContent, AlertDialogAction, AlertDialogCancel, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"
import { Button } from "./ui/button"
import { deleteImage } from "@/lib/actions/image.actions"

const RemoveAlert = ({imageId}: {imageId: string}) => {
    const [isPending, startTransition] = useTransition()
    
    return (
        <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button type="button" variant="destructive">Remove</Button>
                </AlertDialogTrigger>

                <AlertDialogContent className="flex flex-col gap-10">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you sure you want to remove this image?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="p-16-regular">
                            This action is irreversible. The image will permanently be removed.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="border bg-red-800 hover:bg-red-900 text-white"
                            onClick={() => startTransition(async () => {
                                await deleteImage(imageId)
                            })}
                        >Remove</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
        </AlertDialog>
    )
}

export default RemoveAlert
