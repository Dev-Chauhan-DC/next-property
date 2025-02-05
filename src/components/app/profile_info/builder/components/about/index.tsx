import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Title from '../title'
import { IBuilder } from '@/src/data/network/models/builder'
import UpdateAbout from './modals/update'
import AB from '@/src/components/common/profile/about'



interface Props {
    builder?: IBuilder
    getBuilderHandle?: () => Promise<void>
}

const About: React.FC<Props> = ({ builder, getBuilderHandle }) => {
    const [aboutModal, setAboutModal] = useState<boolean>(false);
    return (
        <View >


            <AB
                about={builder?.about}
                onPressEdit={() => setAboutModal(true)}
            />


            {
                aboutModal &&
                <UpdateAbout
                    onRequestClose={() => setAboutModal(false)}
                    onPressClose={() => setAboutModal(false)}
                    builder={builder}
                    getBuilderHandle={getBuilderHandle}
                    show={aboutModal}
                    updated={() => setAboutModal(false)}
                />}
        </View>
    )
}

export default About