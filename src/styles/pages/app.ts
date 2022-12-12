import { styled } from '..'
import Drawer from 'react-modern-drawer'

export const Container = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'center',
    minHeight: '100vh',
})

export const Header = styled('header', {
    padding: '2rem 0',
    width: '100%',
    maxWidth: 1100,
    margin: '0 auto',

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    button: {
        backgroundColor: '$gray800',
        padding: '0.75rem',
        borderRadius: 6,

        position: 'relative',

        cursor: 'pointer',
    },

    svg: {
        color: '$gray300',
    },
})

export const BadgeContainer = styled('div', {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    right: '-8.35px',
    top: '-8px',

    width: '1.5rem',
    height: '1.5rem',
    padding: '0.5rem',
    borderRadius: '50%',

    background: '$green300',
    color: '$white',
    fontSize: '0.875rem',
    fontWeight: 'bold',

    border: '3px solid $gray900',
})

export const DrawerCart = styled(Drawer, {
    display: 'flex',
    flexDirection: 'column',

    backgroundColor: '$gray900 !important',
})

export const ButtonCloseDrawer = styled('button', {
    background: 'transparent',
    color: '$gray300',

    width: '1.5rem',
    height: '1.5rem',

    alignSelf: 'flex-end',
    marginRight: '1.75rem',
    marginTop: '1.75rem',

    cursor: 'pointer',
})

export const ItemsContainer = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    height: '100%',

    marginTop: '1.5rem',
    marginLeft: '3rem',
    marginRight: '3rem',
    marginBottom: '3rem',

    overflowY: 'scroll',

    '&::-webkit-scrollbar': {
        width: 0,
    },
})

export const BodyItemsContainer = styled('div', {
    display: 'flex',
    flexDirection: 'column',

    gap: '1.25rem',
})

export const DrawerTitle = styled('span', {
    display: 'block',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '$gray100',

    marginBottom: '2rem',
})

export const CardItemContainer = styled('div', {
    display: 'flex',
    gap: '1.25rem',

    maxHeight: '20rem',

    overflowY: 'scroll',

    div: {
        display: 'flex',
        flexDirection: 'column',

        p: {
            color: '$gray400',
            marginBottom: '2px',
        },

        strong: {
            marginBottom: '0.5rem',
        },

        button: {
            border: 0,
            backgroundColor: 'transparent',
            color: '$green500',

            textAlign: 'left',
            fontWeight: 'bold',
            fontSize: '1rem',

            cursor: 'pointer',

            '&:disabled': {
                opacity: 0.6,
                cursor: 'not-allowed',
            },

            '&:not(:disabled):hover': {
                color: '$green300',
            },
        },
    },

    '&::-webkit-scrollbar': {
        width: 0,
    },
})

export const ImageContainer = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    padding: '0.39px 3.58px',
    borderRadius: 8,

    width: '6rem',
    height: '5.8125rem',

    background: 'linear-gradient(100deg, #1ea483 0%, #7465d4 100%)',

    div: {
        width: '6rem',
        height: '6rem',
    },
})

export const FooterContainer = styled('footer', {
    display: 'flex',
    flexDirection: 'column',

    marginTop: '1.5rem',

    button: {
        border: 0,
        borderRadius: 8,

        marginTop: '2rem',
        padding: '1.25rem 7.75rem',

        color: '$white',
        backgroundColor: '$green500',

        fontSize: '1.125rem',

        cursor: 'pointer',

        '&:disabled': {
            opacity: 0.6,
            cursor: 'not-allowed',
        },

        '&:not(:disabled):hover': {
            backgroundColor: '$green300',
        },
    },
})

export const InfoContainer = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',

    div: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})

export const TotalContainer = styled('div', {
    span: {
        fontSize: '1.125rem',
        fontWeight: 'bold',
    },

    strong: {
        fontSize: '1.5rem',
    },
})
