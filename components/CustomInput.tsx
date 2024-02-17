import React from 'react'
import { Control } from 'react-hook-form'
import { z } from 'zod'

import { formSchema } from './TransformationForm'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'


interface customInputProps {
    control: Control<z.infer<typeof formSchema>> | undefined;
    render: (props: { field: any }) => React.ReactNode;
    name: keyof z.infer<typeof formSchema>;
    label?: string;
    className?: string;
}

const CustomInput = ({
        control,
        render,
        name,
        label,
        className,
    }: customInputProps) => (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={className}>
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>{render({ field })}</FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )

export default CustomInput