import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import Counter from '@/src/components/app/(listing)/counter'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import SearchInput from '@/src/components/common/google_search_ui/SearchInput'
import Suggesion from '@/src/components/common/google_search_ui/suggetion'
import GoogleSearchUI from '@/src/components/common/google_search_ui'
import { placeDetails } from '@/src/data/network/services/googleMap'
import { searchQueryListingState, searchQueryState } from '@/src/global_state/recoil/atoms/search'
import { IPlaceDetails } from '@/src/data/network/models/googleMap'
import Toast from 'react-native-root-toast'
import { getError } from '@/src/utilities/halper_functions/service'
import MapView, { MapPressEvent, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { calculateDeltas } from '@/src/utilities/halper_functions/google_map'
import { defaultPlaceDetails, ElementEnum, elementManagement } from '@/src/constants/app/Property'
import { useRecoilState } from 'recoil'
import { eleManagerState, propertyState } from '@/src/global_state/recoil/atoms/property'
import AutoCompletePlaceSearch from '@/src/components/common/placeSearch'

const SecondScreen = () => {
    const insets = useSafeAreaInsets();
    const [counterHeight, setCounterHeight] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false);
    const [displaySuggestion, setDisplaySuggestion] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useRecoilState(searchQueryListingState);
    const [property, setProperty] = useRecoilState(propertyState);
    const [eleManager, setEleManager] = useRecoilState(eleManagerState)


    const placeDetailsHandle = async (placeDetails: IPlaceDetails) => {
        try {
            setLoading(true);
            // const result = await placeDetails(placeId);
            setSearchQuery(placeDetails);
        } catch (e) {
            console.error(e);
            Toast.show(getError(e));
        } finally {
            setLoading(false);
        }
    }

    return (
        <View
            style={{
                paddingBottom: counterHeight

            }}
            className='flex-1 bg-white'
        >

            {/* mapEle */}

            {
                elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.mapEle) &&
                <>
                    <View
                        style={{
                            marginTop: insets.top,
                        }}
                        className='absolute top-0 left-0 z-50 bg-transparent w-full px-[10px]'>
                        {/* <GoogleSearchUI
                    displaySuggestion={displaySuggestion}
                    loadingPlace={loading}
                    placeholder='Search Google Map'
                    // onSelect={(prediction) => placeDetailsHandle(prediction.place_id)}
                    onSelectPlaceDetails={placeDetailsHandle}
                /> */}
                        <AutoCompletePlaceSearch
                            displaySuggestion={displaySuggestion}
                            loadingPlace={loading}
                            placeholder='Search Google Map'
                            // onSelect={(prediction) => placeDetailsHandle(prediction.place_id)}
                            onSelectPlaceDetails={placeDetailsHandle}
                        />
                    </View>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        initialRegion={{
                            latitude: searchQuery?.result.geometry.location.lat || 21.1702401,
                            longitude: searchQuery?.result.geometry.location.lng || 72.83106070000001,
                            latitudeDelta: searchQuery ? calculateDeltas(searchQuery?.result.geometry.viewport).latitudeDelta : 0.2,
                            longitudeDelta: searchQuery ? calculateDeltas(searchQuery?.result.geometry.viewport).longitudeDelta : 0.2,
                        }}
                        region={{
                            latitude: searchQuery?.result.geometry.location.lat || 21.1702401,
                            longitude: searchQuery?.result.geometry.location.lng || 72.83106070000001,
                            latitudeDelta: searchQuery ? calculateDeltas(searchQuery?.result.geometry.viewport).latitudeDelta : 0.2,
                            longitudeDelta: searchQuery ? calculateDeltas(searchQuery?.result.geometry.viewport).longitudeDelta : 0.2,
                        }}
                        onPress={(event: MapPressEvent) => {
                            const { latitude, longitude } = event.nativeEvent.coordinate;
                            setProperty(prevState => ({ ...prevState, latitude: latitude, longitude: longitude }))
                        }}
                    >
                        {property.latitude && property.longitude ? (
                            <Marker
                                coordinate={{
                                    latitude: property.latitude,
                                    longitude: property.longitude,
                                }}
                            />
                        ) : null}
                    </MapView>
                </>
            }





            <Counter
                onPressRight={() => router.push('/(listing)/third')}
                onLayout={(e) => setCounterHeight(e.nativeEvent.layout.height)}
                className='absolute bottom-0 left-0 w-full'
                total={5}
                completed={2}
            />
        </View>
    )
}

export default SecondScreen