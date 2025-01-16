import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { IGeometry } from '@/src/utilities/interfaces/search';
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
import { IAgentAddress } from '@/src/data/network/models/agentAddress';
import { agentAddressCreate } from '@/src/data/network/services/agentAddress';


interface Props {
    show?: boolean;
    onOutsideClick?: () => void;
    updated?: () => void

}

const CreateAddress: React.FC<Props> = ({ onOutsideClick, show, updated }) => {
    const [formData, setFormData] = React.useState<IAgentAddress>({ latitude: 19.058753, longitude: 72.868153 })
    const [avatar, setAvatar] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false);
    const [displaySuggestion, setDisplaySuggestion] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState(defaultPlaceDetails);






    const agentAddressCreateHandle = async (data: Partial<IAgentAddress>) => {
        try {
            setLoading(true)
            const result = await agentAddressCreate(data);
            updated && updated()
        } catch (error) {
            console.error(error)
            Toast.show(getError(error))
        } finally {
            setLoading(false)
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




    return (
        <Dialog>
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

                </View>
            </DialogContent>
            <DialogFooter
                onPress={async () => {

                    await agentAddressCreateHandle(formData)


                }}
            />
        </Dialog>
    )
}

export default CreateAddress