import { View, Text, GestureResponderEvent } from 'react-native'
import React, { useState } from 'react'
import IconBack from '@/src/components/common/icon_back'
import EditIcon from '@/src/assets/svgs/EditIcon'
import { Colors } from '@/src/constants/Colors'

interface Props {
    title?: string
    address?: string
    onPressEdit?: (event: GestureResponderEvent) => void
}

const Address: React.FC<Props> = ({ title, onPressEdit, address }) => {
    return (
        <View className='bg-gray-100 rounded-[10px] p-3.5 gap-2.5'>
            <View className='flex flex-row items-center justify-between'>
                <Text
                    numberOfLines={1}
                    className='text-black-800 text-sm font-mMedium flex-1'>{title}</Text>
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
            <Text className='text-black-800 text-sm font-mRegular'>{address}</Text>


        </View>
    )
}

export default Address