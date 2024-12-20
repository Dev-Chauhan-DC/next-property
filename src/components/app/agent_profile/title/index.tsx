import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import ArrowIcon from '@/src/assets/svgs/ArrowIcon'
import { Colors } from '@/src/constants/Colors'



interface Props {
    title: string
    className?: string
    classNameView?: string
    rightTitle?: string
}

const Title: React.FC<Props> = ({ title, className, classNameView, rightTitle }) => {
    return (
        <View className={twMerge(`flex flex-row items-center justify-between`, classNameView)}>
            <Text className={twMerge('text-base font-mMedium text-gray-400', className)}>{title}</Text>
            {
                rightTitle ? <Pressable className='flex flex-row items-center gap-1'>
                    <Text className='text-xs text-gray-400 font-mMedium'>{rightTitle}</Text>
                    <ArrowIcon
                        width={10}
                        height={10}
                        fill={Colors.gray[400]}
                        style={{ transform: [{ rotate: '180deg' }] }}
                    />
                </Pressable> : null
            }

        </View>
    )
}

export default Title