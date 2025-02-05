/** @type {import('tailwindcss').Config} */
import { hairlineWidth } from 'nativewind/theme';

module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // primary: "#0057FF",
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        gray: {
          100: "#F2F3F5",
          200: "#DEE2EB",
          300: "#B4BDCF",
          400: "#5E626A",
        },
        black: {
          800: "#2D2F32"
        },
        red: {
          500: "#FD374E"
        },
        success: {
          500: "#00D512"
        },
        warning: {
          500: "#FFAA00"
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
      borderRadius: {
        DEFAULT: '10px',
      }
    },
    fontFamily: {
      'mThin': ['Montserrat_100Thin'],
      'mExtraLight': ['Montserrat_200ExtraLight'],
      'mLight': ['Montserrat_300Light'],
      'mRegular': ['Montserrat_400Regular'],
      'mMedium': ['Montserrat_500Medium'],
      'mSemiBold': ['Montserrat_600SemiBold'],
      'mBold': ['Montserrat_700Bold'],
      'mExtraBold': ['Montserrat_800ExtraBold'],
      'mBlack': ['Montserrat_900Black'],
    },
    // borderWidth: {
    //   hairline: hairlineWidth(),
    // },
  },
  plugins: [],
}