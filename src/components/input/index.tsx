import { View, Text, TextInput, Pressable, KeyboardTypeOptions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Colors } from '@/src/constants/Colors';
import { twMerge } from 'tailwind-merge';



interface Props {
    placeholder?: string;
    value?: string;
    onChangeText?: ((text: string) => void) | undefined;
    className?: string;
    keyboardType?: KeyboardTypeOptions
}

const Input: React.FC<Props> = ({ keyboardType, placeholder, onChangeText, value, className }) => {
    const [focus, setFocus] = useState<boolean>(false);
    const inputRef: React.LegacyRef<TextInput> | undefined = useRef(null);




    useEffect(() => {
        if (value && value?.length > 0) {
            setFocus(true);
        }

    }, [value])

    return (
        <Pressable

            onPress={() => {
                setFocus(true);
                inputRef?.current?.focus();
            }}
            className={twMerge(`border border-gray-300 rounded-[5px] h-[44px] bg-white justify-center px-[13px] gap-1`, className)}
        >
            <Text className={`
                ${focus ? 'text-[10px]' : 'text-sm'}
                 font-mRegular text-gray-300
                `}>{placeholder}</Text>

            <TextInput
                keyboardType={keyboardType}
                onBlur={() => {
                    if (value && value.length === 0) {
                        setFocus(false);
                    }
                }}
                value={value}
                onChangeText={onChangeText}
                ref={inputRef}
                className={`
                    ${focus ? '' : 'hidden'}
                    font-sm text-black-800 font-mRegular h-[17px]`}
                selectionColor={Colors.primary}
            />




        </Pressable>
    )
}

export default Input