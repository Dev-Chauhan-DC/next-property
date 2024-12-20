import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import FacebookIcon from '@/src/assets/svgs/FacebookIcon'
import { Colors } from '@/src/constants/Colors'
import LinkedinIcon from '@/src/assets/svgs/LinkedinIcon'


const Item = () => {
    return (
        <View className='bg-gray-100 rounded-[10px] flex flex-row items-center gap-8 p-4'>
            <Image
                style={{
                    width: 66,
                    height: 66,
                    objectFit: 'contain',
                    borderRadius: 200,
                }}
                source={'https://picsum.photos/id/237/200/300'}
            />
            <View className='gap-1.5'>
                <Text className='text-black-800 text-base font-mMedium'>Jayesh Desai</Text>
                <Text className='text-gray-400 font-mMedium text-xs'>Director</Text>
                <Pressable className='w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center'>
                    <LinkedinIcon
                        width={10}
                        height={10}
                        fill={Colors.gray[400]}
                    />
                </Pressable>
            </View>
        </View>
    )
}

export default Item