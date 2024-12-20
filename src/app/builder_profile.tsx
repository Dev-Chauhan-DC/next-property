import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import HeroSection from '../components/app/builder_profile/hero_section'
import Info from '../components/app/builder_profile/info'
import About from '../components/app/builder_profile/about'
import OngoingProjects from '../components/app/builder_profile/ongoing_projects'
import UpcomingProjects from '../components/app/builder_profile/upcoming_projects'
import CompletedProjects from '../components/app/builder_profile/completed_projects'
import People from '../components/app/builder_profile/people'
import Certificates from '../components/app/builder_profile/certificates'
import Updates from '../components/app/builder_profile/updates'
import Addresses from '../components/app/builder_profile/addresses'


const BuilderProfile = () => {
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
                <People />
                <Certificates />
                <Updates />
                <Addresses />
                <OngoingProjects />
                <UpcomingProjects />
                <CompletedProjects />
            </ScrollView>
        </View>
    )
}

export default BuilderProfile