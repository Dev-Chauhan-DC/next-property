import { View } from 'react-native'
import React, { useState } from 'react'
import UpdateInfoModal from './modals/update_info'
import { IBuilder } from '@/src/data/network/models/builder'
import InfoProfile from '@/src/components/common/profile/info'
import dayjs from 'dayjs'



interface Props {
    builder?: IBuilder
    getBuilderHandle?: () => Promise<void>
}
const Info: React.FC<Props> = ({ builder, getBuilderHandle }) => {
    const [updateModal, setUpdateModal] = useState<boolean>(false);
    return (
        <View>

            <InfoProfile
                name={builder?.name}
                onPressEdit={() => setUpdateModal(true)}
                employee_size={builder?.employee_size ? (builder?.employee_size + ' ' + 'Employees') : ''}
                facebook_link={builder?.facebook_link}
                instagram_link={builder?.instagram_link}
                linkedin_link={builder?.linkedin_link}
                youtube_link={builder?.youtube_link}
                website_link={builder?.website_link}
                founded={builder?.founded_date ? `Founded at ${dayjs(builder?.founded_date).year()}` : ''}
            />
            {/* Modals */}
            {
                updateModal &&
                <UpdateInfoModal
                    onRequestClose={() => setUpdateModal(false)}
                    onPressClose={() => setUpdateModal(false)}
                    show={updateModal}
                    builder={builder}
                    getBuilderHandle={getBuilderHandle}
                    updated={() => setUpdateModal(false)}
                />
            }

        </View>
    )
}

export default Info