import { View, Text, Modal, ScrollView, Platform, NativeSyntheticEvent } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Input } from '@/src/components/ui/input';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TitleBar from '@/src/components/common/title_bar';
import { X } from 'lucide-react-native';
import { Button } from '@/src/components/ui/button';
import { Text as TextUi } from '@/src/components/ui/text';
import { IPhotoCategory } from '@/src/data/network/models/photoCategory';
import { photoCategoryGetAll } from '@/src/data/network/services/photoCategory';



interface Props {
    visible: boolean
    setVisible?: React.Dispatch<React.SetStateAction<boolean>>
    list: string[]
    selected: string
    onSelect?: (i: string) => void;
    title?: string
}

const SelectModal: React.FC<Props> = ({ title, onSelect, list, visible, setVisible, selected }) => {
    const [value, setValue] = React.useState('');
    const insets = useSafeAreaInsets();


    const onChangeText = (text: string) => {
        setValue(text);
    };


    const filteredItems = list.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
    );


    return (
        <Modal
            visible={visible}
            animationType='slide'
            onRequestClose={() => {
                setVisible?.(false)
            }}
        >
            <View
                className='flex-1 bg-white'
                style={{
                    paddingTop: Platform.OS === 'ios' ? insets.top : 0,
                    paddingBottom: Platform.OS === 'ios' ? insets.bottom : 0
                }}
            >
                <TitleBar
                    onPressIcon={() => setVisible && setVisible(false)}
                    icon={<X
                        width={20}
                        height={20}
                    />}
                    title={title ? title : 'Select Category'}
                    className='mb-4'
                />
                <View className='px-5'>
                    <Input
                        className='mb-3'
                        placeholder='Search Category'
                        value={value}
                        onChangeText={onChangeText}
                        aria-labelledby='inputLabel'
                        aria-errormessage='inputError'
                    />
                </View>
                <ScrollView className='flex-1'>
                    <View className='px-5'>
                        {
                            filteredItems.map((item, index) =>
                                <Button
                                    onPress={() => {
                                        onSelect && onSelect(item)
                                        setVisible && setVisible(false)
                                    }}
                                    className='items-start justify-start'
                                    key={index}
                                    variant={selected === item ? 'secondary' : 'ghost'}
                                ><TextUi className='text-start'>{item}</TextUi>
                                </Button>
                            )
                        }

                    </View>
                </ScrollView>
            </View>

        </Modal>
    )
}

export default SelectModal