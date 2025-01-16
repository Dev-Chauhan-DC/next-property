import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-root-toast'
import * as Crypto from 'expo-crypto';
import { getPresignedUrl, uploadImage } from '@/src/data/network/services/s3';
import { createFile, readFile } from '@/src/data/network/services/file';
import { getKeyFromS3Presigned } from '../../s3';
import { Buffer } from 'buffer'

export interface ICreateFileHandle {
    fileId: number
    url: string
}


export const createFileHandle = async (): Promise<ICreateFileHandle> => {
    try {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 0.1,
            base64: true,

        });

        if (result.canceled) {
            return Toast.show('Please Select Image')
        }

        if (!(result.assets[0].mimeType)) {
            return Toast.show('File mimeType Not Found')
        }

        if (!result.assets[0].base64) {
            return Toast.show('File base64 Not Found')
        }



        const fileName = result.assets[0].fileName || Crypto.randomUUID()
        const size = result.assets[0].fileSize
        const type = result.assets[0].mimeType


        const resultGetPresignedUrl = await getPresignedUrl({
            fileName: fileName,
            ContentType: type
        });

        if (!resultGetPresignedUrl?.data) return Toast.show("Enable to get presigned url!")

        const presignedUrl = resultGetPresignedUrl.data;

        const binaryData = Buffer.from(result.assets[0].base64, 'base64');

        await uploadImage(presignedUrl, binaryData, type);

        const createFileResult = await createFile(
            {
                name: fileName,
                size: `${size}`,
                storage_key: getKeyFromS3Presigned(presignedUrl),
                type: type
            }
        )

        if (!createFileResult?.data?.data?.id) return Toast.show('Unable to find file id')

        const readFileResult = await readFile(createFileResult.data.data.id)


        Toast.show('Image uploaded successfully!');

        return {
            fileId: createFileResult.data.data.id,
            url: readFileResult.data.data
        }



    } catch (e) {
        throw e
    }
};