import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TitleBar from '../../../common/title_bar';
import HeroSection from './components/hero_section';
import Info from './components/info';
import About from './components/about';
import People from './components/people';
import Certificates from './components/certificates';
import Updates from './components/updates';
import Addresses from './components/addresses';
import OngoingProjects from './components/ongoing_projects';
import UpcomingProjects from './components/upcoming_projects';
import CompletedProjects from './components/completed_projects';
import { IBuilder } from '@/src/data/network/models/builder';
import { builderGetCurrent } from '@/src/data/network/services/builder';
import Toast from 'react-native-root-toast';
import { getError } from '@/src/utilities/halper_functions/service';
import LoadingScreen from '@/src/components/common/loading/loading_screen';

const Builder = () => {
    const insets = useSafeAreaInsets();
    const [builder, setBuilder] = useState<IBuilder | undefined>();
    const [loading, setLoading] = useState<boolean>(true);



    const getBuilderHandle = async () => {
        try {
            setLoading(true)
            const result = await builderGetCurrent();
            setBuilder(result.data);
        } catch (e) {
            console.error(e);
            Toast.show(getError(e));
        } finally {
            setLoading(false)
        }
    }



    useEffect(() => {
        getBuilderHandle();
    }, [])

    if (loading) {
        return (
            <LoadingScreen />
        )
    }

    return (
        <View
            className='flex-1 bg-white'
            style={{
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
            }}
        >
            <TitleBar
                className='mb-2'
                title='Your Profile' />
            <View className='flex-1'>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <HeroSection
                        getBuilderHandle={getBuilderHandle}
                        builder={builder} />
                    <Info
                        builder={builder}
                        getBuilderHandle={getBuilderHandle}
                    />
                    <About
                        builder={builder}
                        getBuilderHandle={getBuilderHandle}
                    />
                    <People />
                    <Certificates />
                    <Updates />
                    <Addresses />
                    <OngoingProjects builder={builder} />
                    <UpcomingProjects builder={builder} />
                    <CompletedProjects builder={builder} />
                </ScrollView>
            </View>



        </View>
    )
}

export default Builder