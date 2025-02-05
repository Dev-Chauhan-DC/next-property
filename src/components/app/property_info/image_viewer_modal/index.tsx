import { View, Text, Modal, NativeSyntheticEvent, Platform, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import PagerView from 'react-native-pager-view';
import { Image } from 'expo-image'
import IconBack from '@/src/components/common/icon_back';
import CloseIcon from '@/src/assets/svgs/CloseIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ArrowIcon from '@/src/assets/svgs/ArrowIcon';
import { X } from 'lucide-react-native';
import { gray200 } from '@/src/constants/Images';
import { IPropertyPhoto } from '@/src/data/network/models/propertyPhoto';
import { IProperty } from '@/src/data/network/models/property';




interface Props {
    visible?: boolean
    images?: string[]
    setVisible?: any
    onRequestClose?: (event: NativeSyntheticEvent<any>) => void
    property?: IProperty | null
}

const ImageViewerModal: React.FC<Props> = ({ property, onRequestClose, visible, images, setVisible }) => {
    const insets = useSafeAreaInsets()
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [categoriesArr, setCategoriesArr] = useState<{
        name: string | null,
        photos: IPropertyPhoto[]
    }[]>([])
    const [cI, setCI] = useState<{
        name: string | null,
        photos: IPropertyPhoto[]
    }>()





    const structureImages = () => {
        const photos: IPropertyPhoto[] | undefined = property?.property_photos;
        const categorized: {
            name: string | null,
            photos: IPropertyPhoto[]
        }[] = [];

        photos?.map((photo, index) => {

            let matched = false;

            if (photo.property_photo_category === null) {

            }

            categorized.map((item, indexA) => {
                if (item.name === photo.property_photo_category?.name || item.name === photo.property_photo_category) {
                    categorized[indexA].photos.push(photo);
                    matched = true;
                    return;
                }
            })

            if (!matched) {
                categorized.push({
                    name: photo.property_photo_category === null ? null : (photo.property_photo_category?.name || ''),
                    photos: [photo]
                })
            }


        })

        setCategoriesArr(categorized)

        if (categorized?.[0]?.photos) {
            setCI(categorized[0])
        }

    }

    useEffect(() => {
        structureImages()
    }, [property])

    return (
        <Modal
            onRequestClose={onRequestClose}
            animationType='fade'
            visible={visible}>
            <View
                style={{
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom + 10
                }}
                className='flex-1 relative bg-[#000000]'>
                <View className='flex flex-row justify-between items-center px-5'>
                    <IconBack
                        onPress={() => setVisible(false)}
                        className='bg-[#000000]'
                        icon={<X
                            width={20}
                            height={20}
                            color={'white'}
                        />}
                    />

                    <Text className='text-white font-mMedium text-sm'>{currentPage} / {cI?.photos.length}</Text>

                </View>
                <PagerView
                    onPageSelected={(e) => {
                        setCurrentPage(e.nativeEvent.position + 1)
                    }}
                    pageMargin={10}
                    style={{
                        flex: 1,
                        backgroundColor: 'black'
                    }}
                    initialPage={0}>

                    {
                        cI?.photos.map((item, index) =>
                            <Pressable
                                className='flex-1 justify-center '
                                key={index}>
                                <Image
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                    source={item.photos}
                                    contentFit="contain"
                                    transition={1000}
                                />
                            </Pressable>
                        )
                    }


                </PagerView>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    className='max-h-[70px] '>
                    <View className='flex flex-row items-center gap-2'>
                        {
                            categoriesArr?.map((item, index) =>
                                <Pressable
                                    onPress={() => {
                                        setCI(item);
                                    }}
                                    key={index}
                                    className={`
                                    ${item.name === cI?.name ? 'border-[3px] border-white' : ''}
                                    relative bg-gray-100 w-[120px] h-full overflow-hidden rounded-md`}>
                                    <Image
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: 5
                                        }}
                                        source={item.photos[0].photos || gray200}
                                        contentFit="cover"
                                        transition={1000}
                                    />
                                    <View className='bg-white absolute bottom-0 left-0 w-full'>
                                        <Text
                                            numberOfLines={2}
                                            className='text-black-800 text-sm font-mMedium px-1 py-0.5'>
                                            {item.name || "Other"}
                                        </Text>
                                    </View>
                                </Pressable>
                            )
                        }
                    </View>

                </ScrollView>
            </View>

        </Modal>
    )
}

export default ImageViewerModal