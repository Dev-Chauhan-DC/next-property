import { View, Text, Pressable, GestureResponderEvent } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { truncateText } from '@/src/utilities/halper_functions/text'
import { twMerge } from 'tailwind-merge'
import CheckIcon from '@/src/assets/svgs/CheckIcon'

export const propMetaClassName = {
    number: 'text-sm font-mBold text-black-800',
    label: 'text-sm font-mRegular text-black-800',
    line: 'text-sm font-mRegular text-gray-100',
    container: 'flex flex-row gap-1'
}



interface Props {
    className?: string;
    image?: string
    price?: number
    bd?: number
    ba?: number
    kitchen?: number
    hall?: number
    sqft?: number
    address?: string
    role?: string
    onPress?: (event: GestureResponderEvent) => void
    onPressCompare?: (event: GestureResponderEvent) => void
    compare?: boolean
    compareActive?: boolean
}

const PropertyCard: React.FC<Props> = ({
    onPressCompare,
    compareActive,
    compare,
    image,
    price,
    bd, ba, kitchen, hall, sqft, address, role, className, onPress,
}) => {

    const router = useRouter()


    return (
        <Pressable
            onPress={onPress}
            className={twMerge(`mb-[30px]`, className)}>
            <View className='relative '>
                <Image
                    style={{
                        width: '100%',
                        aspectRatio: 271 / 178,
                        borderRadius: 10
                    }}
                    placeholder={image}
                    source={image}
                    contentFit="cover"
                // transition={1000}
                />
                {/* Compare */}
                {
                    compare ?
                        <Pressable
                            onPress={onPressCompare}
                            className='m-2 px-1 absolute bottom-0 right-0 flex-row items-center gap-1 h-6 bg-white rounded-full'>
                            <View
                                className={`
                                    ${compareActive ? 'bg-black-800' : ''}
                                    border border-black-800 w-4 h-4 rounded-full  items-center justify-center`}
                            >
                                {
                                    compareActive ?
                                        <CheckIcon
                                            width={8}
                                            height={8}
                                            fill={'white'}
                                        /> : null
                                }

                            </View>
                            <Text className='text-black-800 text-xs font-mMedium'>Compare</Text>
                        </Pressable>
                        :
                        null
                }

            </View>
            <View className='flex gap-[5px] mt-[10px]'>
                <Text className='font-mSemiBold text-black-800 text-base '>₹{price?.toLocaleString('en-IN')}</Text>
                <View className='flex flex-row gap-1'>
                    <View className={propMetaClassName.container}>
                        <Text className={propMetaClassName.number}>{bd?.toLocaleString('en-IN')}</Text>
                        <Text className={propMetaClassName.label}>bd</Text>
                        <Text className={propMetaClassName.line}>|</Text>
                    </View>
                    <View className={propMetaClassName.container}>
                        <Text className={propMetaClassName.number}>{ba?.toLocaleString('en-IN')}</Text>
                        <Text className={propMetaClassName.label}>ba</Text>
                        <Text className={propMetaClassName.line}>|</Text>
                    </View>
                    <View className={propMetaClassName.container}>
                        <Text className={propMetaClassName.number}>{hall?.toLocaleString('en-IN')}</Text>
                        <Text className={propMetaClassName.label}>hall</Text>
                        <Text className={propMetaClassName.line}>|</Text>
                    </View>
                    <View className={propMetaClassName.container}>
                        <Text className={propMetaClassName.number}>{kitchen?.toLocaleString('en-IN')}</Text>
                        <Text className={propMetaClassName.label}>kitchen</Text>
                        <Text className={propMetaClassName.line}>|</Text>
                    </View>
                    <View className={propMetaClassName.container}>
                        <Text className={propMetaClassName.number}>{sqft?.toLocaleString('en-IN')}</Text>
                        <Text className={propMetaClassName.label}>sqft</Text>
                        {/* <Text className={propMetaClassName.line}>|</Text> */}
                    </View>
                </View>
                <Text className='text-sm font-mRegular text-gray-400 capitalize'>{address && truncateText(address, 100, 'center')}</Text>
                <Text className='text-xs font-mBold text-gray-400 capitalize'>Listed by {role ? role : 'NP User'}</Text>
            </View>
        </Pressable>
    )
}

export default PropertyCard