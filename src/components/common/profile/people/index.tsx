import { View, Text, Pressable, Linking, GestureResponderEvent } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'expo-image'
import FacebookIcon from '@/src/assets/svgs/FacebookIcon'
import { Colors } from '@/src/constants/Colors'
import LinkedinIcon from '@/src/assets/svgs/LinkedinIcon'
import IconBack from '@/src/components/common/icon_back'
import EditIcon from '@/src/assets/svgs/EditIcon'
import { gray200 } from '@/src/constants/Images'



interface Props {
    avatar?: string
    name?: string | null
    linkedin_link?: string
    onPressEdit?: (event: GestureResponderEvent) => void
}

const People: React.FC<Props> = ({ linkedin_link, avatar, name, onPressEdit }) => {

    return (
        <View className='bg-gray-100 rounded-[10px] flex flex-row items-center gap-8 p-4'>
            <Image
                style={{
                    width: 66,
                    height: 66,
                    objectFit: 'contain',
                    borderRadius: 200,
                }}
                source={avatar}
            />
            <View className='gap-1.5 flex-1'>
                <View className='flex items-center justify-between flex-row'>
                    <Text className='text-black-800 text-base font-mMedium'>{name}</Text>
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
                <Text className='text-gray-400 font-mMedium text-xs'>Director</Text>
                <Pressable
                    onPress={() => Linking.openURL(linkedin_link || '')}
                    className='w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center'>
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

export default People