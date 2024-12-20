import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import HeroSection from '../components/app/agent_profile/hero_section'
import Info from '../components/app/agent_profile/info'
import About from '../components/app/agent_profile/about'
import Expertise from '../components/app/agent_profile/expertise'
import Addresses from '../components/app/agent_profile/addresses'
import Languages from '../components/app/agent_profile/languages'
import ServiceArea from '../components/app/agent_profile/serviceArea'
import Certificates from '../components/app/agent_profile/certificates'

const AgentProfile = () => {
    const insets = useSafeAreaInsets()
    return (
        <View
            style={{
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
            }}
            className='flex-1 bg-white'>
            <ScrollView showsVerticalScrollIndicator={false}>
                <HeroSection />
                <Info />
                <About />
                <Expertise />
                <Addresses />
                <Languages />
                <ServiceArea />
                <Certificates />
            </ScrollView>
        </View>
    )
}

export default AgentProfile