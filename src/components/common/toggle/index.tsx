import { View, Text, Pressable } from 'react-native'
import React from 'react'


interface Props {
    list?: string[];
    selectedIndex?: number;
    onSelect?: (index: number) => void;
}

const Toggle: React.FC<Props> = ({ list, selectedIndex, onSelect }) => {
    return (
        <View className='flex flex-row items-center p-[3px] rounded-full bg-gray-100 e'>
            {
                list?.map((item, index) =>
                    <Pressable
                        onPress={() => onSelect ? onSelect(index) : null}
                        key={index} className={`
                    ${selectedIndex === index ? 'bg-primary' : ''}
                    h-[31px] flex items-center justify-center px-[30px] rounded-full
                    `}>
                        <Text className={`
                            
                            ${selectedIndex === index ? 'text-white' : 'text-black-800'}
                            text-sm font-mRegular`}>{item}</Text>
                    </Pressable>
                )
            }

        </View>
    )
}

export default Toggle