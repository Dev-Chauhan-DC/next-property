import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'


interface Props {
    list?: string[];
    onSelect?: (index: number) => void;
    selected: number
    setSelected: React.Dispatch<React.SetStateAction<number>>
}

const ToggleV2: React.FC<Props> = ({ selected = 0, setSelected, list, onSelect }) => {




    return (
        <View className='flex flex-row items-center p-[3px] rounded-full bg-gray-100 e'>
            {
                list?.map((item, index) =>
                    <Pressable
                        onPress={() => {
                            setSelected(index);
                            onSelect ? onSelect(index) : null;
                        }}
                        key={index} className={`
                    ${selected === index ? 'bg-primary' : ''}
                    h-[31px] flex items-center justify-center px-[30px] rounded-full
                    `}>
                        <Text className={`
                            
                            ${selected === index ? 'text-white' : 'text-black-800'}
                            text-base font-mMedium`}>{item}</Text>
                    </Pressable>
                )
            }

        </View>
    )
}

export default ToggleV2