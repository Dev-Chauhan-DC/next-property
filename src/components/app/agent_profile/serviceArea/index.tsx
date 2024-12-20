import { View, Text } from 'react-native'
import React from 'react'
import Title from '../title'
import Address from './item.tsx'

const ServiceArea = () => {
    return (
        <View className='px-5 mb-14'>
            <Title
                className='mb-5'
                title='Service Area' />
            <View className='flex-row flex-wrap gap-2 overflow-hidden'>
                <Address />
                <Address />
                <Address />
            </View>
        </View>
    )
}

export default ServiceArea