import { createStitches } from '@stitches/react'

export const {
    config,
    styled,
    css,
    globalCss,
    keyframes,
    getCssText,
    theme,
    createTheme,
} = createStitches({
    theme: {
        colors: {
            white: '#fff',
            gray900: '#121214',
            gray800: '#202024',
            gray400: '#c4c4cc',
            gray300: '#8d8d99',
            gray100: '#e1e1e6',

            green500: '#00875f',
            green300: '#00b37e',
        },
        fontSizes: {
            md: '1.125rem',
            lg: '1.25rem',
            xl: '1.5rem',
            '2xl': '2rem',
        },
    },
    media: {
        'min-sm': '(min-width: 640px)',
        'min-md': '(min-width: 768px)',
        'min-lg': '(min-width: 1024px)',

        'max-sm': '(max-width: 640px)',
        'max-md': '(max-width: 768px)',
        'max-lg': '(max-width: 1024px)',
    } as const,
})
