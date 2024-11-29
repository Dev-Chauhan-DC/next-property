import { View, Text, TextInput } from 'react-native'
import React, { useCallback, useState } from 'react'
import SearchInput from './SearchInput'
import Suggesion, { IOnSelectPrediction } from './suggetion'
import Toast from 'react-native-root-toast'
import { getError } from '@/src/utilities/halper_functions/service'
import { debounce } from 'lodash';
import { placeAutocomplete } from '@/src/data/network/services/googleMap'
import { IGoogleSuggetion } from '@/src/data/network/models/googleMap'
import { twMerge } from 'tailwind-merge'





interface Props {
    onSelect?: IOnSelectPrediction
    placeholder?: string
    loadingPlace?: boolean
    className?: string
    displaySuggestion?: boolean
    inputRef?: React.LegacyRef<TextInput>
}



const GoogleSearchUI: React.FC<Props> = ({ inputRef, onSelect, placeholder, loadingPlace, className }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const [suggestion, setSuggestion] = useState<IGoogleSuggetion>();



    const placeAutocompleteHandle = async (e: string) => {
        try {
            setLoading(true);
            const result = await placeAutocomplete(e);
            setSuggestion(result.data);
        } catch (e) {
            console.error(e);
            Toast.show(getError(e));
        } finally {
            setLoading(false);
        }
    }


    const googleSuggestionHandle = useCallback(
        debounce(placeAutocompleteHandle, 300)
        , []);



    return (
        <View className={twMerge(`relative`, className)}>
            <SearchInput
                inputRef={inputRef}
                loading={loadingPlace}
                placeholder={placeholder}
                value={search}
                onChangeText={(e) => {
                    setSearch(e);
                    googleSuggestionHandle(e);
                }}
                className='h-[35px] bg-white' />
            <Suggesion
                setSuggestion={setSuggestion}
                onSelect={onSelect}
                suggestion={suggestion}
                className='absolute top-[40px] left-0 w-full' />

        </View>
    )
}

export default GoogleSearchUI