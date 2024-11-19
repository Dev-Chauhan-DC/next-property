import { View, Text } from 'react-native'
import React from 'react'
import IconBack from '../icon_back';
import ArrowIcon from '@/src/assets/svgs/ArrowIcon';
import { router } from 'expo-router';
import { Colors } from '@/src/constants/Colors';



interface Props {
    title?: string;
}

const TitleBar: React.FC<Props> = ({ title }) => {
    return (
        <View className='flex flex-row items-center gap-5 px-[10px] mb-[27px]'>
            <IconBack
                onPress={() => router.back()}
                icon={<ArrowIcon
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