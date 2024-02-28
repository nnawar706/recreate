"use client"

import { useEffect } from 'react'
import { loadStripe } from "@stripe/stripe-js"

import { checkoutParams } from '@/types/transaction'
import { useToast } from './ui/use-toast'
import { Button } from './ui/button'

const Checkout = ({ plan, amount, credits, buyerId }: checkoutParams) => {
    const { toast } = useToast()

    useEffect(() => {
        loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
    }, [])

    const onCheckout = async () => {}
    
    return (
        <form action={onCheckout} method="POST">
            <Button type="submit" role="link" 
            className="w-full rounded-md">Buy Credits</Button>
        </form>
    )
}

export default Checkout
