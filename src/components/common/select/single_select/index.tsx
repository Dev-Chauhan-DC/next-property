import { View, Text, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/src/constants/Colors'
import { twMerge } from 'tailwind-merge';



interface Props {

    list?: { icon?: React.ReactNode, title: string }[];
    onSelect?: (index: number) => void;
    classNameItem?: string;
    textClassName?: string;
    selected?: number
    defaultIndex?: number
}

const SingleSelect: React.FC<Props> = ({ textClassName, defaultIndex, list, onSelect, classNameItem, selected }) => {
    const [current, setCurrent] = useState<number>(0);


    useEffect(() => {

        if (defaultIndex !== undefined && defaultIndex !== null) {
            setCurrent(defaultIndex)
        }

    }, [defaultIndex])

    useEffect(() => {

        if (selected !== undefined && selected !== null) {
            setCurrent(selected)
        }

    }, [selected])



    return (

        <View className='flex flex-row gap-[11px] flex-wrap'>
            {
                list?.map((item, index) =>
                    <Pressable
                        onPress={() => {
                            setCurrent(index);
                            onSelect ? onSelect(index) : null
                        }}
                        className={twMerge(`
                            ${current === index ? 'bg-primary' : 'bg-gray-100'}
                            gap-1 flex items-center justify-center rounded-[5px]
                            ${item.icon ? 'p-4' : 'px-4 py-2'}
                            `, classNameItem)}
                        key={index}>
                        {item.icon ?
                            React.cloneElement(item.icon as React.ReactElement, {
                                width: 30,
                                height: 30,
                                stroke: current === index ? 'white' : Colors.gray[400],
                                strokeWidth: 1.2
                            })
                            : null
                        }
                        <Text className={twMerge(`
                            ${current === index ? 'text-white' : 'text-gray-400'}
                            text-balance font-mMedium capitalize`, textClassName)}>{item.title}</Text>
                    </Pressable>
                )
            }
        </View>

    )
}

export default SingleSelect