import { View, Text, GestureResponderEvent } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import CopyIcon from '@/src/assets/svgs/CopyIcon'
import { Colors } from '@/src/constants/Colors'
import IconBack from '@/src/components/common/icon_back'
import EditIcon from '@/src/assets/svgs/EditIcon'
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-root-toast'



interface Props {
    file?: string
    title?: string
    certificate_id?: string
    onPressEdit?: (event: GestureResponderEvent) => void
}

const Certificate: React.FC<Props> = ({ file, title, onPressEdit, certificate_id }) => {

    return (
        <View className='bg-gray-100 rounded-[10px] flex flex-row items-center gap-6 p-3 overflow-hidden'>
            <Image
                style={{
                    width: 79,
                    height: 111,
                    objectFit: 'contain',
                    borderRadius: 5,
                }}
                source={file}
            />
            <View
                className='justify-between flex-col flex-1 '>
                <View className='flex flex-row items-center justify-between '>
                    <Text
                        numberOfLines={1}
                        className='text-sm font-mMedium text-black-800 flex-1'>{title}</Text>
                    {
                        onPressEdit && <IconBack
                            onPress={onPressEdit}
                            className='border border-gray-200'
                            icon={<EditIcon
                                width={12}
                                height={12}
                                fill={Colors.black[800]}
                            />}
                        />
                    }

                </View>
                <View className='flex-col justify-end gap-1.5 flex-1'>
                    <View className='flex-row items-center justify-between'>
                        <Text
                            numberOfLines={1}
                            className='text-xs font-mSemiBold text-black-800'>ID</Text>
                        <IconBack
                            className='bg-transparent'
                            onPress={async () => {
                                await Clipboard.setStringAsync('hello world');
                                Toast.show('ID Copied')
                            }}
                            icon={<CopyIcon
                                width={12}
                                height={12}
                                fill={Colors.gray[300]}
                            />}
                        />

                    </View>
                    <Text
                        numberOfLines={1}
                        className='text-sm font-mMedium text-gray-400  '>{certificate_id}</Text>
                </View>
            </View>

        </View>
    )
}

export default Certificate