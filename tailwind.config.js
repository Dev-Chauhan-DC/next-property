/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#0057FF",
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
    }
  },
  plugins: [],
}