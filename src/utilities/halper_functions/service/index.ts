export const getError = (e: any): string => {
    return e?.response?.data?.data?.[0]?.msg || e?.response?.data?.message || e?.message || 'Try Again Later'
}