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
import PhotonSearchUI from '../components/common/placeSearch/photon_search_ui'
import AutoCompletePlaceSearch from '../components/common/placeSearch'

const SearchScreen = () => {
    const insets = useSafeAreaInsets();
    const [loading, setLoading] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
    const inputRef = useRef<TextInput>(null)


    const placeDetailsHandle = async (placeDetails: IPlaceDetails) => {
        try {
            setLoading(true);
            // const result = await placeDetails(placeId);
            setSearchQuery(placeDetails);
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
            {/* <GoogleSearchUI
                inputRef={inputRef}
                loadingPlace={loading}
                placeholder='Search Google Map'
                // onSelect={(prediction) => placeDetailsHandle(prediction.place_id)}
                onSelectPlaceDetails={placeDetailsHandle}
            />
            <PhotonSearchUI
                inputRef={inputRef}
                loadingPlace={loading}
                placeholder='Search Google Map'
                // onSelect={(prediction) => placeDetailsHandle(prediction.place_id)}
                onSelectPlaceDetails={placeDetailsHandle}
            /> */}
            <AutoCompletePlaceSearch
                inputRef={inputRef}
                loadingPlace={loading}
                placeholder='Search Google Map'
                // onSelect={(prediction) => placeDetailsHandle(prediction.place_id)}
                onSelectPlaceDetails={placeDetailsHandle}
            />

        </View>
    )
}

export default SearchScreen