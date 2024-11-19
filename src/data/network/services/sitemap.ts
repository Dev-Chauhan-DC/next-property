import axios from 'axios';

export const updateSitemap = async (propId: number) => {
    try {
        await axios.post('/apis/update-sitemap', { propId }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (e) {
        console.error(e)
        throw e
    }
};
