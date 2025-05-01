import axios from "axios";
import { IPhoton, IPhotonParams } from "@/src/data/network/models/photon";





export const fetchPhotonData = async (params: IPhotonParams): Promise<IPhoton> => {
    try {
        const response = await axios.get('https://photon.komoot.io/api/', {
            params: {
                bbox: '68.1,6.5,97.4,35.5',
                lang: 'en',
                limit: 4,
                ...params
            } as IPhotonParams
        });

        return response.data
    } catch (e) {
        console.error(e);
        throw e;
    }
};