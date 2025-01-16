import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IBuilderAddress } from '@/src/data/network/models/builderAddress';
import { IGeometry } from '@/src/utilities/interfaces/search';
import { builderAddressCreate, builderAddressDelete, builderAddressUpdate } from '@/src/data/network/services/builderAddress';
import Toast from 'react-native-root-toast';
import { getError } from '@/src/utilities/halper_functions/service';
import Dialog from '@/src/components/modals/dialog';
import DialogHeader from '@/src/components/modals/dialog/dialog_header';
import DialogFooter from '@/src/components/modals/dialog/dialog_footer';
import DialogContent from '@/src/components/modals/dialog/dialog_content';
import Input from '@/src/components/input';
import GoogleSearchUI from '@/src/components/common/google_search_ui';
import MapView, { MapPressEvent, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { placeDetails } from '@/src/data/network/services/googleMap';
import { defaultPlaceDetails } from '@/src/constants/app/Property';
import { calculateDeltas } from '@/src/utilities/halper_functions/google_map';


interface Props {
    show?: boolean;
    onOutsideClick?: () => void;
    updated?: () => void
    deleted?: () => void
    builderAddress?: IBuilderAddress

}

const UpdateAddressModal: React.FC<Props> = ({ deleted, onOutsideClick, show, updated, builderAddress }) => {
    const [formData, setFormData] = React.useState<IBuilderAddress>({ latitude: 19.058753, longitude: 72.868153 })
    const [loading, setLoading] = useState<boolean>(false);
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
    const [displaySuggestion, setDisplaySuggestion] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState(defaultPlaceDetails);





    const builderAddressUpdateHandle = async (id: number, data: IBuilderAddress) => {
        try {
            await builderAddressUpdate(id, data)

            updated && updated();
        } catch (error) {
            console.error(error)
            Toast.show(getError(error))
        }
    }

    const builderAddressDeleteHandle = async () => {
        try {
            if (!builderAddress?.id) return
            setDeleteLoading(true)
            await builderAddressDelete(builderAddress?.id)
        } catch (error) {
            console.error(error)
            Toast.show(getError(error))
        } finally {
            setDeleteLoading(false)
        }
    }

    const placeDetailsHandle = async (placeId: string) => {
        try {
            setLoading(true);
            const result = await placeDetails(placeId);
            setSearchQuery(result.data);
        } catch (e) {
            console.error(e);
            Toast.show(getError(e));
        } finally {
            setLoading(false);
        }
    }




    useEffect(() => {
        if (builderAddress?.title) {
            setFormData(e => ({ ...e, title: builderAddress.title }))
        }
        if (builderAddress?.address) {
            setFormData(e => ({ ...e, address: builderAddress.address }))
        }
        if (builderAddress?.latitude) {
            setFormData(e => ({ ...e, latitude: builderAddress.latitude }))
        }
        if (builderAddress?.longitude) {
            setFormData(e => ({ ...e, longitude: builderAddress.longitude }))
        }
    }, [builderAddress])


    return (
        <Dialog show={show}>
            <DialogHeader onPressClose={onOutsideClick} title='Pin Your Address Location on Map *' />
            <DialogContent>
                <View className='flex-1 overflow-auto flex flex-col gap-4 items-center w-full'>

                    <View className='w-full'>
                        <View

                            className='z-50 bg-transparent w-full mb-4'>
                            <GoogleSearchUI
                                displaySuggestion={displaySuggestion}
                                loadingPlace={loading}
                                placeholder='Search Google Map'
                                onSelect={(prediction) => placeDetailsHandle(prediction.place_id)}
                            />
                        </View>
                        <View
                            className='rounded overflow-hidden'
                            style={{
                                width: '100%',
                                height: 300,
                            }}>
                            <MapView

                                provider={PROVIDER_GOOGLE}
                                style={{
                                    width: '100%',
                                    height: 300,
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
                                    setFormData(prevState => ({ ...prevState, latitude: latitude, longitude: longitude }))
                                }}
                            >
                                {formData.latitude && formData.longitude ? (
                                    <Marker
                                        coordinate={{
                                            latitude: formData.latitude,
                                            longitude: formData.longitude,
                                        }}
                                    />
                                ) : null}
                            </MapView>
                        </View>
                        {/* map */}
                        <View className='mt-5'>
                            <Text className='text-sm text-black-800 font-mMedium mb-2'>Latitude: <Text className='text-primary'>{formData.latitude}</Text></Text>
                            <Text className='text-sm text-black-800 font-mMedium'>Longitude: <Text className='text-primary'>{formData.latitude}</Text></Text>
                        </View>
                    </View>
                    <Input
                        className='w-full'
                        onChangeText={(e) => setFormData({ ...formData, title: e })}
                        placeholder='Title'
                        value={formData.title || ''}
                    />
                    <Input
                        className='w-full'
                        onChangeText={(e) => setFormData({ ...formData, address: e })}
                        placeholder='Address'
                        value={formData.address || ''}
                    />
                    <Text
                        onPress={async () => {

                            await builderAddressDeleteHandle()
                            deleted && deleted()


                        }}
                        className='cursor-pointer w-full text-red-500 underline text-sm font-mMedium text-right'>Delete</Text>

                </View>
            </DialogContent>
            <DialogFooter
                onPress={async () => {
                    if (!builderAddress?.id) return
                    await builderAddressUpdateHandle(builderAddress.id, formData)
                }}
            />
        </Dialog>
    )
}

export default UpdateAddressModal