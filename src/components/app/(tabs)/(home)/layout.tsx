import { View, Text, useWindowDimensions, Platform } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from './header';
import { useRecoilValue } from 'recoil';
import { tabBarHeightAtom } from '@/src/global_state/recoil/atoms/layout';
import { twMerge } from 'tailwind-merge';



interface Props {
    children: React.ReactNode,
    className?: string
    getHeight?: (e: number) => void;
}

const HomeLayout: React.FC<Props> = ({ getHeight, children, className }) => {
    const insets = useSafeAreaInsets();
    const { height } = useWindowDimensions();
    const [headerHeight, setHeaderHeight] = useState<number>(37);
    const tebBarHeight = useRecoilValue(tabBarHeightAtom)

    return (
        <View
            className={twMerge(`flex-col`, className)}
            style={{
                paddingTop: insets.top,
                backgroundColor: 'white',
                flex: 1
            }}
        >
            <Header getHeight={(e) => {
                getHeight && getHeight(e)
                setHeaderHeight(e)
            }} />
            <View
                className='flex-1'>
                {children}
            </View>
        </View>
    )
}

export default HomeLayout