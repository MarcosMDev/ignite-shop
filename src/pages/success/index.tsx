import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'
import { stripe } from '../../lib/stripe'
import {
    Imagesontainer,
    ImageContainer,
    SuccessContainer,
} from '../../styles/pages/success'

interface SuccessProps {
    customerName: string
    lineItems: Stripe.LineItem[]
}

export default function Success({ customerName, lineItems }: SuccessProps) {
    return (
        <>
            <Head>
                <title>Compra efetuada | Ignite Shop</title>

                <meta name="robots" content="noindex" />
            </Head>
            <SuccessContainer>
                <Imagesontainer>
                    {lineItems.map((lineItem) => {
                        const product = lineItem.price
                            ?.product as Stripe.Product

                        return (
                            <ImageContainer key={product.id}>
                                <Image
                                    src={product.images[0]}
                                    width={120}
                                    height={110}
                                    alt=""
                                />
                            </ImageContainer>
                        )
                    })}
                </Imagesontainer>
                <h1>Compra efetuada</h1>

                <p>
                    Uhuul <strong>{customerName}</strong>, sua sua compra de{' '}
                    {lineItems.length} camisetas já está a caminho da sua casa.
                </p>

                <Link href="/">Voltar ao catálogo</Link>
            </SuccessContainer>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    if (!query.session_id) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    const sesseionId = String(query.session_id)

    const session = await stripe.checkout.sessions.retrieve(sesseionId, {
        expand: ['line_items', 'line_items.data.price.product'],
    })

    const customerName = session.customer_details?.name
    const lineItems = session.line_items?.data

    return {
        props: {
            customerName,
            lineItems,
        },
    }
}
