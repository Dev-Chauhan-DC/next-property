import { View, Text, GestureResponderEvent } from 'react-native'
import React from 'react'
import IconBack from '../icon_back';
import ArrowIcon from '@/src/assets/svgs/ArrowIcon';
import { router } from 'expo-router';
import { Colors } from '@/src/constants/Colors';
import { twMerge } from 'tailwind-merge';
import { Button as ButtonUI } from '@/src/components/ui/button'
import { Text as TextUI } from '@/src/components/ui/text'
import { ChevronLeftIcon } from 'lucide-react-native';


interface Props {
    title?: string;
    className?: string;
    icon?: React.ReactElement
    onPressIcon?: (event: GestureResponderEvent) => void
}

const TitleBar: React.FC<Props> = ({ onPressIcon, title, className, icon }) => {
    return (
        <View

            style={{
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
            }}
            className={twMerge('flex flex-row items-center gap-5 p-2.5 ', className)}>
            {/* <IconBack
                onPress={(e) => onPressIcon ? onPressIcon(e) : router.back()}
                icon={icon ? icon : <ArrowIcon
                    width={12}
                    height={12}
                    fill={Colors.black[800]}
                />}
            /> */}
            <ButtonUI
                variant={'ghost'}
                size={'icon'}
                onPress={(e) => onPressIcon ? onPressIcon(e) : router.back()}
                className='rounded-full'
            >
                <ChevronLeftIcon
                    width={20}
                    height={20}
                    stroke={Colors.black[800]}
                />
            </ButtonUI>
            <Text className='text-base font-mMedium text-black-800'>{title}</Text>
        </View>
    )
}

export default TitleBar