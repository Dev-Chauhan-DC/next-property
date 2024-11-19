export const getKeyFromS3Presigned = (presignedUrl: string) => {
    const url = decodeURIComponent(presignedUrl)
    return url.split('?')[0].split('amazonaws.com')[1].substring(1);
}