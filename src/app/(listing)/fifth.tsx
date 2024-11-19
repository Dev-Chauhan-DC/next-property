import { View, Text, ScrollView, Pressable, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import Counter from '@/src/components/app/(listing)/counter'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import SearchInput from '@/src/components/common/google_search_ui/SearchInput'
import Suggesion from '@/src/components/common/google_search_ui/suggetion'
import { Image } from 'expo-image'
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-root-toast'
import { getPresignedUrl, uploadImage } from '@/src/data/network/services/s3'
import { IGetPresignedUrl } from '@/src/data/network/models/s3'
import * as Crypto from 'expo-crypto';
import { Buffer } from 'buffer'
import { createFile, readFile } from '@/src/data/network/services/file'
import { getKeyFromS3Presigned } from '@/src/utilities/halper_functions/s3'
import { Colors } from '@/src/constants/Colors'
import { useRecoilState } from 'recoil'
import { amenityArryState, propertyState } from '@/src/global_state/recoil/atoms/property'
import { postProperty } from '@/src/data/network/services/property'
import { getError } from '@/src/utilities/halper_functions/service'
import { createPhotos } from '@/src/data/network/services/photo'
import { createAmenities } from '@/src/data/network/services/amenity'




const FifthScreen = () => {
    const insets = useSafeAreaInsets();
    const [counterHeight, setCounterHeight] = useState<number>(0)
    const [imageFileIds, setImageFileIds] = useState<number[]>([]);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [property, setProperty] = useRecoilState(propertyState);
    const [amenityArray, setAmenityArray] = useRecoilState(amenityArryState);



    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                quality: 0.1,
                base64: true,

            });

            if (result.canceled) {
                return Toast.show('Please Select Image')
            }

            if (!(result.assets[0].mimeType)) {
                return Toast.show('File mimeType Not Found')
            }

            if (!result.assets[0].base64) {
                return Toast.show('File base64 Not Found')
            }

            setLoading(true)


            const fileName = result.assets[0].fileName || Crypto.randomUUID()
            const size = result.assets[0].fileSize
            const type = result.assets[0].mimeType


            const resultGetPresignedUrl = await getPresignedUrl({
                fileName: fileName,
                ContentType: type
            });

            if (!resultGetPresignedUrl?.data) return Toast.show("Enable to get presigned url!")

            const presignedUrl = resultGetPresignedUrl.data;

            const binaryData = Buffer.from(result.assets[0].base64, 'base64');

            await uploadImage(presignedUrl, binaryData, type);

            const createFileResult = await createFile(
                {
                    name: fileName,
                    size: `${size}`,
                    storage_key: getKeyFromS3Presigned(presignedUrl),
                    type: type
                }
            )

            if (!createFileResult?.data?.data?.id) return Toast.show('Unable to find file id')

            const readFileResult = await readFile(createFileResult.data.data.id)

            setImageFileIds([...imageFileIds, createFileResult.data.data.id]);
            setImageUrls([...imageUrls, readFileResult.data.data])


            Toast.show('Image uploaded successfully!');

        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    };


    const amenityCreateHandle = async (propertyId: number) => {
        try {
            const amArray = amenityArray.map(x => x + 1)
            await createAmenities(propertyId, amArray);
        } catch (e) {
            throw e
        }
    }

    const photosCreateHandle = async (propertyId: number) => {
        try {
            await createPhotos(propertyId, imageFileIds);
        } catch (e) {
            throw e
        }
    }


    const postPropertyHandle = async () => {
        try {
            setLoading(true)

            if (imageFileIds.length < 3 || imageUrls.length < 3) {
                return Toast.show("Minimum 3 images require")
            }

            // Property Create
            const result = await postProperty({
                ...property,
                builtUpArea: parseInt(property.builtUpArea),
                carpetArea: parseInt(property.carpetArea),
                plotArea: parseInt(property.plotArea),
                propertyAge: parseInt(property.propertyAge),
                totalFloor: parseInt(property.totalFloor),
                propertyFloor: parseInt(property.propertyFloor),
                price: parseInt(property.price),
                maintenance: parseInt(property.maintenance),
                deposit: parseInt(property.deposit),
            })

            // Amenity Create
            await amenityCreateHandle(result.data.data.id)

            // Photos Create
            await photosCreateHandle(result.data.data.id)



            Toast.show("Property Created Successfully");
            router.push('/(home)')

        } catch (e: any) {
            console.error(e);
            Toast.show(getError(e));
        } finally {
            setLoading(false)
        }
    }





    return (
        <View
            style={{
                paddingTop: insets.top,
                paddingBottom: counterHeight

            }}
            className='flex-1 bg-white'
        >
            <ScrollView showsVerticalScrollIndicator={false}
            >
                <View className='gap-[40px] px-[10px]'>

                    <View className='flex-1 flex-row flex-wrap items-start '>

                        {
                            imageUrls.map((item, index) =>

                                <View
                                    key={index}
                                    className='w-[50%] p-[10px]'
                                >
                                    <Image

                                        style={{
                                            width: '100%',
                                            height: 120,
                                            borderRadius: 10
                                        }}
                                        source={item}
                                    />


                                </View>)}
                        <View
                            className='w-[50%] p-[10px]'
                        >
                            <Pressable
                                onPress={pickImage}
                                className='border rounde-[10px] border-dashed border-gray-400 h-[120px] items-center justify-center rounded-[10px]'>

                                {
                                    loading ?
                                        <ActivityIndicator color={Colors.primary} size={'small'} />
                                        :
                                        <Text className='text-gray-400'>+</Text>
                                }

                            </Pressable>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <Counter
                onPressRight={postPropertyHandle}
                onLayout={(e) => setCounterHeight(e.nativeEvent.layout.height)}
                className='absolute bottom-0 left-0 w-full'
                total={5}
                completed={5}
            />
        </View>
    )
}

export default FifthScreen


