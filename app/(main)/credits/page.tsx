import Image from "next/image"
import { redirect } from "next/navigation"

import Checkout from "@/components/Checkout"
import TransformationHeader from "@/components/TransformationHeader"
import { Button } from "@/components/ui/button"
import { plans } from "@/constants"
import { getUserById } from "@/lib/actions/user.actions"
import { SignedIn, auth } from "@clerk/nextjs"

const Credits = async () => {
    const { userId } = auth()

    if (!userId) redirect('/sign-in')

    const user = await getUserById(userId)

    return (
        <section>
            <TransformationHeader title="Buy Credits" 
            subtitle="Choose a credit package that suits your needs!"/>
            <div>
                <ul className="mt-11 grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-9">
                    {plans.map((plan, index: number) => (
                        <li key={index} className="w-full lg:max-w-none rounded-xl border-2 border-purple-600/20 
                        text-light-700 shadow-sm shadow-purple-600/20 p-8">
                            <div className="flex flex-col items-center justify-center gap-3">
                                <Image src={plan.icon} height={50} width={50} alt={plan.name} />
                                <p className="mt-2 font-semibold leading-[140%] text-base">
                                    {plan.name}
                                </p>
                                <p className="text-4xl font-semibold leading-[120%]">
                                    ${plan.price}
                                </p>
                                <p className="font-normal text-base leading-[140%]">
                                    {plan.credits} Credits
                                </p>
                            </div>

                            {/* plan includes */}
                            <ul className="flex flex-col gap-5 py-9">
                                {plan.inclusions.map((item, key: number) => (
                                    <li key={key} className="flex items-center gap-4">
                                        <Image src={`/icons/${item.isIncluded ? 'check.svg' : 'cross.svg'}`} 
                                        alt="check" width={24} height={24}/>
                                        <p className="text-base font-semibold leading-[140%]">
                                            {item.label}
                                        </p>
                                    </li>
                                ))}
                            </ul>

                            {plan.name === 'Free' ? (
                                <Button variant="outline" className="w-full rounded-md" disabled>Free</Button>
                            ) 
                            : (
                                <SignedIn>
                                    <Checkout
                                        plan={plan.name}
                                        amount={plan.price}
                                        credits={plan.credits}
                                        buyerId={user._id}
                                    />
                                </SignedIn>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default Credits
