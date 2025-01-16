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
    return (
        <View >


            <AB
                about={builder?.about}
            />


        </View>
    )
}

export default About