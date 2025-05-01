import { View, Text, ScrollView, Pressable, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
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
import { useRecoilState, useRecoilValue } from 'recoil'
import { amenityArryState, eleManagerUpdateState, propertyState, propPhotoState, updateHighlightState, updateMealState, updatePreferenceState, updatePropertyFormDataState, updatePropertyState } from '@/src/global_state/recoil/atoms/property'
import { postProperty, updateProperty } from '@/src/data/network/services/property'
import { getError } from '@/src/utilities/halper_functions/service'
import { createPhotos, propertyPhotoCreate, propertyPhotoDelete, propertyPhotoUpdate } from '@/src/data/network/services/photo'
import { amenityBulkUpdate, createAmenities } from '@/src/data/network/services/amenity'
import { gray200 } from '@/src/constants/Images'
import IconBack from '@/src/components/common/icon_back'
import { X } from 'lucide-react-native'
import { Button } from '@/src/components/ui/button'
import { IPropertyPhoto } from '@/src/data/network/models/propertyPhoto'
import { Text as TextUi } from '@/src/components/ui/text'
import SelectModal from '@/src/components/common/select_modal'
import { photoCategoryGetAll } from '@/src/data/network/services/photoCategory'
import { IPhotoCategory } from '@/src/data/network/models/photoCategory'
import { IAmenityBulkUpdateParam } from '@/src/data/network/models/amenity'
import { IHighlighBulkCreateParam } from '@/src/data/network/models/highlight'
import { IMealBulkCreateParam } from '@/src/data/network/models/meal'
import { IPreferenceBulkCreateParam } from '@/src/data/network/models/preference'
import { highlightBulkUpdate } from '@/src/data/network/services/highlight'
import { mealBulkUpdate } from '@/src/data/network/services/meal'
import { preferenceBulkUpdate } from '@/src/data/network/services/preference'
import { ElementEnum, elementManagement } from '@/src/constants/app/Property'




const FifthScreen = () => {
    const insets = useSafeAreaInsets();
    const [counterHeight, setCounterHeight] = useState<number>(0)
    // const [imageFileIds, setImageFileIds] = useState<number[]>([]);
    // const [imageUrls, setImageUrls] = useState<string[]>([]);
    // const [loading, setLoading] = useState<boolean>(false);
    // const [property, setProperty] = useRecoilState(propertyState);
    // const [amenityArray, setAmenityArray] = useRecoilState(amenityArryState);
    const [property, setProperty] = useRecoilState(updatePropertyState);
    const [updateLoading, setUpdateLoading] = useState<boolean>(false);
    const [formData, setFormData] = useRecoilState(updatePropertyFormDataState);
    const [propPhoto, setPropPhoto] = useRecoilState(propPhotoState);
    const [pDLoading, setPDLoading] = useState<boolean>(false);
    const [categoryModal, setCategoryModal] = useState<boolean>(false);
    const [selectedPropPhoto, setSelectedPropPhoto] = useState<{ PropertyPhoto: IPropertyPhoto, index: number }>();
    const [loading, setLoading] = useState<boolean>(false);
    const [photoCategories, setPhotoCategories] = useState<IPhotoCategory[]>([]);
    const [pULoading, setPULoading] = useState<boolean>(false);
    const [pCLoading, setPCLoading] = useState<boolean>(false);
    const highlight = useRecoilValue(updateHighlightState);
    const meal = useRecoilValue(updateMealState);
    const preference = useRecoilValue(updatePreferenceState);
    const amenity = useRecoilValue(updateHighlightState);
    const [eleManager, setEleManager] = useRecoilState(eleManagerUpdateState)








    // const pickImage = async () => {
    //     try {
    //         let result = await ImagePicker.launchImageLibraryAsync({
    //             allowsEditing: true,
    //             quality: 0.1,
    //             base64: true,

    //         });

    //         if (result.canceled) {
    //             return Toast.show('Please Select Image')
    //         }

    //         if (!(result.assets[0].mimeType)) {
    //             return Toast.show('File mimeType Not Found')
    //         }

    //         if (!result.assets[0].base64) {
    //             return Toast.show('File base64 Not Found')
    //         }

    //         setLoading(true)


    //         const fileName = result.assets[0].fileName || Crypto.randomUUID()
    //         const size = result.assets[0].fileSize
    //         const type = result.assets[0].mimeType


    //         const resultGetPresignedUrl = await getPresignedUrl({
    //             fileName: fileName,
    //             ContentType: type
    //         });

    //         if (!resultGetPresignedUrl?.data) return Toast.show("Enable to get presigned url!")

    //         const presignedUrl = resultGetPresignedUrl.data;

    //         const binaryData = Buffer.from(result.assets[0].base64, 'base64');

    //         await uploadImage(presignedUrl, binaryData, type);

    //         const createFileResult = await createFile(
    //             {
    //                 name: fileName,
    //                 size: `${size}`,
    //                 storage_key: getKeyFromS3Presigned(presignedUrl),
    //                 type: type
    //             }
    //         )

    //         if (!createFileResult?.data?.data?.id) return Toast.show('Unable to find file id')

    //         const readFileResult = await readFile(createFileResult.data.data.id)

    //         setImageFileIds([...imageFileIds, createFileResult.data.data.id]);
    //         setImageUrls([...imageUrls, readFileResult.data.data])


    //         Toast.show('Image uploaded successfully!');

    //     } catch (e) {
    //         console.error(e)
    //     } finally {
    //         setLoading(false)
    //     }
    // };


    // const amenityCreateHandle = async (propertyId: number) => {
    //     try {
    //         const amArray = amenityArray.map(x => x + 1)
    //         await createAmenities(propertyId, amArray);
    //     } catch (e) {
    //         throw e
    //     }
    // }

    // const photosCreateHandle = async (propertyId: number) => {
    //     try {
    //         await createPhotos(propertyId, imageFileIds);
    //     } catch (e) {
    //         throw e
    //     }
    // }


    // const postPropertyHandle = async () => {
    //     try {
    //         setLoading(true)

    //         if (imageFileIds.length < 3 || imageUrls.length < 3) {
    //             return Toast.show("Minimum 3 images require")
    //         }

    //         // Property Create
    //         const result = await postProperty({
    //             ...property,
    //             builtUpArea: parseInt(property.builtUpArea),
    //             carpetArea: parseInt(property.carpetArea),
    //             plotArea: parseInt(property.plotArea),
    //             propertyAge: parseInt(property.propertyAge),
    //             totalFloor: parseInt(property.totalFloor),
    //             propertyFloor: parseInt(property.propertyFloor),
    //             price: parseInt(property.price),
    //             maintenance: parseInt(property.maintenance),
    //             deposit: parseInt(property.deposit),
    //         })

    //         // Amenity Create
    //         await amenityCreateHandle(result.data.data.id)

    //         // Photos Create
    //         await photosCreateHandle(result.data.data.id)



    //         Toast.show("Property Created Successfully");
    //         router.push('/(home)')

    //     } catch (e: any) {
    //         console.error(e);
    //         Toast.show(getError(e));
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    const propertyPhotoUpdateHandle = async (id: number, data: IPropertyPhoto, index: number, currentValue: string) => {
        try {
            setPULoading(true)
            await propertyPhotoUpdate(id, data);

            const arr = JSON.parse(JSON.stringify(propPhoto));;

            // if (arr[index]?.property_photo_category?.name) {
            //     arr[index].property_photo_category.name = currentValue;
            // }

            (arr[index].property_photo_category ??= {}).name = currentValue;


            setPropPhoto(arr)
        } catch (error) {
            console.error(error);
            Toast.show(getError(error))
        } finally {
            setPULoading(false)
        }
    }

    const amenityBulkUpdateHandle = async (data: IAmenityBulkUpdateParam) => {
        try {
            await amenityBulkUpdate(data)
        } catch (error) {
            console.error(error)
            Toast.show(getError(error))
        }
    }
    const highlightBulkUpdateHandle = async (data: IHighlighBulkCreateParam) => {
        try {
            await highlightBulkUpdate(data)
        } catch (error) {
            console.error(error)
            Toast.show(getError(error))
        }
    }
    const mealBulkUpdateHandle = async (data: IMealBulkCreateParam) => {
        try {
            await mealBulkUpdate(data)
        } catch (error) {
            console.error(error)
            Toast.show(getError(error))
        }
    }
    const preferenceBulkUpdateHandle = async (data: IPreferenceBulkCreateParam) => {
        try {
            await preferenceBulkUpdate(data)
        } catch (error) {
            console.error(error)
            Toast.show(getError(error))
        }
    }


    const updatePropertyHandle = async () => {
        try {
            if (!property?.id) return
            setUpdateLoading(true)
            await updateProperty(property?.id, formData);
            await highlightBulkUpdateHandle({
                propertyId: property?.id,
                ids: highlight.map(hl => hl + 1)
            });
            await mealBulkUpdateHandle({
                propertyId: property?.id,
                ids: meal.map(ml => ml + 1)
            });
            await preferenceBulkUpdateHandle({
                propertyId: property?.id,
                ids: preference.map(pr => pr + 1)
            });
            await amenityBulkUpdateHandle({
                propertyId: property?.id,
                ids: amenity.map(at => at + 1)
            });

            router.push('/(profile)')
        } catch (e) {
            console.error(e)
            Toast.show(getError(e));
        } finally {
            setUpdateLoading(false)
        }
    }

    const propertyPhotoDeleteHandle = async (id: number, index: number) => {
        try {

            Alert.alert('Are you sure', 'Do you want to delete?', [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    onPress: async () => {
                        setPDLoading(true)
                        await propertyPhotoDelete(id);

                        const PPArray = JSON.parse(JSON.stringify(propPhoto));;
                        PPArray.splice(index, 1);
                        setPropPhoto(PPArray);
                    }
                }
            ])


        } catch (error) {
            console.error(error);
            Toast.show(getError(error))
        } finally {
            setPDLoading(false)
        }
    }

    const propertyPhotoCreateHandle = async (data: IPropertyPhoto) => {
        try {
            setPCLoading(true)
            const result = await propertyPhotoCreate(data);

            return result.data
        } catch (error) {
            console.error(error);
            Toast.show(getError(error))
        } finally {
            setPCLoading(false)
        }
    }

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

            const photoResult = await propertyPhotoCreateHandle({
                properties_id: property?.id,
                file_id: createFileResult.data.data.id
            })
            setPropPhoto(prevState => [...prevState, {
                properties_id: photoResult?.properties_id,
                id: photoResult?.id,
                category_id: photoResult?.category_id,
                url: readFileResult.data.data,
                photos: readFileResult.data.data,
                file_id: createFileResult.data.data.id
            }])
            // setPropPhoto(prevState => [...prevState, { url: readFileResult.data.data, file_id: createFileResult.data.data.id }])

            // setImageFileIds([...imageFileIds, createFileResult.data.data.id]);
            // setImageUrls([...imageUrls, readFileResult.data.data])


            Toast.show('Image uploaded successfully!');

        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    };

    const photoCategoryGetAllHandle = async (name?: string) => {
        try {
            const result = await photoCategoryGetAll(name);
            setPhotoCategories(result.data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        photoCategoryGetAllHandle()
    }, [])
    return (
        <View
            style={{
                paddingTop: insets.top,
                paddingBottom: counterHeight

            }}
            className='flex-1 bg-white'
        >










            {
                elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.imageEle) &&


                <>
                    <ScrollView showsVerticalScrollIndicator={false}
                    >
                        <View className='gap-[40px] px-[10px] pb-10'>

                            <View className='flex-1 flex-row flex-wrap items-start '>

                                {
                                    propPhoto.map((item, index) =>

                                        <View
                                            key={index}
                                            className='relative w-[50%] p-[10px] gap-2'
                                        >
                                            <Image

                                                style={{
                                                    width: '100%',
                                                    height: 120,
                                                    borderRadius: 10
                                                }}
                                                source={item.photos || gray200}
                                            />
                                            <IconBack
                                                onPress={() => item.id && propertyPhotoDeleteHandle(item.id, index)}
                                                className='absolute top-0 right-0 m-4'
                                                icon={<X />}
                                            />
                                            <Button
                                                onPress={() => {
                                                    setCategoryModal(true)
                                                    setSelectedPropPhoto(prevState => ({ PropertyPhoto: item, index: index }))
                                                }}
                                                size={'sm'}
                                                variant={'outline'}
                                            >
                                                <TextUi>{item.property_photo_category?.name || "Select Category"}</TextUi>
                                            </Button>


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
                </>
            }

            <SelectModal
                // onSelect={(currentValue) => {
                //     // setFormData(e => ({ ...e, agent_id: agents.find(a => a.name === currentValue)?.id }))
                //     const arr = JSON.parse(JSON.stringify(propPhoto));
                //     arr[selectedPropPhoto?.index || 0].category_name = currentValue;
                //     arr[selectedPropPhoto?.index || 0].category_id = photoCategories.find(i => i.name === currentValue)?.id;
                //     setPropPhoto(arr);
                // }}
                onSelect={(currentValue) => {
                    selectedPropPhoto?.PropertyPhoto.id && propertyPhotoUpdateHandle(selectedPropPhoto?.PropertyPhoto.id, {
                        category_id: photoCategories.find(i => i.name === currentValue)?.id
                    }, selectedPropPhoto.index, currentValue)

                }}
                selected={selectedPropPhoto?.PropertyPhoto.category_name || ''}
                list={photoCategories.map(i => i?.name || '')}
                setVisible={setCategoryModal}
                visible={categoryModal}
            />
            <Counter
                rightTitle='Update'
                loading={updateLoading}
                onPressRight={updatePropertyHandle}
                onLayout={(e) => setCounterHeight(e.nativeEvent.layout.height)}
                className='absolute bottom-0 left-0 w-full'
                total={5}
                completed={5}
            />
        </View>
    )
}

export default FifthScreen


