export const prepath = '/api'


export const remEndpoints = {
    // Auth
    sendOtp: `${prepath}/auth/send-otp`,
    verifyOtp: `${prepath}/auth/verify-otp-auth`,

    // User
    getUser: `${prepath}/get/user`,
    updateUser: `${prepath}/update/profile/info`,
    updateUserV2: `${prepath}/user`,

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
    getUserPropertiesV2: `${prepath}/properties/user`,
    deleteProperty: `${prepath}/property`,
    searchAndFilters: `${prepath}/properties-v2`,
    getProperty: `${prepath}/property`,
    getPropertyV2: (propertyId: number) => `${prepath}/property/${propertyId}`,
    getPropertiesByIds: `${prepath}/properties`,
    updateProperty: `${prepath}/property`,



    // Amenity Property
    createAmenities: `${prepath}/list/property/amenities`,
    amenityBulkUpdate: `${prepath}/amenity/bulk-update`,


    // Photo Property
    createPhotos: `${prepath}/list/property/images/file/id`,
    createPhotosV2: `${prepath}/propertyPhoto/bulk`,
    propertyPhotoCreate: `${prepath}/propertyPhoto`,
    propertyPhotoUpdate: `${prepath}/propertyPhoto`,
    propertyPhotoDelete: `${prepath}/propertyPhoto`,

    // Save Property
    saveProperty: `${prepath}/save/property`,
    getSavedProperty: `${prepath}/properties/saved`,
    getSavedPropertyV2: `${prepath}/saved-property`,


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
    builderGetAll: `${prepath}/builders`,
    builderCreate: `${prepath}/builder`,
    adminBuilderUpdate: `${prepath}/builder`,
    adminBuilderDelete: `${prepath}/admin/builder`,


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
    agentGetAll: `${prepath}/agents`,
    agentCreate: `${prepath}/agent`,
    adminAgentDelete: `${prepath}/admin/agent`,
    adminAgentUpdate: `${prepath}/agent`,


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

    // Photo Category

    photoCategoryGetAll: `${prepath}/photoCategory`,


    // conversation
    conversationCreate: `${prepath}/conversation`,
    conversationGet: `${prepath}/conversation`,


    // chat
    getChats: (conversation_id: number) => `${prepath}/chat/${conversation_id}`,



    // Highlight
    highlightBulkCreate: `${prepath}/highlight/bulk-create`,
    highlightBulkUpdate: `${prepath}/highlight/bulk-update`,


    // Meal
    mealBulkCreate: `${prepath}/meal/bulk-create`,
    mealBulkUpdate: `${prepath}/meal/bulk-update`,

    // Preference
    preferenceBulkCreate: `${prepath}/preference/bulk-create`,
    preferenceBulkUpdate: `${prepath}/preference/bulk-update`,



}