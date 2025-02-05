import { View, Text, GestureResponderEvent } from 'react-native'
import React from 'react'
import IconBack from '../icon_back';
import ArrowIcon from '@/src/assets/svgs/ArrowIcon';
import { router } from 'expo-router';
import { Colors } from '@/src/constants/Colors';
import { twMerge } from 'tailwind-merge';



interface Props {
    title?: string;
    className?: string;
    icon?: React.ReactElement
    onPressIcon?: (event: GestureResponderEvent) => void
}

const TitleBar: React.FC<Props> = ({ onPressIcon, title, className, icon }) => {
    return (
        <View className={twMerge('flex flex-row items-center gap-5 px-[10px] mb-[27px]', className)}>
            <IconBack
                onPress={(e) => onPressIcon ? onPressIcon(e) : router.back()}
                icon={icon ? icon : <ArrowIcon
                    width={12}
                    height={12}
                    fill={Colors.black[800]}
                />}
            />
            <Text className='text-base font-mMedium text-black-800'>{title}</Text>
        </View>
    )
}

export default TitleBar