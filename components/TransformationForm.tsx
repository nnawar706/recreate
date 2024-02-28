"use client"

import { useEffect, useState, useTransition } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { transformationTypes, defaultValues, aspectRatioOptions, creditFee } from "@/constants"
import { transformationFormProps, transformations } from "@/types/transformation"
import CustomInput from "./CustomInput"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { AspectRatioKey, debounce, deepMergeObjects } from "@/lib/utils"
import ImageUploader from "./ImageUploader"
import TransformedImage from "./TransformedImage"
import { updateCredits } from "@/lib/actions/user.actions"
import { getCldImageUrl } from "next-cloudinary"
import { addImage, updateImage } from "@/lib/actions/image.actions"
import { useRouter } from "next/navigation"
import CreditAlert from "./CreditAlert"

export const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    aspectRatio: z.string().optional(),
    color: z.string().optional(),
    prompt: z.string().optional(),
    publicId: z.string(),
})

const TransformationForm = ({ data = null, action, userId, type, 
        remainingCredit, config = null }: transformationFormProps) => {
    const transformationType = transformationTypes[type]
    const [image, setImage] = useState(data)
    const [newTransformation, setNewTransformation] = useState<transformations | null>(null)
    const [transformationConfig, setTransformationConfig] = useState(config)
    const [isTransforming, setIsTransforming] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [isPending, startTransition] = useTransition()
    const { push } = useRouter()
    
    const initialValues = data && action === 'Update' ? {
        title: data?.title,
        aspectRatio: data?.aspectRatio,
        color: data?.color,
        prompt: data?.prompt,
        publicId: data?.publicId,
    } 
        : defaultValues

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues,
    })

    const onSelectChange = (value: string, onChangeField: (value: string) => void) => {
        const imageSize = aspectRatioOptions[value as AspectRatioKey]

        setImage((prevState: any) => ({
            ...prevState,
            aspectRatio: imageSize.aspectRatio,
            height: imageSize.height,
            width: imageSize.width
        }))

        setNewTransformation(transformationType.config)

        return onChangeField(value)
    }

    const onInputChange = (field: string, value: string, type: string, onChangeField: (value: string) => void) => {
        debounce(() => {
            setNewTransformation((prevState: any) => ({
                ...prevState,
                [type]: {
                    ...prevState?.[type],
                    [field === 'prompt' ? 'prompt' : 'to']: value
                }
            }))
        }, 1000)()

        return onChangeField(value)
    }

    const onTransform = async () => {
        setIsTransforming(true)

        setTransformationConfig(
            deepMergeObjects(newTransformation, transformationConfig)
        )

        setNewTransformation(null)

        startTransition(async () => {
            await updateCredits(userId, creditFee)
        })
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)

        if (data || image) {
            const transformationUrl = getCldImageUrl({
                width: image?.width,
                height: image?.height,
                src: image?.publicId,
                ...transformationConfig
            })

            const imageData = {
                title: values.title,
                publicId: image?.publicId,
                transformationType: type,
                width: image?.width,
                height: image?.height,
                config: transformationConfig,
                secureURL: image?.secureURL,
                transformationURL: transformationUrl,
                aspectRatio: values.aspectRatio,
                prompt: values.prompt,
                color: values.color
            }

            if (action === 'Add') {
                try {
                    const newImage = await addImage({
                        image: imageData,
                        userId,
                        path: '/'
                    })

                    if (newImage) {
                        form.reset()

                        setImage(data)

                        push(`/transformations/${newImage._id}`)
                    }
                } catch (error) {
                    console.log(error)
                }
            }

            if (action === 'Update') {
                try {
                    const updatedImage = await updateImage({
                        image: {
                            ...imageData,
                            _id: data._id
                        },
                        userId,
                        path: `/transformations/${data._id}`
                    })

                    if (updatedImage) {
                        push(`/transformations/${updatedImage._id}`)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }

        setLoading(false)
    }

    useEffect(() => {
        if (image && ["restore", "removeBackground"].includes(type)) {
            setNewTransformation(transformationType.config)
        }
    }, [image, transformationType.config, type])

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {remainingCredit < Math.abs(creditFee) && <CreditAlert/>}
                    <CustomInput
                        control={form.control}
                        name="title"
                        className="w-full"
                        label="Image Title"
                        render={({ field }) => 
                            <Input {...field} />}
                    />
                    {type === 'fill' && <CustomInput
                        control={form.control}
                        name="aspectRatio"
                        label="Select Aspect Ratio"
                        className="w-full"
                        render={({ field }) => 
                        <Select value={field.value}
                        onValueChange={(value) => onSelectChange(value, field.onChange)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Ratio" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.keys(aspectRatioOptions).map((item) => (
                                    <SelectItem className="py-2 cursor-pointer" key={item} value={item}>
                                        {aspectRatioOptions[item as AspectRatioKey].label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    }
                    />}
                    {["recolor", "remove"].includes(type) && 
                        <div className="">
                            <CustomInput
                                control={form.control}
                                label={type == 'recolor' ? 'Object to recolor' : 'Object to remove'}
                                name="prompt"
                                className="w-full"
                                render={({ field }) => (
                                    <Input value={field.value} 
                                    onChange={(e) => 
                                        onInputChange('prompt', e.target.value, type, field.onChange)}></Input>
                                )}
                            />

                            {type === 'recolor' && (
                                <CustomInput 
                                    control={form.control}
                                    name="color"
                                    label="Replacement Color"
                                    className="w-full mt-3"
                                    render={({ field }) => (
                                        <Input value={field.value}
                                        onChange={(e) => 
                                            onInputChange('color', e.target.value, type, field.onChange)}/>
                                    )}
                                />
                            )}
                        </div> }
                    <div className="grid h-fit min-h-[200px] grid-cols-1 gap-5 py-4 md:grid-cols-2">
                        <CustomInput
                            control={form.control}
                            name="publicId"
                            className="flex size-full flex-col"
                            render={({ field }) => (
                                <ImageUploader
                                    onValueChange={field.onChange}
                                    setImage={setImage}
                                    publicId={field.value}
                                    image={image}
                                    type={type}
                                    credit={remainingCredit}
                                />
                            )}
                        />

                        <TransformedImage
                            image={image}
                            type={type}
                            title={form.getValues().title}
                            isTransforming={isTransforming}
                            setIsTransforming={setIsTransforming}
                            transformationConfig={transformationConfig}
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <Button type="submit" className="bg-purple-600 hover:bg-purple-600 text-light-700 
                            py-3 px-6 w-full uppercase" 
                            disabled={isTransforming || newTransformation == null}
                            onClick={onTransform}>{isTransforming ? 'transforming...' : 'apply changes'}</Button>
                        
                        <Button type="submit" className="bg-purple-600 hover:bg-purple-600 text-light-700 
                            py-3 px-6 w-full uppercase" disabled={loading}>
                                {loading ? 'loading...' : 'Save Image'}</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default TransformationForm
