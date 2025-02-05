import { View, Text, useWindowDimensions, Pressable } from 'react-native'
import React, { useState } from 'react'
import MenuIcon from '@/src/assets/svgs/MenuIcon';
import { Colors } from '@/src/constants/Colors';
import FilterIcon from '@/src/assets/svgs/FilterIcon';
import { Link, router, usePathname } from 'expo-router';
import MapIcon from '@/src/assets/svgs/MapIcon';
import { useRecoilState } from 'recoil';
import { searchQueryState } from '@/src/global_state/recoil/atoms/search';
import { Filter, ListFilter, MapPin, MapPinned, Rows3 } from 'lucide-react-native';


interface Props {
    getHeight?: (e: number) => void;
}

const Header: React.FC<Props> = ({ getHeight }) => {
    const pathname = usePathname()
    const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);



    return (
        <View
            onLayout={(e) => {
                getHeight && getHeight(e.nativeEvent.layout.height)
            }}
            className='flex-row py-[7px] px-2.5 gap-2 '>

            <Pressable
                onPress={() => {
                    pathname === '/' ? router.replace('/(home)/list') : router.replace('/(home)')
                }}
                className='w-10 h-10 rounded-full flex items-center justify-center'
            >
                {
                    pathname === '/' ? <Rows3
                        width={20}
                        height={20}
                        color={Colors.black[800]}
                        strokeWidth={1.25}
                    /> : <MapPinned
                        strokeWidth={1.25}
                        width={20}
                        height={20}
                        color={Colors.black[800]}
                    />
                }
            </Pressable>



            <Pressable
                onPress={() => router.push('/search')}
                className='h-10 bg-gray-100 rounded-full flex-row justify-start items-center px-4 flex-1'>
                <Text
                    numberOfLines={1}
                    className='font-mRegular'>{searchQuery?.result.formatted_address}</Text>
            </Pressable>


            <Pressable
                onPress={() => router.push('/filter')}
                className='w-10 h-10  rounded-full flex items-center justify-center' >
                <Filter
                    strokeWidth={1.25}
                    width={20}
                    height={20}
                    color={Colors.black[800]}
                />
            </Pressable>

        </View>
    )
}

export default Header