import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/src/constants/Colors'
import { twMerge } from 'tailwind-merge';
import { ImageSource } from 'expo-image';


export type ISelectList = {
    icon?: React.ReactNode,
    title: string,
    name?: string,
    img?: string | number | ImageSource | ImageSource[] | string[] | null | undefined;
    meta?: {
        queryParamName?: string;
        serverId?: number;
    }
}

interface Props {
    list?: ISelectList[];
    onSelect?: (arr: number[]) => void;
    classNameItem?: string;
    setSelected?: number[]
}

const MultipleSelect: React.FC<Props> = ({ list, onSelect, classNameItem, setSelected }) => {

    const [selectedArr, setSelectedArr] = useState<number[]>([])

    const onPressHandle = (index: number) => {
        // Create the updated array directly
        let updatedArr;
        if (selectedArr.includes(index)) {
            // If the index is selected, remove it
            updatedArr = selectedArr.filter(i => i !== index);
        } else {
            // If not selected, add it
            updatedArr = [...selectedArr, index];
        }

        // Update state and pass updated array to onSelect callback
        setSelectedArr(updatedArr);
        if (onSelect) onSelect(updatedArr);
    };


    useEffect(() => {
        if (setSelected) {
            setSelectedArr(setSelected);
        }
    }, [setSelected])



    return (
        <View className='flex flex-row gap-[11px] flex-wrap'>
            {
                list?.map((item, index) =>
                    <Pressable
                        onPress={() => onPressHandle(index)}
                        className={twMerge(`
                            ${selectedArr.includes(index) ? 'bg-primary' : 'bg-gray-100'}
                            gap-1 flex items-center justify-center p-4 rounded-[5px]`, classNameItem)}
                        key={index}>
                        {item.icon ?
                            React.cloneElement(item.icon as React.ReactElement, {
                                width: 30,
                                height: 30,
                                fill: selectedArr.includes(index) ? 'white' : Colors.gray[400]
                            })
                            : null
                        }
                        <Text className={`
                            ${selectedArr.includes(index) ? 'text-white' : 'text-gray-400'}
                            text-base font-mMedium capitalize`}>{item.title}</Text>
                    </Pressable>
                )
            }
        </View>
    )
}

export default MultipleSelect