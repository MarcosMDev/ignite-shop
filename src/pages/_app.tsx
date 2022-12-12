import type { AppProps } from 'next/app'

import { globalStyles } from '../styles/global'
import 'react-modern-drawer/dist/index.css'
import Layout from '../components/Layout'
import { CartProvider } from 'use-shopping-cart'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
    return (
        <CartProvider
            mode="payment"
            cartMode="client-only"
            stripe={process.env.STRIPE_SECRET_KEY!}
            successUrl={`${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`}
            cancelUrl={`${process.env.NEXT_URL}`}
            currency="BRL"
            allowedCountries={['BR']}
            billingAddressCollection={true}
            shouldPersist={true}
        >
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </CartProvider>
    )
}
