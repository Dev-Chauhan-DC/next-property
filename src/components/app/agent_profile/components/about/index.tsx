import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Title from '../title'
import UpdateAbout from './modals/update'
import AB from '@/src/components/common/profile/about'
import { IAgent } from '@/src/data/network/models/agent'



interface Props {
    agent?: IAgent
}

const About: React.FC<Props> = ({ agent }) => {
    return (
        <View >
            <AB
                about={agent?.about}
            />
        </View>
    )
}

export default About