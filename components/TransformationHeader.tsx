import { transformationHeader } from '@/types/general'
import React from 'react'

const TransformationHeader = ({ title, subtitle }: transformationHeader) => {
    return (
        <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold leading-[110%] text-light-500">
                {title}
            </h2>
            {subtitle && <p className="text-light-600 mt-3">{subtitle}</p>}
        </section>
    )
}

export default TransformationHeader
