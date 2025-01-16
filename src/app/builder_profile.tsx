import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IBuilder } from '@/src/data/network/models/builder';
import { builderGet, builderGetCurrent } from '@/src/data/network/services/builder';
import Toast from 'react-native-root-toast';
import { getError } from '@/src/utilities/halper_functions/service';
import TitleBar from '../components/common/title_bar';
import HeroSection from '../components/app/builder_profile/components/hero_section';
import Info from '../components/app/builder_profile/components/info';
import About from '../components/app/builder_profile/components/about';
import People from '../components/app/builder_profile/components/people';
import Certificates from '../components/app/builder_profile/components/certificates';
import Updates from '../components/app/builder_profile/components/updates';
import Addresses from '../components/app/builder_profile/components/addresses';
import OngoingProjects from '../components/app/profile_info/builder/components/ongoing_projects';
import UpcomingProjects from '../components/app/builder_profile/components/upcoming_projects';
import CompletedProjects from '../components/app/builder_profile/components/completed_projects';
import { IBuilderTeam } from '../data/network/models/builderTeam';
import { IBuilderAddress } from '../data/network/models/builderAddress';
import { IBuilderCertificate } from '../data/network/models/builderCertificate';
import { IBuilderUpdate } from '../data/network/models/builderUpdate';
import { builderTeamGetAllByBuilder } from '../data/network/services/builderTeam';
import { builderAddressGetAllByBuilder } from '../data/network/services/builderAddress';
import { builderCertificateGetAllByBuilder } from '../data/network/services/builderCertificate';
import { builderUpdateGetAllByBuilder } from '../data/network/services/builderUpdate';
import { useLocalSearchParams } from 'expo-router';

const BuilderProfile = () => {
    const insets = useSafeAreaInsets();
    const [loading, setLoading] = useState<boolean>(false);
    const params = useLocalSearchParams();
    const id = parseInt(params.id as string);
    const [builder, setBuilder] = useState<IBuilder>()
    const [builderTeams, setBuilderTeams] = useState<IBuilderTeam[]>([])
    const [builderAddresses, setBuilderAddresses] = useState<IBuilderAddress[]>([])
    const [builderCertificates, setBuilderCertificates] = useState<IBuilderCertificate[]>([])
    const [builderUpdates, setBuilderUpdates] = useState<IBuilderUpdate[]>([])



    const getProfile = async () => {
        try {
            const builderResult = await builderGet(id);
            setBuilder(builderResult.data)
            const builderTeamsResult = await builderTeamGetAllByBuilder(id)
            setBuilderTeams(builderTeamsResult.data)
            const builderAddressesResult = await builderAddressGetAllByBuilder(id)
            setBuilderAddresses(builderAddressesResult.data)
            const builderCertificatesResult = await builderCertificateGetAllByBuilder(id)
            setBuilderCertificates(builderCertificatesResult.data)
            const builderUpdatesResult = await builderUpdateGetAllByBuilder(id)
            setBuilderUpdates(builderUpdatesResult.data)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getProfile()
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
                title='Builder Profile' />
            <View className='flex-1'>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <HeroSection
                        builder={builder} />
                    <Info
                        builder={builder}
                    />
                    <About
                        builder={builder}
                    />
                    <People builderTeams={builderTeams} />
                    <Certificates builderCertificates={builderCertificates} />
                    <Updates builderUpdates={builderUpdates} />
                    <Addresses builderAddresses={builderAddresses} />
                    <OngoingProjects />
                    <UpcomingProjects />
                    <CompletedProjects />
                </ScrollView>
            </View>



        </View>
    )
}

export default BuilderProfile