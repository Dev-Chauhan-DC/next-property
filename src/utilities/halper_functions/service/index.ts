export const getError = (e: any): string => {
    return e?.response?.data?.data?.[0]?.msg || 'Try Again Later'
}