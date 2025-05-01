import { View, Text, TextInput } from 'react-native'
import React, { useCallback, useState } from 'react'
import SearchInput from './SearchInput'
import Suggesion, { IOnSelectPrediction } from './suggetion'
import Toast from 'react-native-root-toast'
import { getError } from '@/src/utilities/halper_functions/service'
import { debounce } from 'lodash';
import { placeAutocomplete, placeDetails } from '@/src/data/network/services/googleMap'
import { IGoogleSuggetion, IPlaceDetails } from '@/src/data/network/models/googleMap'
import { twMerge } from 'tailwind-merge'
import { router } from 'expo-router'
import { fetchPhotonData } from '@/src/data/network/services/photon'
import { IPhoton, IPhotonFeature } from '@/src/data/network/models/photon'
import { convertPhotonFeature } from '@/src/utilities/halper_functions'





interface Props {
    onSelect?: IOnSelectPrediction
    onSelectPlaceDetails?: (placeDetails: IPlaceDetails) => void;
    placeholder?: string
    loadingPlace?: boolean
    className?: string
    displaySuggestion?: boolean
    inputRef?: React.LegacyRef<TextInput>
}



const PhotonSearchUI: React.FC<Props> = ({ onSelectPlaceDetails, inputRef, onSelect, placeholder, loadingPlace, className }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const [suggestion, setSuggestion] = useState<IPhoton>();



    const placeAutocompleteHandle = async (e: string) => {
        try {
            setLoading(true);
            const result = await fetchPhotonData({ q: e });
            setSuggestion(result);
        } catch (e) {
            console.error(e);
            Toast.show(getError(e));
        } finally {
            setLoading(false);
        }
    }

    const placeDetailsHandle = async (photonFeature: IPhotonFeature) => {
        try {
            setLoading(true);
            // const result = await placeDetails(placeId);

            const placeDetails: IPlaceDetails = {
                result: {
                    geometry: convertPhotonFeature(photonFeature),
                    formatted_address: photonFeature.properties.name
                }
            }



            onSelectPlaceDetails?.(placeDetails);

        } catch (e) {
            console.error(e);
            Toast.show(getError(e));
        } finally {
            setLoading(false);
        }
    }


    const photonSuggestionHandle = useCallback(
        debounce(placeAutocompleteHandle, 300)
        , []);



    return (
        <View className={twMerge(`relative`, className)}>
            <SearchInput
                inputRef={inputRef}
                loading={loadingPlace || loading}
                placeholder={placeholder}
                value={search}
                onChangeText={(e) => {
                    setSearch(e);
                    photonSuggestionHandle(e);
                }}
                className='h-[45px] bg-white' />
            <Suggesion
                setSuggestion={setSuggestion}
                onSelect={(e) => {
                    onSelect?.(e)
                    placeDetailsHandle(e)
                }}
                suggestion={suggestion}
                className='absolute top-[50px] left-0 w-full' />

        </View>
    )
}

export default PhotonSearchUI