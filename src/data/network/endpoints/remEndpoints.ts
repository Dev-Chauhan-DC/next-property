export const prepath = '/api'


export const remEndpoints = {
    // Auth
    sendOtp: `${prepath}/auth/send-otp`,
    verifyOtp: `${prepath}/auth/verify-otp-auth`,

    // User
    getUser: `${prepath}/get/user`,
    updateUser: `${prepath}/update/profile/info`,
    getUserByID: `${prepath}/user/info`,

    // Subscription
    isSubscriptionActive: `${prepath}/user/is-subscription-active`,
    createSubscription: `${prepath}/create/subscription`,

    // S3
    getPresignedUrl: `${prepath}/s3/get-presigned-url`,

    // File
    createFile: `${prepath}/file/create`,
    readFile: `${prepath}/file/read`,

    // Google Map
    placeAutocomplete: `${prepath}/place/autocomplete`,
    placeDetails: `${prepath}/place/details`,

    // Property
    postProperty: `${prepath}/list/property`,
    getUserProperties: `${prepath}/user/properties`,
    deleteProperty: `${prepath}/property`,
    searchAndFilters: `${prepath}/properties`,
    getProperty: `${prepath}/property`,
    getPropertiesByIds: `${prepath}/properties`,


    // Amenity Property
    createAmenities: `${prepath}/list/property/amenities`,

    // Photo Property
    createPhotos: `${prepath}/list/property/images/file/id`,

    // Save Property
    saveProperty: `${prepath}/save/property`,
    getSavedProperty: `${prepath}/properties/saved`,

    // Create Interested People
    createInterestedPeople: `${prepath}/list/interested/person`,

    // payments
    createOrder: `${prepath}/payment/create/order`,

    // Role
    role: `${prepath}/role`,






}