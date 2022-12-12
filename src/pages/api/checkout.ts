import { NextApiResponse, NextApiRequest } from 'next'
import Stripe from 'stripe'
import { Product, CartEntry } from 'use-shopping-cart/core'
import { stripe } from '../../lib/stripe'

interface ProductCheckout {
    price: string
    quantity: number
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { products } = req.body as { products: CartEntry[] }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed.' })
    }

    const items = await Promise.all(
        products.map(async (product) => {
            const priceId = await stripe.products.retrieve(product.id)

            return {
                price: priceId.default_price as string,
                quantity: product.quantity,
            }
        }),
    )

    const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${process.env.NEXT_URL}`

    const checkoutSession = await stripe.checkout.sessions.create({
        success_url: successUrl,
        cancel_url: cancelUrl,
        mode: 'payment',
        line_items: items,
    })

    return res.status(201).json({
        checkoutUrl: checkoutSession.url,
    })
}
