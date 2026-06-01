export const prerender = false

import fs from 'fs/promises';
import path from 'path';

const dataFile = path.join('static', 'data', 'kartor.json');

async function readKartor() {
    try {
        const raw = await fs.readFile(dataFile, 'utf-8');
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

export const load = async () => {
    const kartor = await readKartor();
    return { 
        kartor: kartor.map((k: any) => ({
            ...k,
            date: new Date(k.date) 
        }))
    };
};

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const image = formData.get('image') as File;
        const tävling = formData.get('tävling_namn') as string;
        const datum = formData.get('kart_datum') as string;
		const distans = formData.get('tävling_distans') as string;

        if (!image) return { success: false };

        const buffer = Buffer.from(await image.arrayBuffer());
        const fileName = `${Date.now()}-${image.name}`;
        const filePath = path.join('static', 'uploads', fileName);
        await fs.writeFile(filePath, buffer);

        // Save to JSON list
        const kartor = await readKartor();
        const nyKarta = {
            src: `/uploads/${fileName}`,
            tävling,
            tävlings_distans: distans,
            date: datum
        };
        kartor.push(nyKarta);

        await fs.mkdir(path.join('static', 'data'), { recursive: true });
        await fs.writeFile(dataFile, JSON.stringify(kartor, null, 2));

        return { success: true, item: nyKarta };
    }
};