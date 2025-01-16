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

    // Builder
    builderUpdate: `${prepath}/builder`,
    builderGetCurrent: `${prepath}/builder`,
    builderGet: `${prepath}/builder`,


    // Builder Team 
    builderTeamCreate: `${prepath}/builderTeam`,
    builderTeamGet: `${prepath}/builderTeams`,
    builderTeamGetAllByBuilder: `${prepath}/builderTeams/builder`,
    builderTeamUpdate: `${prepath}/builderTeams`,
    builderTeamDelete: `${prepath}/builderTeams`,


    // Builder Address
    builderAddressCreate: `${prepath}/builderAddress`,
    builderAddressGet: `${prepath}/builderAddress`,
    builderAddressUpdate: `${prepath}/builderAddress`,
    builderAddressDelete: `${prepath}/builderAddress`,
    builderAddressGetAllByBuilder: `${prepath}/builderAddress/builder`,


    // Builder Certificate 
    builderCertificateCreate: `${prepath}/builderCertificate`,
    builderCertificateGet: `${prepath}/builderCertificate`,
    builderCertificateUpdate: `${prepath}/builderCertificate`,
    builderCertificateDelete: `${prepath}/builderCertificate`,
    builderCertificateGetAllByBuilder: `${prepath}/builderCertificate/builder`,

    // Builder Update 
    builderUpdateCreate: `${prepath}/builderUpdate`,
    builderUpdateGet: `${prepath}/builderUpdate`,
    builderUpdateUpdate: `${prepath}/builderUpdate`,
    builderUpdateDelete: `${prepath}/builderUpdate`,
    builderUpdateGetAllByBuilder: `${prepath}/builderUpdate/builder`,




    // Agent
    agentUpdate: `${prepath}/agent`,
    agentGetCurrent: `${prepath}/agent`,
    agentGet: `${prepath}/agent`,


    // agent Address
    agentAddressCreate: `${prepath}/agentAddress`,
    agentAddressGet: `${prepath}/agentAddress`,
    agentAddressUpdate: `${prepath}/agentAddress`,
    agentAddressDelete: `${prepath}/agentAddress`,
    agentAddressGetAllByAgent: `${prepath}/agentAddress/agent`,

    // Builder Certificate 
    agentCertificateCreate: `${prepath}/agentCertificate`,
    agentCertificateGet: `${prepath}/agentCertificate`,
    agentCertificateUpdate: `${prepath}/agentCertificate`,
    agentCertificateDelete: `${prepath}/agentCertificate`,
    agentCertificateGetAllByAgent: `${prepath}/agentCertificate/agent`,


}