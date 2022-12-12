import { styled } from '..'

export const SuccessContainer = styled('main', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    height: 656,

    h1: {
        fontSize: '$2xl',
        color: '$gray100',
    },

    p: {
        fontSize: '$xl',
        color: '$gray300',
        maxWidth: 560,
        textAlign: 'center',

        marginTop: '2rem',
        lineHeight: 1.4,
    },

    a: {
        textDecoration: 'none',

        display: 'block',
        marginTop: '4rem',

        fontWeight: 'bold',
        fontSize: '$lg',
        color: '$green500',

        '&:hover': {
            color: '$green300',
        },
    },
})

export const Imagesontainer = styled('div', {
    display: 'flex',

    marginBottom: '3rem',

    'div:not(:first-child)': {
        marginLeft: '-3rem',
    },
})

export const ImageContainer = styled('div', {
    width: '100%',
    maxWidth: '8.75rem',
    height: '8.75rem',
    background: 'linear-gradient(100deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: '1000px',
    padding: '0.25rem',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    img: {
        objectFit: 'cover',
    },
})
