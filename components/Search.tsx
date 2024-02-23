import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { Input } from "@/components/ui/input"
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils"

const Search = () => {
    const { push } = useRouter()
    const searchParams = useSearchParams()
    const [query, setQuery] = useState<string>("")

    useEffect(() => {
        const delayDebounce = setTimeout(() => {

            const newUrl = query ? formUrlQuery({
                    searchParams: searchParams.toString(),
                    key: "query",
                    value: query
                }) : removeKeysFromQuery({
                    searchParams: searchParams.toString(),
                    keysToRemove: ['query']
                })

            push(newUrl, {scroll: false})
        }, 300)

        return () => clearTimeout(delayDebounce)
    }, [searchParams, query])

    return (
        <div className="flex justify-end w-full rounded-md px-4 shadow-sm md:max-w-96">
            <Input placeholder="Search"
                onChange={(e) => setQuery(e.target.value)}/>
        </div>
    )
}

export default Search