import { View, Text, Pressable } from 'react-native'
import React from 'react'
import VerifiedIcon from '@/src/assets/svgs/VerifiedIcon'
import { Colors } from '@/src/constants/Colors'
import Button from '@/src/components/common/button/Button'
import FacebookIcon from '@/src/assets/svgs/FacebookIcon'
import InstagramIcon from '@/src/assets/svgs/InstagramIcon'
import LinkedinIcon from '@/src/assets/svgs/LinkedinIcon'
import YoutubeIcon from '@/src/assets/svgs/YoutubeIcon'
import InfoIcon from '@/src/assets/svgs/InfoIcon'

const Info = () => {
    return (
        <View className='px-5 mt-3.5 mb-6'>
            <View className='flex flex-row items-center gap-1.5'>
                <Text className='text-xl text-black-800 font-mSemiBold'>Rajhans</Text>
                <VerifiedIcon
                    width={14}
                    height={14}
                    fill={Colors.primary}
                />
            </View>
            <View className='flex flex-row gap-1.5 items-center mb-4'>
                <Text className='font-mRegular text-base text-gray-400'>Founded in 1984</Text>
                <View className='w-1 h-1 bg-gray-400 rounded-full' />
                <Text className='font-mRegular text-base text-gray-400'>10K Employee</Text>
            </View>
            <View className='flex flex-row gap-1 items-center'>
                <Button
                    className='bg-transparent border border-gray-400 rounded-full h-7 w-32 '
                    classNameTitle='text-gray-400 font-mRegular'
                    title='Visit Website' />
                <Pressable className='w-7 h-7 rounded-full border border-gray-400 flex items-center justify-center'>
                    <FacebookIcon
                        width={13}
                        height={13}
                        fill={Colors.gray[400]}
                    />
                </Pressable>
                <Pressable className='w-7 h-7 rounded-full border border-gray-400 flex items-center justify-center'>
                    <InstagramIcon
                        width={13}
                        height={13}
                        fill={Colors.gray[400]}
                    />
                </Pressable>
                <Pressable className='w-7 h-7 rounded-full border border-gray-400 flex items-center justify-center'>
                    <LinkedinIcon
                        width={13}
                        height={13}
                        fill={Colors.gray[400]}
                    />
                </Pressable>
                <Pressable className='w-7 h-7 rounded-full border border-gray-400 flex items-center justify-center'>
                    <YoutubeIcon
                        width={13}
                        height={13}
                        fill={Colors.gray[400]}
                    />
                </Pressable>
                <Pressable className='w-7 h-7 rounded-full border border-gray-400 flex items-center justify-center'>
                    <InfoIcon
                        width={13}
                        height={13}
                        fill={Colors.gray[400]}
                    />
                </Pressable>
            </View>

        </View>
    )
}

export default Info