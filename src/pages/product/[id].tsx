import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
    ImageContainer,
    ProductContainer,
    ProductDetails,
} from '../../styles/pages/product'

interface ProductProps {
    product: {
        id: string
        name: string
        imageUrl: string
        description: string
        price: string
        defaultPriceId: string
    }
}

export default function Product({ product }: ProductProps) {
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
        useState(false)

    async function handleBuyProduct() {
        try {
            setIsCreatingCheckoutSession(true)
            const response = await axios.post('/api/checkout', {
                priceId: product.defaultPriceId,
            })

            const { checkoutUrl } = response.data

            window.location.href = checkoutUrl
        } catch (error) {
            // Conectar com ferramenta de observabilidade (Datadog / Sentry)

            setIsCreatingCheckoutSession(false)
            alert('Falha ao redirecionao para o checkout!')
        }
    }

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
                        width={520}
                        height={480}
                        alt=""
                    />
                </ImageContainer>
                <ProductDetails>
                    <h1>{product.name}</h1>
                    <span>{product.price}</span>
                    <p>{product.description}</p>

                    <button
                        disabled={isCreatingCheckoutSession}
                        onClick={handleBuyProduct}
                    >
                        Colocar na sacola
                    </button>
                </ProductDetails>
            </ProductContainer>
        </>
    )
}
