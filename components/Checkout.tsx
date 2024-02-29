"use client"

import { useEffect } from 'react'
import { loadStripe } from "@stripe/stripe-js"

import { checkoutParams } from '@/types/transaction'
import { useToast } from './ui/use-toast'
import { Button } from './ui/button'
import { checkoutCredits } from '@/lib/actions/transaction.actions'

const Checkout = ({ plan, amount, credits, buyerId }: checkoutParams) => {
    const { toast } = useToast()

    useEffect(() => {
        loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
    }, [])

    useEffect(() => {
        const query = new URLSearchParams(window.location.search)
        
        if (query.get('success')) {
            toast({
                title: 'Order placed!',
                description: "You will receive an email confirmation",
                duration: 5000,
                className: "bg-grey-900 text-light-600",
            })
        }

        if (query.get('canceled')) {
            toast({
                title: 'Order canceled!',
                description: "Continue to shop around and checkout when you're ready",
                duration: 5000,
                className: "bg-grey-900 text-red-600",
            })
        }
    }, [])

    const onCheckout = async () => {
        await checkoutCredits({plan, amount, credits, buyerId})
    }
    
    return (
        <form action={onCheckout} method="POST">
            <Button type="submit" role="link" 
            className="w-full rounded-md">Buy Credits</Button>
        </form>
    )
}

export default Checkout
