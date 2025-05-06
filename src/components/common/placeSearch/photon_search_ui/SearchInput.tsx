import { View, Text, TextInput, ActivityIndicator, Pressable } from 'react-native'
import React from 'react'
import ArrowIcon from '@/src/assets/svgs/ArrowIcon'
import SearchIcon from '@/src/assets/svgs/SearchIcon'
import { useRouter } from 'expo-router'
import { Colors } from '@/src/constants/Colors'
import { placeAutocomplete } from '@/src/data/network/services/googleMap'
import { twMerge } from 'tailwind-merge'


interface Props {
    className?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    placeholder?: string;
    loading?: boolean;
    inputRef?: React.LegacyRef<TextInput>
}

const SearchInput: React.FC<Props> = ({ inputRef, className, value, onChangeText, placeholder, loading }) => {
    const router = useRouter();



    return (
        <View
            className={twMerge(`flex flex-row items-center gap-4 px-4 border rounded-full border-gray-200`, className)}
        >
            <Pressable
                style={{
                    width: 14,
                    height: 14
                }}
                onPress={() => router.back()}
            >
                <ArrowIcon
                    width={14}
                    height={14}
                    fill={Colors.black[800]}
                />
            </Pressable>
            <TextInput
                textAlignVertical='center'
                ref={inputRef}
                placeholderTextColor={Colors.gray[400]}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                className='font-mMedium text-lg/tight flex flex-row items-center flex-1 h-full'
                selectionColor={Colors.primary}
                style={{
                    textAlignVertical: 'center'
                }}
            />
            {
                loading ?
                    <ActivityIndicator
                        color={Colors.black[800]}
                        style={{ width: 14, height: 14 }} />
                    :
                    <SearchIcon
                        width={14}
                        height={14}
                        fill={Colors.black[800]}
                    />
            }


        </View>
    )
}

export default SearchInput