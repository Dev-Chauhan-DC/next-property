import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TitleBar from '../../../common/title_bar';
import Info from './components/info';
import About from './components/about';
import People from './components/people';
import Certificates from './components/certificates';
import Updates from './components/updates';
import Addresses from './components/addresses';
import OngoingProjects from './components/ongoing_projects';
import UpcomingProjects from './components/upcoming_projects';
import CompletedProjects from './components/completed_projects';
import Toast from 'react-native-root-toast';
import { getError } from '@/src/utilities/halper_functions/service';
import HeroSection from './components/hero_section';
import { agentGetCurrent } from '@/src/data/network/services/agent';
import { IAgent } from '@/src/data/network/models/agent';

const Agent = () => {
    const insets = useSafeAreaInsets();
    const [agent, setAgent] = useState<IAgent | undefined>();



    const getAgentHandle = async () => {
        try {
            const result = await agentGetCurrent();
            setAgent(result.data);
        } catch (e) {
            console.error(e);
            Toast.show(getError(e));
        }
    }



    useEffect(() => {
        getAgentHandle();
    }, [])

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
                        getAgentHandle={getAgentHandle}
                        agent={agent} />
                    <Info
                        agent={agent}
                        getAgentHandle={getAgentHandle}
                    />
                    <About
                        agent={agent}
                        getAgentHandle={getAgentHandle}
                    />
                    <Certificates />
                    <Addresses />
                    {/* <People />
                    <Updates /> */}
                    {/* <OngoingProjects />
                    <UpcomingProjects />
                    <CompletedProjects /> */}
                </ScrollView>
            </View>



        </View>
    )
}

export default Agent