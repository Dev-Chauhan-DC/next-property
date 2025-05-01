import { View, Text, Pressable, FlatList } from 'react-native'
import React from 'react'
import { preferences } from '@/src/constants/app/Property'
import { Image } from 'expo-image'
import { ISelectList } from '@/src/components/common/select/multiple_select';
import { gray200 } from '@/src/constants/Images';
import { Grid, GridItem } from '@/src/components/ui/gs/grid';





interface Props {
    option?: ISelectList[];
    onSelect?: (array: number[]) => void;
    className?: string;
    classNameItem?: string;
    classNameText?: string;
    defaultSelected?: number[];
    setSelected: React.Dispatch<React.SetStateAction<number[]>>
    selected: number[]
}
const PreferenceSelect: React.FC<Props> = ({ setSelected, selected, defaultSelected, option, onSelect, className, classNameItem, classNameText }) => {


    const selectHandle = (index: number) => {
        const arr = [...selected]
        const arrIndex = arr.indexOf(index);
        if (arrIndex === -1) {
            arr.push(index)
            setSelected(arr)
            onSelect ? onSelect(arr) : null
            return;
        }

        arr.splice(arrIndex, 1);
        setSelected(arr)
        onSelect ? onSelect(arr) : null

    }
    return (
        <View>
            {/* <FlatList

                columnWrapperStyle={{ gap: 10 }}
                data={preferences}
                renderItem={({ item, index }) => (
                    <Pressable
                        onPress={() => selectHandle(index)}
                        className='items-center gap-1 flex-1'

                    >
                        <Pressable
                            onPress={() => selectHandle(index)}
                            className={`
                ${selected.includes(index) ? 'bg-primary/10 border-primary' : 'border-gray-200 hover:bg-gray-100'}
                flex items-center justify-center border rounded-[5px]`}>
                            <Image
                                style={{
                                    width: 100,
                                    height: 100
                                }}
                                alt={item.title}
                                source={item?.img || gray200}
                            />
                        </Pressable>
                        <Text className={`
                ${selected.includes(index) ? 'text-primary' : 'text-black-800'}
                text-base font-mMedium  capitalize`}>{item.title}</Text>
                    </Pressable>
                )}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            /> */}

            <Grid
                className="gap-3"
                _extra={{
                    className: "grid-cols-3",
                }}
            >
                {
                    preferences.map((item, index) =>

                        <GridItem
                            key={item.meta?.serverId}
                            className=""
                            _extra={{
                                className: "col-span-1",
                            }}
                        >
                            <Pressable
                                onPress={() => selectHandle(index)}
                                className='items-center gap-1 flex-1'

                            >
                                <Pressable
                                    onPress={() => selectHandle(index)}
                                    className={`
            ${selected.includes(index) ? 'bg-primary/10 border-primary' : 'border-gray-200 hover:bg-gray-100'}
            flex items-center justify-center border rounded-[5px]`}>
                                    <Image
                                        style={{
                                            width: 100,
                                            height: 100
                                        }}
                                        alt={item.title}
                                        source={item?.img || gray200}
                                    />
                                </Pressable>
                                <Text className={`
            ${selected.includes(index) ? 'text-primary' : 'text-black-800'}
            text-base font-mMedium  capitalize`}>{item.title}</Text>
                            </Pressable>
                        </GridItem>

                    )
                }


            </Grid>
        </View>
    )
}

export default PreferenceSelect