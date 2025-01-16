import { View, Text, GestureResponderEvent } from 'react-native'
import React, { useState } from 'react'
import { IBuilder } from '@/src/data/network/models/builder'
import Title from '@/src/components/app/profile_info/builder/components/title'



interface Props {
    onPressEdit?: (event: GestureResponderEvent) => void
    about?: string | null
}

const About: React.FC<Props> = ({ onPressEdit, about }) => {
    return (
        <View className='px-5 py-3 bg-gray-100 mb-14'>
            <Title
                onPressEdit={onPressEdit}
                icon='edit'
                classNameView='mb-2.5'
                title='About' />
            <Text
                className='text-black-800 text-sm font-mRegular'
            >{about}</Text>
        </View>
    )
}

export default About