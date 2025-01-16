import { View, Text, Pressable, Linking, GestureResponderEvent } from 'react-native'
import React, { useState } from 'react'
import VerifiedIcon from '@/src/assets/svgs/VerifiedIcon'
import { Colors } from '@/src/constants/Colors'
import Button from '@/src/components/common/button/Button'
import FacebookIcon from '@/src/assets/svgs/FacebookIcon'
import InstagramIcon from '@/src/assets/svgs/InstagramIcon'
import LinkedinIcon from '@/src/assets/svgs/LinkedinIcon'
import YoutubeIcon from '@/src/assets/svgs/YoutubeIcon'
import InfoIcon from '@/src/assets/svgs/InfoIcon'
import IconBack from '@/src/components/common/icon_back'
import EditIcon from '@/src/assets/svgs/EditIcon'
import { IBuilder } from '@/src/data/network/models/builder'


interface Props {
    name?: string | null
    employee_size?: string
    founded?: string
    website_link?: string | null
    facebook_link?: string | null
    instagram_link?: string | null
    linkedin_link?: string | null
    youtube_link?: string | null
    onPressEdit?: (event: GestureResponderEvent) => void
}
const Info: React.FC<Props> = ({ founded, website_link, name, onPressEdit, employee_size, facebook_link, instagram_link, linkedin_link, youtube_link }) => {
    return (
        <View className='px-5 mt-3.5 mb-6'>
            <View className='flex flex-row items-center justify-between gap-1.5'>
                <View className='flex flex-row items-center gap-1.5'>
                    <Text className='text-xl text-black-800 font-mSemiBold'>{name}</Text>
                    <VerifiedIcon
                        width={14}
                        height={14}
                        fill={Colors.primary}
                    />
                </View>
                {
                    onPressEdit && <IconBack
                        onPress={onPressEdit}
                        className='border border-gray-200'
                        icon={<EditIcon
                            width={12}
                            height={12}
                            fill={Colors.black[800]}
                        />}
                    />
                }

            </View>
            <View className='flex flex-row gap-1.5 items-center mb-4'>
                <Text className='font-mRegular text-base text-gray-400'>{founded}</Text>
                <View className='w-1 h-1 bg-gray-400 rounded-full' />
                <Text className='font-mRegular text-base text-gray-400'>{employee_size}</Text>
            </View>
            <View className='flex flex-row gap-1 items-center'>
                <Button
                    onPress={() => Linking.openURL(website_link || '')}
                    className='bg-transparent border border-gray-400 rounded-full h-7 w-32 '
                    classNameTitle='text-gray-400 font-mRegular'
                    title='Visit Website' />


                {
                    facebook_link &&
                    <Pressable
                        onPress={() => Linking.openURL(facebook_link || '')}
                        className='w-7 h-7 rounded-full border border-gray-400 flex items-center justify-center'>
                        <FacebookIcon
                            width={13}
                            height={13}
                            fill={Colors.gray[400]}
                        />
                    </Pressable>
                }

                {
                    instagram_link &&
                    <Pressable
                        onPress={() => Linking.openURL(instagram_link || '')}
                        className='w-7 h-7 rounded-full border border-gray-400 flex items-center justify-center'>
                        <InstagramIcon
                            width={13}
                            height={13}
                            fill={Colors.gray[400]}
                        />
                    </Pressable>
                }
                {
                    linkedin_link &&
                    <Pressable
                        onPress={() => Linking.openURL(linkedin_link || '')}
                        className='w-7 h-7 rounded-full border border-gray-400 flex items-center justify-center'>
                        <LinkedinIcon
                            width={13}
                            height={13}
                            fill={Colors.gray[400]}
                        />
                    </Pressable>
                }

                {
                    youtube_link &&
                    <Pressable
                        onPress={() => Linking.openURL(youtube_link || '')}
                        className='w-7 h-7 rounded-full border border-gray-400 flex items-center justify-center'>
                        <YoutubeIcon
                            width={13}
                            height={13}
                            fill={Colors.gray[400]}
                        />
                    </Pressable>
                }

                {/* <Pressable 
                onPress={() => Linking.openURL(website_link || '')}
                className='w-7 h-7 rounded-full border border-gray-400 flex items-center justify-center'>
                    <InfoIcon
                        width={13}
                        height={13}
                        fill={Colors.gray[400]}
                    />
                </Pressable> */}
            </View>


        </View>
    )
}

export default Info