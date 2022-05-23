const { guessProductionMode } = require("@ngneat/tailwind");

process.env.TAILWIND_MODE = guessProductionMode() ? 'build' : 'watch';

module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {
          
          "primary": "#6667AB",
                   
          "secondary": "#00589B",
                   
          "accent": "#FF952C",
                   
          "neutral": "#D0E5EC",
                   
          "base-100": "#FFFFFF",
                   
          "info": "#3ABFF8",
                   
          "success": "#36D399",
                   
          "warning": "#FBBD23",
                   
          "error": "#F87272",
                   },
      },
    ],
  },
    prefix: '',
    mode: 'jit',
    purge: {
      content: [
        './src/**/*.{html,ts,css,scss,sass,less,styl,js}',
      ]
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      extend: {
        fontFamily: {
          Montserrat: ['Montserrat', 'sans-serif'],
          PlayfairDisplay: ['Playfair Display', 'serif'],
        },
      },
      container: {
        center: true,
      },
      screens: {
        'tablet': '640px',
        // => @media (min-width: 640px) { ... }
  
        'laptop': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'desktop': '1280px',
        // => @media (min-width: 1280px) { ... }
      }
    },
    variants: {
      extend: {},
    },
    plugins: [require('@tailwindcss/forms'),require('@tailwindcss/typography'), require("daisyui"), require('@tailwindcss/aspect-ratio')],
};
