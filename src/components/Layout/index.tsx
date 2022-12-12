import { ReactNode, useState } from 'react'
import Image from 'next/image'

import { Handbag, X } from 'phosphor-react'

import logoImg from '../../assets/logo.svg'

import {
    BadgeContainer,
    BodyItemsContainer,
    ButtonCloseDrawer,
    CardItemContainer,
    Container,
    DrawerCart,
    DrawerTitle,
    FooterContainer,
    Header,
    ImageContainer,
    InfoContainer,
    ItemsContainer,
    TotalContainer,
} from '../../styles/pages/app'
import { useShoppingCart } from 'use-shopping-cart'
import Link from 'next/link'
import axios from 'axios'
import { CartEntry } from 'use-shopping-cart/core'

interface LayoutProps {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    const {
        cartCount,
        cartDetails,
        formattedTotalPrice,
        clearCart,
        removeItem,
    } = useShoppingCart()
    const [isOpen, setIsOpen] = useState(false)
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
        useState(false)

    function handleToggleDrawer() {
        setIsOpen((state) => !state)
    }

    async function handleFinishPurchase() {
        try {
            const items = Object.values(cartDetails ?? {}).reduce(
                (acc, entry) => [...acc, entry],
                [] as any,
            )

            setIsCreatingCheckoutSession(true)
            const response = await axios.post('/api/checkout', {
                products: items,
            })

            const { checkoutUrl } = response.data

            clearCart()

            window.location.href = checkoutUrl
        } catch (error) {
            // Conectar com ferramenta de observabilidade (Datadog / Sentry)

            setIsCreatingCheckoutSession(false)
            alert('Falha ao redirecionao para o checkout!')
        }
    }

    return (
        <Container>
            <DrawerCart
                open={isOpen}
                onClose={handleToggleDrawer}
                direction="right"
                size={480}
            >
                <ButtonCloseDrawer onClick={handleToggleDrawer}>
                    <X size={24} />
                </ButtonCloseDrawer>
                <ItemsContainer>
                    <BodyItemsContainer>
                        <DrawerTitle>Sacola de compras</DrawerTitle>
                        {Object.values(cartDetails ?? {}).map((entry) => (
                            <CardItemContainer key={entry.id}>
                                <ImageContainer>
                                    <Image
                                        src={entry.imageUrl}
                                        width={94}
                                        height={94}
                                        alt=""
                                    />
                                </ImageContainer>
                                <div>
                                    <p>{entry.name}</p>
                                    <strong>{entry.formattedValue}</strong>
                                    <button
                                        onClick={() => removeItem(entry.id)}
                                    >
                                        Remover
                                    </button>
                                </div>
                            </CardItemContainer>
                        ))}
                    </BodyItemsContainer>
                    <FooterContainer>
                        <InfoContainer>
                            <div>
                                <span>Quantidade</span>
                                <strong>{cartCount} Itens</strong>
                            </div>
                            <TotalContainer>
                                <span>Valor total</span>
                                <strong>{formattedTotalPrice}</strong>
                            </TotalContainer>
                        </InfoContainer>
                        <button onClick={handleFinishPurchase}>
                            Finalizar compra
                        </button>
                    </FooterContainer>
                </ItemsContainer>
            </DrawerCart>
            <Header>
                <Link href="/">
                    <Image src={logoImg} alt="" />
                </Link>
                <button onClick={handleToggleDrawer}>
                    <BadgeContainer>{cartCount}</BadgeContainer>
                    <Handbag size={24} weight="bold" />
                </button>
            </Header>
            {children}
        </Container>
    )
}
