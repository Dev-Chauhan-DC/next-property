import { View, Text, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/src/constants/Colors'
import { twMerge } from 'tailwind-merge';



interface Props {
    list?: { icon?: React.ReactNode, title: string }[];
    onSelect?: (index: number) => void;
    classNameItem?: string;
    selected?: number
}

const SingleSelect: React.FC<Props> = ({ list, onSelect, classNameItem, selected }) => {



    return (

        <View className='flex flex-row gap-[11px] flex-wrap'>
            {
                list?.map((item, index) =>
                    <Pressable
                        onPress={() => onSelect ? onSelect(index) : null}
                        className={twMerge(`
                            ${selected === index ? 'bg-primary' : 'bg-gray-100'}
                            gap-1 flex items-center justify-center p-2 rounded-[5px]`, classNameItem)}
                        key={index}>
                        {item.icon ?
                            React.cloneElement(item.icon as React.ReactElement, {
                                width: 20,
                                height: 20,
                                fill: selected === index ? 'white' : Colors.gray[400]
                            })
                            : null
                        }
                        <Text className={`
                            ${selected === index ? 'text-white' : 'text-gray-400'}
                            text-[10px] font-mRegular `}>{item.title}</Text>
                    </Pressable>
                )
            }
        </View>

    )
}

export default SingleSelect