import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from '@/src/constants/Colors';
import { twMerge } from 'tailwind-merge';


interface Props {
    icon?: React.ReactNode;
    title: string;
    subTitle?: string;
    className?: string;
}

const IconBox: React.FC<Props> = ({ icon, title, subTitle, className }) => {
    return (

        <View className={twMerge(`flex-1 bg-gray-100 rounded-[5px] flex items-start justify-center h-[62px] overflow-hidden`, className)}>
            <View
                className='flex flex-row items-start gap-5  px-5 w-full'
            >
                {
                    icon ?
                        React.cloneElement(icon as React.ReactElement, {
                            width: 24,
                            height: 24,
                            fill: Colors.gray[400]
                        }) : null
                }
                <View>
                    <Text
                        numberOfLines={1}
                        className='text-base font-mMedium text-black-800 mb-1 pe-5 capitalize'>{title}</Text>
                    <Text
                        numberOfLines={1}
                        className='text-sm font-mRegular text-gray-400 pe-5 capitalize'>{subTitle}</Text>
                </View>

            </View>
        </View>

    )
}

export default IconBox