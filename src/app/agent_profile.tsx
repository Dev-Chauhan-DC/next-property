import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import TitleBar from '../components/common/title_bar'
import HeroSection from '../components/app/agent_profile/components/hero_section'
import { IAgent } from '../data/network/models/agent'
import { IAgentAddress } from '../data/network/models/agentAddress'
import { IAgentCertificate } from '../data/network/models/agentCertificate'
import { agentGet } from '../data/network/services/agent'
import { agentAddressGetAllByAgent } from '../data/network/services/agentAddress'
import { agentCertificateGetAllByAgent } from '../data/network/services/agentCertificate'
import Info from '../components/app/agent_profile/components/info'
import About from '../components/app/agent_profile/components/about'
import Certificates from '../components/app/agent_profile/components/certificates'
import Addresses from '../components/app/agent_profile/components/addresses'
import { useLocalSearchParams } from 'expo-router'
import LoadingScreen from '../components/common/loading/loading_screen'

const AgentProfile = () => {
    const insets = useSafeAreaInsets()
    const [loading, setLoading] = useState<boolean>(true);
    const params = useLocalSearchParams();
    const id = parseInt(params.id as string);
    const [agent, setAgent] = useState<IAgent>()
    const [agentAddresses, setAgentAddresses] = useState<IAgentAddress[]>([])
    const [agentCertificates, setAgentCertificates] = useState<IAgentCertificate[]>([])



    const getProfile = async () => {
        try {
            setLoading(true)
            const agentResult = await agentGet(id);
            setAgent(agentResult.data)
            const agentAddressesResult = await agentAddressGetAllByAgent(id)
            setAgentAddresses(agentAddressesResult.data)
            const agentCertificatesResult = await agentCertificateGetAllByAgent(id)
            setAgentCertificates(agentCertificatesResult.data)

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getProfile()
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
                title='Agent Profile' />
            <View className='flex-1'>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <HeroSection
                        agent={agent} />
                    <Info
                        agent={agent}
                    />
                    <About
                        agent={agent}
                    />
                    <Certificates agentCertificates={agentCertificates} />
                    <Addresses agentAddresses={agentAddresses} />
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

export default AgentProfile