import { styled } from '..'

export const HomeContainer = styled('main', {
    display: 'flex',
    width: '100%',
    maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
    marginLeft: 'auto',
    minHeight: 656,

    alignItems: 'center',
})

export const Product = styled('div', {
    background: 'linear-gradient(100deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 8,
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    img: {
        objectFit: 'cover',
    },

    '@max-sm': {
        height: 550,
    },

    '@min-sm': {
        '&:hover': {
            footer: {
                transform: 'translateY(0%)',
                opacity: 1,
            },
        },
    },
})

export const FooterContainer = styled('footer', {
    position: 'absolute',
    bottom: '0.5rem',
    left: '0.5rem',
    right: '0.5rem',
    padding: '2rem',

    borderRadius: 6,

    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',

    backgroundColor: 'rgba(0, 0, 0, 0.6)',

    '@min-sm': {
        transform: 'translateY(110%)',
        opacity: 0,
        transition: 'all 0.2s ease-in-out',
    },

    strong: {
        fontSize: '$md',
        color: '$gray100',
    },

    span: {
        fontSize: '$lg',
        fontWeigth: 'bold',
        color: '$green300',
    },

    div: {
        display: 'flex',
        flexDirection: 'column',
    },

    button: {
        marginTop: 'auto',
        backgroundColor: '$green500',
        border: 0,
        color: '$white',
        borderRadius: 8,
        padding: '0.75rem',
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
