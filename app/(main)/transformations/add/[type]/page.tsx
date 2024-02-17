import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import TransformationForm from '@/components/TransformationForm'
import TransformationHeader from '@/components/TransformationHeader'
import { transformationTypes } from '@/constants'
import { getUserById } from '@/lib/actions/user.actions'
import { searchParamProps } from '@/types/general'

const AddTransformation = async ({ params: { type } }: searchParamProps) => {
    const { userId } = auth()
    const transformation = transformationTypes[type]

    if (!userId) redirect('/sign-in')

    const user = await getUserById(userId)

    return (
        <>
            <TransformationHeader 
                title={transformation.title} 
                subtitle={transformation.subtitle}
            />

            <TransformationForm
                action='Add'
                userId={user._id}
                type={type}
                remainingCredit={user.remainingCredit}/>
        </>
    )
}

export default AddTransformation
