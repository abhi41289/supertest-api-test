import fs from 'fs';

export const exportJSONResponse = (filename: string, data: any) => {
    if (!fs.existsSync('temp')) {
        fs.mkdirSync('temp');
    }
    fs.writeFileSync(`temp/${filename}`, JSON.stringify(data, null, 4))
}