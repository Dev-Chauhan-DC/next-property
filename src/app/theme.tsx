import { View, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../components/ui/text';

import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '../components/ui/select';
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { LogOut } from 'lucide-react-native';


const theme = () => {
    const insets = useSafeAreaInsets();
    const contentInsets = {
        top: insets.top,
        bottom: insets.bottom,
        left: 0,
        right: 0,
    };
    return (
        <View
            style={{
                paddingTop: insets.top
            }}
        >
            <Select defaultValue={{ value: 'apple', label: 'Apple' }}>
                <SelectTrigger className='w-[250px]'>
                    <SelectValue
                        className='text-foreground text-sm native:text-lg'
                        placeholder='Select a fruit'
                    />
                </SelectTrigger>
                <SelectContent insets={contentInsets} className='w-[250px]'>
                    <ScrollView>
                        {
                            Array(10).fill(0).map((i, index) =>
                                <SelectItem key={index} label='Apple' value='apple'>
                                    Apple
                                </SelectItem>)
                        }

                    </ScrollView>
                </SelectContent>
            </Select>
            <Dialog className=''>
                <DialogTrigger asChild>
                    <Button variant='outline'>
                        <Text>Edit Profile</Text>
                    </Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px] '>
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button>
                                <Text>OK</Text>
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Button size={'sm'} variant='default'>
                <Text>Edit Profile</Text>
            </Button>
            <Button size={'icon'} variant='default'>
                <LogOut />
            </Button>
            <Button size={'lg'} variant='default'>
                <Text>Edit Profile</Text>
            </Button>
            <Button size={'default'} variant='default'>
                <Text>Edit Profile</Text>
            </Button>
            <Button size={'sm'} variant='default'>
                <Text>Edit Profile</Text>
            </Button>
            <Button variant='destructive'>
                <Text>Edit Profile</Text>
            </Button>
            <Button variant='ghost'>
                <Text>Edit Profile</Text>
            </Button>
            <Button variant='link'>
                <Text>Edit Profile</Text>
            </Button>
            <Button variant='outline'>
                <Text>Edit Profile</Text>
            </Button>
            <Button variant='secondary'>
                <Text>Edit Profile</Text>
            </Button>

        </View>
    )
}

export default theme