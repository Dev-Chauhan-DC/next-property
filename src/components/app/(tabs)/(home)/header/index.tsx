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
import { Button } from '@/src/components/ui/button';


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
            className='flex-row pt-2 pb-3 px-2.5 gap-2 '>

            <Button
                onPress={() => {
                    pathname === '/' ? router.replace('/(home)/list') : router.replace('/(home)')
                }}
                className='w-12 h-12 rounded-full flex items-center justify-center'
                variant={'ghost'}
                size={'sm'}
            >
                {
                    pathname === '/' ? <Rows3
                        width={20}
                        height={20}
                        color={Colors.black[800]}
                        strokeWidth={1.5}
                    /> : <MapPinned
                        strokeWidth={1.5}
                        width={20}
                        height={20}
                        color={Colors.black[800]}
                    />
                }
            </Button>



            <Pressable
                onPress={() => router.push('/search')}
                className='h-12 bg-gray-100 rounded-full flex-row justify-start items-center px-4 flex-1'>
                <Text
                    numberOfLines={1}
                    className='text-lg font-mMedium text-black-800'>{searchQuery?.result.formatted_address}</Text>
            </Pressable>


            <Button
                onPress={() => router.push('/filter')}
                className='w-12 h-12  rounded-full flex items-center justify-center'
                variant={'ghost'}
                size={'sm'}
            >
                <Filter
                    strokeWidth={1.5}
                    width={20}
                    height={20}
                    color={Colors.black[800]}
                />
            </Button>

        </View>
    )
}

export default Header