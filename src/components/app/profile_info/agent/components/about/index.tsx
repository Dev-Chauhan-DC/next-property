import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Title from '../title'
import UpdateAbout from './modals/update'
import AB from '@/src/components/common/profile/about'
import { IAgent } from '@/src/data/network/models/agent'



interface Props {
    agent?: IAgent
    getAgentHandle?: () => Promise<void>
}

const About: React.FC<Props> = ({ agent, getAgentHandle }) => {
    const [aboutModal, setAboutModal] = useState<boolean>(false);
    return (
        <View >


            <AB
                about={agent?.about}
                onPressEdit={() => setAboutModal(true)}
            />


            {
                aboutModal &&

                <UpdateAbout
                    onRequestClose={() => setAboutModal(false)}
                    onPressClose={() => setAboutModal(false)}
                    agent={agent}
                    getAgentHandle={getAgentHandle}
                    show={aboutModal}
                    updated={() => setAboutModal(false)}
                />}
        </View>
    )
}

export default About