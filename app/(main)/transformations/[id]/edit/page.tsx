import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { getUserById } from '@/lib/actions/user.actions'
import { TransformationTypeKey, searchParamProps } from '@/types/general'
import { getImageById } from '@/lib/actions/image.actions'
import { transformationTypes } from '@/constants'
import TransformationHeader from '@/components/TransformationHeader'
import TransformationForm from '@/components/TransformationForm'

const EditTransformation = async ({ params: { id } }: searchParamProps) => {
    const { userId } = auth()

    if (!userId) redirect('/sign-in')

    const user = await getUserById(userId)

    const image = await getImageById(id)

    if (image.author.clerkId != userId) redirect('/')

    const transformation = transformationTypes[image.transformationType as TransformationTypeKey]
    
    return (
        <section>
            <TransformationHeader 
                title={transformation.title} 
                subtitle={transformation.subtitle}
            />

            <div className="mt-10">
                <TransformationForm
                    action='Update'
                    userId={user._id}
                    type={image.transformationType as TransformationTypeKey}
                    remainingCredit={user.remainingCredit}
                    config={image.config}
                    data={image}
                />
            </div>
        
        </section>
    )
}

export default EditTransformation
