import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import Stripe from 'stripe'
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'
import { stripe } from '../../lib/stripe'
import {
    ImageContainer,
    ProductContainer,
    ProductDetails,
} from '../../styles/pages/product'

interface ProductProps {
    product: {
        id: string
        name: string
        description: string
        imageUrl: string
        price: number
        currency: string
    }
}

export default function Product({ product }: ProductProps) {
    const { addItem } = useShoppingCart()
    const isMobileScreen = useMediaQuery({ query: '(max-width: 640px)' })

    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
        useState(false)

    const { isFallback } = useRouter()

    if (isFallback) {
        return <p>Loading. . .</p>
    }

    return (
        <>
            <Head>
                <title>{product.name} | Ignite Shop</title>
            </Head>
            <ProductContainer>
                <ImageContainer>
                    <Image
                        src={product.imageUrl}
                        width={isMobileScreen ? 300 : 520}
                        height={480}
                        alt=""
                    />
                </ImageContainer>
                <ProductDetails>
                    <h1>{product.name}</h1>
                    <span>
                        {formatCurrencyString({
                            value: product.price,
                            currency: 'BRL',
                        })}
                    </span>
                    <p>{product.description}</p>

                    <button
                        disabled={isCreatingCheckoutSession}
                        onClick={() => addItem(product)}
                    >
                        Colocar na sacola
                    </button>
                </ProductDetails>
            </ProductContainer>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [{ params: { id: 'prod_Ms74cXahAkkPgG' } }],
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
    params,
}) => {
    const productId = params!.id

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price'],
    })

    const price = product.default_price as Stripe.Price

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: price.unit_amount!,
                description: product.description,
                currency: price.currency,
            },
        },
        revalidate: 60 * 60 * 1, // 1 hour
    }
}
