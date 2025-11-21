/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";
export default {
    darkMode: ["class"],
    content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			inter: [
  				'Inter',
  				'sans-serif'
  			],
  			roboto: [
  				'Roboto',
  				'sans-serif'
  			]
  		},
  		borderRadius: {
  			'4xl': '2rem',
  			'custom': '0.65375rem'
  		},
  		spacing: {
  			'18': '18rem',
  			'128': '32rem',
  			'144': '36rem',
  			'400': '400px',
  			'15.625': '15.625rem'
  		},
  		screens: {
  			xsm: '480px',
  			sm: '640px',
  			md: '768px',
  			lg: '976px',
  			xl: '1280px',
  			xxl: '1536px'
  		},
  		dropShadow: {
  			'3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
  			'4xl': [
  				'0 35px 35px rgba(0, 0, 0, 0.25)',
  				'0 45px 65px rgba(0, 0, 0, 0.15)'
  			]
  		},
  		colors: {
  			transparent: 'transparent',
  			white: '#ffffff',
  			black: '#000000',
  			gray_bold: '#1E1E1E',
  			gray_light: '#6A6A6A',
  			gray_bold_light: '#6B7280',
  			gray_medium: '#D9D9D9',
  			gray_medium_light: '#999999',
  			text_color_black: '#212121',
  			text_color_gray: '#6F6F6F',
  			text_color_purple: '#B7B7B7',
  			text_color_blue_light: '#2998FF',
  			text_color_blue_dark: '#01629E',
  			text_color_green: '#38AD20',
  			text_color_red_dark: '#E33D46',
  			text_color_red: '#D21721',
  			text_color_red_light: '#FF7C7C',
  			background_color: '#F9F9F9',
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}

  		},
  		fontSize: {
  			'display-2xl': [
  				'4.5rem',
  				{
  					lineHeight: '90px'
  				}
  			],
  			'display-xl': [
  				'3.75rem',
  				{
  					lineHeight: '72px'
  				}
  			],
  			'display-lg': [
  				'3rem',
  				{
  					lineHeight: '60px'
  				}
  			],
  			'display-md': [
  				'2.25rem',
  				{
  					lineHeight: '44px'
  				}
  			],
  			'display-sm': [
  				'1.875rem',
  				{
  					lineHeight: '38px'
  				}
  			],
  			'display-xs': [
  				'1.5rem',
  				{
  					lineHeight: '32px'
  				}
  			],
  			xl: [
  				'1.25rem',
  				{
  					lineHeight: '30px'
  				}
  			],
  			lg: [
  				'1.125rem',
  				{
  					lineHeight: '28px'
  				}
  			],
  			md: [
  				'1rem',
  				{
  					lineHeight: '24px'
  				}
  			],
  			sm: [
  				'0.875rem',
  				{
  					lineHeight: '20px'
  				}
  			],
  			'1xs': [
  				'0.75rem',
  				{
  					lineHeight: '18px'
  				}
  			],
  			'2xs': [
  				'0.625rem',
  				{
  					lineHeight: '15px'
  				}
  			],
  			'3xs': [
  				'0.5rem',
  				{
  					lineHeight: '10px'
  				}
  			]
  		}
  	}
  },
  plugins: [tailwindcssAnimate],
};
