import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'


interface Props {
    list?: string[];
    selectedIndex?: number;
    onSelect?: (index: number) => void;
}

const Toggle: React.FC<Props> = ({ list, selectedIndex, onSelect }) => {
    const [current, setCurrent] = useState<number>(0)



    useEffect(() => {
        if (selectedIndex) {
            setCurrent(selectedIndex)
        }

    }, [selectedIndex])

    return (
        <View className='flex flex-row items-center p-[3px] rounded-full bg-gray-100 e'>
            {
                list?.map((item, index) =>
                    <Pressable
                        onPress={() => {
                            setCurrent(index);
                            onSelect ? onSelect(index) : null;
                        }}
                        key={index} className={`
                    ${current === index ? 'bg-primary' : ''}
                    h-[31px] flex items-center justify-center px-[30px] rounded-full
                    `}>
                        <Text className={`
                            
                            ${current === index ? 'text-white' : 'text-black-800'}
                            text-base font-mMedium`}>{item}</Text>
                    </Pressable>
                )
            }

        </View>
    )
}

export default Toggle