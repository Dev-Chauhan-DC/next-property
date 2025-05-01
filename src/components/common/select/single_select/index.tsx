import { View, Text, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/src/constants/Colors'
import { twMerge } from 'tailwind-merge';



interface Props {

    list?: { icon?: React.ReactNode, title: string }[];
    onSelect?: (index: number) => void;
    classNameItem?: string;
    selected?: number
    defaultIndex?: number
}

const SingleSelect: React.FC<Props> = ({ defaultIndex, list, onSelect, classNameItem, selected }) => {
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
                            gap-1 flex items-center justify-center p-4 rounded-[5px]`, classNameItem)}
                        key={index}>
                        {item.icon ?
                            React.cloneElement(item.icon as React.ReactElement, {
                                width: 30,
                                height: 30,
                                fill: current === index ? 'white' : Colors.gray[400]
                            })
                            : null
                        }
                        <Text className={`
                            ${current === index ? 'text-white' : 'text-gray-400'}
                            text-balance font-mMedium capitalize`}>{item.title}</Text>
                    </Pressable>
                )
            }
        </View>

    )
}

export default SingleSelect