import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/src/constants/Colors'
import { twMerge } from 'tailwind-merge';
import { ImageSource } from 'expo-image';
import { Grid, GridItem } from '@/src/components/ui/gs/grid';


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
    textClassName?: string;
    setSelected: React.Dispatch<React.SetStateAction<number[]>>
    selected: number[]
}

const MultipleSelectGrid: React.FC<Props> = ({ textClassName, setSelected, selected, list, onSelect, classNameItem }) => {


    const onPressHandle = (index: number) => {
        // Create the updated array directly
        let updatedArr;
        if (selected.includes(index)) {
            // If the index is selected, remove it
            updatedArr = selected.filter(i => i !== index);
        } else {
            // If not selected, add it
            updatedArr = [...selected, index];
        }

        // Update state and pass updated array to onSelect callback
        setSelected(updatedArr)
        if (onSelect) onSelect(updatedArr);
    };





    return (
        <Grid
            _extra={{
                className: 'grid-cols-2'
            }}
            className='flex flex-row gap-[11px] flex-wrap'>
            {
                list?.map((item, index) =>
                    <GridItem
                        _extra={{
                            className: "col-span-1",
                        }}
                    >
                        <Pressable
                            onPress={() => onPressHandle(index)}
                            className={twMerge(`
                            ${selected.includes(index) ? 'bg-primary' : 'bg-gray-100'}
                            gap-1 flex items-center rounded-[5px] flex-1 justify-between
                            ${item.icon ? 'p-4' : 'px-4 py-2'}
                            `, classNameItem)}
                            key={index}>
                            {item.icon ?
                                React.cloneElement(item.icon as React.ReactElement, {

                                    width: 30,
                                    height: 30,
                                    stroke: selected.includes(index) ? 'white' : Colors.gray[400],
                                    strokeWidth: 1.2
                                })
                                : null
                            }
                            <View className='flex flex-1 items-center justify-center'>
                                <Text className={twMerge(`
                            ${selected.includes(index) ? 'text-white' : 'text-gray-400'}
                            text-base font-mMedium capitalize text-center `, textClassName)}>{item.title}</Text>
                            </View>
                        </Pressable>
                    </GridItem>
                )
            }
        </Grid>
    )
}

export default MultipleSelectGrid