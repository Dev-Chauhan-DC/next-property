import { TextInput, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import GoogleSearchUI from '../components/common/google_search_ui'
import Toast from 'react-native-root-toast'
import { getError } from '../utilities/halper_functions/service'
import { placeDetails } from '../data/network/services/googleMap'
import { IPlaceDetails } from '../data/network/models/googleMap'
import { useRecoilState } from 'recoil'
import { searchQueryState } from '../global_state/recoil/atoms/search'
import { router } from 'expo-router'

const SearchScreen = () => {
    const insets = useSafeAreaInsets();
    const [loading, setLoading] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
    const inputRef = useRef<TextInput>(null)


    const placeDetailsHandle = async (placeId: string) => {
        try {
            setLoading(true);
            const result = await placeDetails(placeId);
            setSearchQuery(result.data);
            router.back();
        } catch (e) {
            console.error(e);
            Toast.show(getError(e));
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    return (
        <View
            className='px-[10px] flex-1 bg-white'
            style={{
                paddingTop: insets.top
            }}>
            <GoogleSearchUI
                inputRef={inputRef}
                loadingPlace={loading}
                placeholder='Search Google Map'
                onSelect={(prediction) => placeDetailsHandle(prediction.place_id)}
            />
        </View>
    )
}

export default SearchScreen