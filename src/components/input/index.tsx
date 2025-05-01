import { View, Text, TextInput, Pressable, KeyboardTypeOptions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Colors } from '@/src/constants/Colors';
import { twMerge } from 'tailwind-merge';



interface Props {
    placeholder?: string;
    value?: string;
    onChangeText?: ((text: string) => void) | undefined;
    className?: string;
    classNameInput?: string;
    keyboardType?: KeyboardTypeOptions
    multiline?: boolean
    height?: number
}

const Input: React.FC<Props> = ({ height, classNameInput, multiline, keyboardType, placeholder, onChangeText, value, className }) => {
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
            className={twMerge(`
                border border-gray-300 rounded-[5px] 
                // ${multiline ? 'min-h-[48px] justify-start' : 'h-[48px] justify-center'}
                bg-white  px-[13px] gap-1 py-1 flex `, className)}

            style={{
                minHeight: multiline ? height : 44
            }}
        >
            <Text className={`
                ${focus ? 'text-xs' : 'text-base'}
                 font-mRegular text-gray-400
                `}>{placeholder}</Text>

            <TextInput

                multiline={multiline}
                keyboardType={keyboardType}
                onBlur={() => {
                    if (value === "") {
                        setFocus(false);
                    }
                }}
                value={value}
                onChangeText={onChangeText}
                ref={inputRef}
                className={twMerge(`
                    ${focus ? '' : 'hidden'}
                    font-base text-black-800 font-mMedium flex-1`, classNameInput)}
                selectionColor={Colors.primary}
                style={{
                    textAlignVertical: multiline ? 'top' : 'auto',
                    minHeight: multiline ?
                        (height ? (height - 25) : 0)
                        : 17,
                }}
            />




        </Pressable>
    )
}

export default Input