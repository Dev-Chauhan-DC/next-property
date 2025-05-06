import { View, Text, Modal, Pressable, useWindowDimensions, GestureResponderEvent, NativeSyntheticEvent } from 'react-native'
import React, { useState } from 'react'
import ArrowIcon from '@/src/assets/svgs/ArrowIcon'
import { Colors } from '@/src/constants/Colors'
import BottomSheet from '../bottom_sheet'
import BottomSheetHeader from '../bottom_sheet/bottom_sheet_header'
import CheckIcon from '@/src/assets/svgs/CheckIcon'
import { sort } from '@/src/constants/app/Property'
import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper, ActionsheetItem, ActionsheetItemText } from '../../ui/gs/actionsheet'



interface Props {
    visible?: boolean
    onPressClose?: (event: GestureResponderEvent) => void
    onPressOutSide?: (event: GestureResponderEvent) => void
    onSelect?: (index: number) => void;
    onRequestClose?: ((event: NativeSyntheticEvent<any>) => void) | undefined
    isOpen?: boolean | undefined
    onClose?: (() => any) | undefined
}



const SortModal: React.FC<Props> = ({ onClose, isOpen, onRequestClose, visible, onPressClose, onPressOutSide, onSelect }) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(NaN)

    return (


        <Actionsheet isOpen={isOpen} onClose={onClose}>
            <ActionsheetBackdrop />
            <ActionsheetContent className='pb-5'>
                <ActionsheetDragIndicatorWrapper>
                    <ActionsheetDragIndicator />
                </ActionsheetDragIndicatorWrapper>
                {
                    sort.map((item, index) =>
                        <ActionsheetItem
                            onPress={() => {
                                setSelectedIndex(index)
                                onSelect ? onSelect(index) : null
                            }}
                            key={index}
                            className='flex-row  justify-between items-center px-5'
                        >
                            <ActionsheetItemText
                                className={`
                                ${selectedIndex === index ? 'text-primary ' : ' text-black-800 '}  
                                text-lg  font-mMedium`}
                            >{item.title}</ActionsheetItemText>
                            {
                                selectedIndex === index ?
                                    <CheckIcon
                                        width={14}
                                        height={14}
                                        fill={Colors.primary}
                                    /> : null
                            }

                        </ActionsheetItem>
                    )
                }
            </ActionsheetContent>

        </Actionsheet>

    )
}

export default SortModal