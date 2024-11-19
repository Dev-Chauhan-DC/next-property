import { View, Text, Modal, Pressable, useWindowDimensions, GestureResponderEvent } from 'react-native'
import React, { useState } from 'react'
import ArrowIcon from '@/src/assets/svgs/ArrowIcon'
import { Colors } from '@/src/constants/Colors'
import BottomSheet from '../bottom_sheet'
import BottomSheetHeader from '../bottom_sheet/bottom_sheet_header'
import CheckIcon from '@/src/assets/svgs/CheckIcon'
import { sort } from '@/src/constants/app/Property'



interface Props {
    visible?: boolean
    onPressClose?: (event: GestureResponderEvent) => void
    onPressOutSide?: (event: GestureResponderEvent) => void
    onSelect?: (index: number) => void;
}



const SortModal: React.FC<Props> = ({ visible, onPressClose, onPressOutSide, onSelect }) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(NaN)

    return (
        <BottomSheet
            onPressOutSide={onPressOutSide}
            visible={visible}>
            <BottomSheetHeader
                onPressClose={onPressClose}
                title='Sort By' />
            {
                sort.map((item, index) =>
                    <Pressable
                        onPress={() => {
                            setSelectedIndex(index)
                            onSelect ? onSelect(index) : null
                        }}
                        key={index}
                        className='flex-row  justify-between items-center '>
                        <Text
                            className={`
                                ${selectedIndex === index ? 'text-primary ' : ' text-black-800 '}  
                                text-base  font-mRegular`}
                        >{item.title}</Text>
                        {
                            selectedIndex === index ?
                                <CheckIcon
                                    width={14}
                                    height={14}
                                    fill={Colors.primary}
                                /> : null
                        }

                    </Pressable>
                )
            }
        </BottomSheet>
    )
}

export default SortModal