import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import CopyIcon from '@/src/assets/svgs/CopyIcon'
import { Colors } from '@/src/constants/Colors'


const Certificate = () => {
    return (
        <View className='bg-gray-100 rounded-[10px] flex flex-row items-center gap-6 p-3'>
            <Image
                style={{
                    width: 79,
                    height: 111,
                    objectFit: 'contain',
                    borderRadius: 5,
                }}
                source={'https://picsum.photos/id/237/200/300'}
            />
            <View
                style={{
                    alignSelf: 'stretch',
                    flexGrow: 1
                }}
                className='justify-between   '>
                <Text className='text-sm font-medium text-black-800'>RERA Certificate</Text>
                <View className='gap-1.5'>
                    <View className='flex-row items-center justify-between'>
                        <Text className='text-xs font-mSemiBold text-black-800'>ID</Text>
                        <CopyIcon
                            width={12}
                            height={12}
                            fill={Colors.gray[300]}
                        />
                    </View>
                    <Text className='text-sm font-mMedium text-gray-400'>uih35534uh53i45hi34hi5hi34g</Text>
                </View>
            </View>
        </View>
    )
}

export default Certificate