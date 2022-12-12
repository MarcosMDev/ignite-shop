import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import { stripe } from '../lib/stripe'
import { FooterContainer, HomeContainer, Product } from '../styles/pages/home'
import { useKeenSlider } from 'keen-slider/react'

import 'keen-slider/keen-slider.min.css'
import { GetStaticProps } from 'next'

import { Stripe } from 'stripe'

import { Handbag } from 'phosphor-react'
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'

interface HomeProps {
    products: {
        id: string
        name: string
        imageUrl: string
        price: number
        currency: string
    }[]
}

export default function Home({ products }: HomeProps) {
    const { addItem } = useShoppingCart()

    const [sliderRef] = useKeenSlider({
        slides: {
            perView: 3,
            spacing: 48,
        },
    })

    return (
        <>
            <Head>
                <title>Home | Ignite Shop</title>
            </Head>
            <HomeContainer ref={sliderRef} className="keen-slider">
                {products.map((product) => {
                    return (
                        <Product
                            className="keen-slider__slide"
                            key={product.id}
                        >
                            <Link
                                href={`/product/${product.id}`}
                                prefetch={false}
                            >
                                <Image
                                    src={product.imageUrl}
                                    width={520}
                                    height={480}
                                    alt=""
                                />
                            </Link>

                            <FooterContainer>
                                <div>
                                    <strong>{product.name}</strong>
                                    <span>
                                        {formatCurrencyString({
                                            value: product.price,
                                            currency: 'BRL',
                                        })}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => addItem(product)}
                                >
                                    <Handbag size={32} weight="bold" />
                                </button>
                            </FooterContainer>
                        </Product>
                    )
                })}
            </HomeContainer>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const response = await stripe.products.list({
        expand: ['data.default_price'],
    })

    const products = response.data.map((product) => {
        const price = product.default_price as Stripe.Price

        return {
            id: product.id,
            name: product.name,
            imageUrl: product.images[0],
            price: price.unit_amount!,
            currency: price.currency,
        }
    })

    return {
        props: {
            products,
        },
        revalidate: 60 * 60 * 2,
    }
}
