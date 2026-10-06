import { error } from '@sveltejs/kit';

export const load = async ({ data }) => {
    try {
        const ReadMeFile = await import('../../README.md');
        const ReadMe = ReadMeFile.default;

        return {
            ...data,
            ReadMe
        };
    } catch (err) {
        error(500, err);
    }
};
