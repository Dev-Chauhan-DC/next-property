import { View, Text, Modal } from 'react-native'
import React, { createContext, ReactNode, useContext, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Button from '@/src/components/common/button/Button';
interface AlertDialogContextProps {
    showAlert: (title: string, message: string, onConfirm: () => void) => void;
}

const AlertDialogContext = createContext<AlertDialogContextProps | undefined>(undefined);

export const AlertDialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const insets = useSafeAreaInsets()
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [onConfirm, setOnConfirm] = useState<() => void>(() => { });

    const showAlert = (title: string, message: string, onConfirm: () => void) => {


        setTitle(title);
        setMessage(message);
        setOnConfirm(() => onConfirm);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <AlertDialogContext.Provider value={{ showAlert }}>
            {children}
            <Modal
                animationType='slide'
                transparent={true}
                visible={open}>
                <View
                    style={{
                        paddingTop: insets.top,
                        paddingBottom: insets.bottom,
                        backgroundColor: '#000000b0',
                        paddingHorizontal: 20
                    }}
                    className='flex-1 flex-row flex items-center justify-center'>
                    <View className='bg-white rounded p-6 flex-1'>
                        <Text className='text-lg font-semibold text-black-800'>Delete Item</Text>
                        <Text className='text-sm text-gray-400 dark:text-neutral-400 mb-4'>Are you sure you want to delete this item?</Text>
                        <View className='flex flex-row items-center justify-end gap-2'>
                            <Button onPress={handleClose} size='sm' type='borderd' title='Cancel' />
                            <Button onPress={onConfirm} size='sm' title='Delete' />
                        </View>
                    </View>
                </View>
            </Modal>
        </AlertDialogContext.Provider>
    );
};

export const useAlertDialog = () => {
    const context = useContext(AlertDialogContext);
    if (!context) {
        throw new Error('useAlertDialog must be used within an AlertDialogProvider');
    }
    return context;
};