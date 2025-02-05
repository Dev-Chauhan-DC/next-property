import { View, Text } from 'react-native'
import React from 'react'
import Title from '../title'
import Address from './item.tsx'

const Addresses = () => {
    return (
        <View className='px-5 mb-14'>
            <Title
                className='mb-5'
                title='Addresses' />
            <View className='flex-col gap-2 overflow-hidden'>
                <Address />
                <Address />
                <Address />
            </View>
        </View>
    )
}

export default Addresses