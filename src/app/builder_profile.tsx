import { View, Text } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import HeroSection from '../components/app/builder_profile/hero_section'
import Info from '../components/app/builder_profile/info'
import About from '../components/app/builder_profile/about'


const BuilderProfile = () => {
    const insets = useSafeAreaInsets()
    return (
        <View
            style={{
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
            }}
            className='flex-1 bg-white'>
            <HeroSection />
            <Info />
            <About />
        </View>
    )
}

export default BuilderProfile