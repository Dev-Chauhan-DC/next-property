import { View, Text } from 'react-native'
import React from 'react'
import Title from '../title'
import Certificate from './item'

const Certificates = () => {
    return (
        <View className='px-5 mb-14'>
            <Title
                className='mb-5'
                title='Certificates' />
            <View className='gap-1'>
                <Certificate />
                <Certificate />
                <Certificate />
            </View>
        </View>
    )
}

export default Certificates