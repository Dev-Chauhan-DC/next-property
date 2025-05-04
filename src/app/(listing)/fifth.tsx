import { View, Text, ScrollView, Pressable, ActivityIndicator } from 'react-native'
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
import { useRecoilState } from 'recoil'
import { amenityArryState, createPreferenceState, eleManagerState, imageFileIdsState, imageUrlsState, propertyPhotoState, propertyState, updateHighlightState, updateMealState, updatePreferenceState } from '@/src/global_state/recoil/atoms/property'
import { postProperty } from '@/src/data/network/services/property'
import { getError } from '@/src/utilities/halper_functions/service'
import { createPhotos, createPhotosV2 } from '@/src/data/network/services/photo'
import { createAmenities } from '@/src/data/network/services/amenity'
import { Button } from '@/src/components/ui/button'
import { Text as TextUi } from '@/src/components/ui/text'
import { gray200 } from '@/src/constants/Images'
import { photoCategoryGetAll } from '@/src/data/network/services/photoCategory'
import { IPhotoCategory } from '@/src/data/network/models/photoCategory'
import SelectModal from '@/src/components/common/select_modal'
import { IPropertyPhoto } from '@/src/data/network/models/propertyPhoto'
import IconBack from '@/src/components/common/icon_back'
import { X } from 'lucide-react-native'
import { ElementEnum, elementManagement, HouseTypeEnum } from '@/src/constants/app/Property'
import { IHighlighBulkCreateParam } from '@/src/data/network/models/highlight'
import { highlightBulkCreate, highlightBulkUpdate } from '@/src/data/network/services/highlight'
import { IMealBulkCreateParam } from '@/src/data/network/models/meal'
import { mealBulkCreate, mealBulkUpdate } from '@/src/data/network/services/meal'
import { IPreferenceBulkCreateParam } from '@/src/data/network/models/preference'
import { preferenceBulkCreate, preferenceBulkUpdate } from '@/src/data/network/services/preference'




const FifthScreen = () => {
    const insets = useSafeAreaInsets();
    const [counterHeight, setCounterHeight] = useState<number>(0)
    const [imageFileIds, setImageFileIds] = useRecoilState(imageFileIdsState);
    const [imageUrls, setImageUrls] = useRecoilState(imageUrlsState);
    const [loading, setLoading] = useState<boolean>(false);
    const [property, setProperty] = useRecoilState(propertyState);
    const [amenityArray, setAmenityArray] = useRecoilState(amenityArryState);
    const [categoryModal, setCategoryModal] = useState<boolean>(false);
    const [photoCategories, setPhotoCategories] = useState<IPhotoCategory[]>([]);
    // const [propPhoto, setPropPhoto] = useState<IPropertyPhoto[]>([])
    const [propPhoto, setPropPhoto] = useRecoilState(propertyPhotoState)
    const [selectedPropPhoto, setSelectedPropPhoto] = useState<{ PropertyPhoto: IPropertyPhoto, index: number }>();
    const [eleManager, setEleManager] = useRecoilState(eleManagerState)
    const [highlight, setHighlight] = useRecoilState(updateHighlightState);
    const [meal, setMeal] = useRecoilState(updateMealState);
    const [preference, setPreference] = useRecoilState(createPreferenceState);



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


            setPropPhoto(prevState => [...prevState, { url: readFileResult.data.data, file_id: createFileResult.data.data.id }])

            // setImageFileIds([...imageFileIds, createFileResult.data.data.id]);
            // setImageUrls([...imageUrls, readFileResult.data.data])


            Toast.show('Image uploaded successfully!');

        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    };

    const deleteImageHandle = (index: number) => {
        const PPArray = JSON.parse(JSON.stringify(propPhoto));
        PPArray.splice(index, 1);
        setPropPhoto(PPArray);
    }

    const photosCreateHandle = async (propertyId: number) => {
        try {

            const data: IPropertyPhoto[] = JSON.parse(JSON.stringify(propPhoto));

            data.map((i, index) => {
                data[index].properties_id = propertyId
            })

            await createPhotosV2(data);

        } catch (e) {
            throw e
        }
    }

    const amenityCreateHandle = async (propertyId: number) => {
        try {
            const amArray = amenityArray.map(x => x + 1)
            await createAmenities(propertyId, amArray);
        } catch (e) {
            throw e
        }
    }

    // const photosCreateHandle = async (propertyId: number) => {
    //     try {
    //         await createPhotos(propertyId, imageFileIds);
    //     } catch (e) {
    //         throw e
    //     }
    // }


    const highlightBulkCreateHandle = async (data: IHighlighBulkCreateParam) => {
        try {
            await highlightBulkCreate(data)
        } catch (error) {
            console.error(error)
            Toast.show(getError(error))
        }
    }
    const mealBulkCreateHandle = async (data: IMealBulkCreateParam) => {
        try {
            await mealBulkCreate(data)
        } catch (error) {
            console.error(error)
            Toast.show(getError(error))
        }
    }
    const preferenceBulkCreateHandle = async (data: IPreferenceBulkCreateParam) => {
        try {
            await preferenceBulkCreate(data)
        } catch (error) {
            console.error(error)
            Toast.show(getError(error))
        }
    }

    const postPropertyHandle = async () => {
        try {
            setLoading(true)

            if (propPhoto.length < 3 || propPhoto.length < 3) {
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

            if ([HouseTypeEnum.Room].includes(eleManager)) {

                // Highlight Create
                await highlightBulkCreateHandle({
                    ids: highlight.map(highlight => highlight + 1),
                    propertyId: result.data.data.id
                })

                // Preference Create
                await preferenceBulkCreateHandle({
                    ids: preference.map(pref => pref + 1),
                    propertyId: result.data.data.id
                })



            }
            if ([HouseTypeEnum.PG].includes(eleManager)) {

                // Meal Create
                await mealBulkCreateHandle({
                    ids: meal.map(m => m + 1),
                    propertyId: result.data.data.id
                })
            }



            Toast.show("Property Created Successfully");
            router.push('/(home)')
            setImageFileIds([])
            setImageUrls([])

        } catch (e: any) {
            console.error(e);
            Toast.show(getError(e));
        } finally {
            setLoading(false)
        }
    }

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
                paddingTop: insets.top + 10,
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
                                                source={item.url || gray200}
                                            />
                                            <IconBack
                                                onPress={() => deleteImageHandle(index)}
                                                className='absolute top-0 right-0 m-4'
                                                icon={<X
                                                />}
                                            />
                                            <Button
                                                onPress={() => {
                                                    setCategoryModal(true)
                                                    setSelectedPropPhoto(prevState => ({ PropertyPhoto: item, index: index }))
                                                }}
                                                size={'sm'}
                                                variant={'outline'}
                                            >
                                                <TextUi>{item.category_name || "Select Category"}</TextUi>
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
                    <SelectModal
                        onSelect={(currentValue) => {
                            // setFormData(e => ({ ...e, agent_id: agents.find(a => a.name === currentValue)?.id }))
                            const arr = JSON.parse(JSON.stringify(propPhoto));
                            arr[selectedPropPhoto?.index || 0].category_name = currentValue;
                            arr[selectedPropPhoto?.index || 0].category_id = photoCategories.find(i => i.name === currentValue)?.id;
                            setPropPhoto(arr);
                        }}
                        selected={selectedPropPhoto?.PropertyPhoto.category_name || ''}
                        list={photoCategories.map(i => i?.name || '')}
                        setVisible={setCategoryModal}
                        visible={categoryModal}
                    />
                </>


            }

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


