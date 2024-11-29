import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { Colors } from '@/src/constants/Colors'

const LoadingScreen = () => {
    return (
        <View className='flex-1 bg-white items-center justify-center'>
            <ActivityIndicator
                size={'small'}
                color={Colors.black[800]}
            />
        </View>
    )
}

export default LoadingScreen