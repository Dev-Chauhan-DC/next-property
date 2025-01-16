import { View, Text, Pressable, GestureResponderEvent } from 'react-native'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import ArrowIcon from '@/src/assets/svgs/ArrowIcon'
import { Colors } from '@/src/constants/Colors'
import IconBack from '@/src/components/common/icon_back'
import EditIcon from '@/src/assets/svgs/EditIcon'
import CloseIcon from '@/src/assets/svgs/CloseIcon'
import PlusIcon from '@/src/assets/svgs/PlusIcon'



interface Props {
    title: string
    className?: string
    classNameView?: string
    rightTitle?: string
    icon?: 'plus' | 'edit'
    onPressEdit?: (event: GestureResponderEvent) => void
    onPressPlus?: (event: GestureResponderEvent) => void
}

const Title: React.FC<Props> = ({ onPressPlus, onPressEdit, icon, title, className, classNameView, rightTitle }) => {
    return (
        <View className={twMerge(`flex flex-row items-center justify-between`, classNameView)}>
            <View className='flex flex-row gap-3'>
                <Text className={twMerge('text-base font-mMedium text-gray-400', className)}>{title}</Text>
                {
                    icon === 'edit' && <IconBack
                        onPress={onPressEdit}
                        className='border border-gray-200'
                        icon={<EditIcon
                            width={12}
                            height={12}
                            fill={Colors.black[800]}
                        />}
                    />
                }
                {
                    icon === 'plus' && <IconBack
                        onPress={onPressPlus}
                        className='border border-gray-200'
                        icon={<PlusIcon
                            width={12}
                            height={12}
                            fill={Colors.black[800]}
                        />}
                    />
                }

            </View>
            {
                rightTitle ? <Pressable className='flex flex-row items-center gap-1'>
                    <Text className='text-xs text-gray-400 font-mMedium'>{rightTitle}</Text>
                    <ArrowIcon
                        width={10}
                        height={10}
                        fill={Colors.gray[400]}
                        style={{ transform: [{ rotate: '180deg' }] }}
                    />
                </Pressable> : null
            }

        </View>
    )
}

export default Title