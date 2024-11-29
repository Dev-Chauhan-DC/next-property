import { View, Text, Modal, NativeSyntheticEvent, Platform } from 'react-native'
import React from 'react'
import PagerView from 'react-native-pager-view';
import { Image } from 'expo-image'
import IconBack from '@/src/components/common/icon_back';
import CloseIcon from '@/src/assets/svgs/CloseIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ArrowIcon from '@/src/assets/svgs/ArrowIcon';




interface Props {
    visible?: boolean
    images?: string[]
    setVisible?: any
    onRequestClose?: (event: NativeSyntheticEvent<any>) => void
}

const ImageViewerModal: React.FC<Props> = ({ onRequestClose, visible, images, setVisible }) => {
    const insets = useSafeAreaInsets()
    return (
        <Modal
            onRequestClose={onRequestClose}
            animationType='fade'
            visible={visible}>
            <View className='flex-1 relative'>
                <IconBack
                    onPress={() => setVisible(false)}
                    style={{
                        marginTop: Platform.OS === 'ios' ? (insets.top + 10) : 10
                    }}
                    className='absolute top-0 left-0 bg-transparent w-6 h-6 z-50 mx-3'
                    icon={<ArrowIcon
                        width={16}
                        height={16}
                        fill={'white'}
                    />}
                >
                </IconBack>
                <PagerView
                    pageMargin={10}
                    style={{
                        flex: 1,
                        backgroundColor: 'black'
                    }}
                    initialPage={0}>

                    {
                        images?.map((item, index) =>
                            <View
                                className='flex-1 justify-center '
                                key={index}>
                                <Image
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                    placeholder={'wefwef'}
                                    source={item}
                                    contentFit="contain"
                                    transition={1000}
                                />
                            </View>
                        )
                    }


                </PagerView>
            </View>

        </Modal>
    )
}

export default ImageViewerModal