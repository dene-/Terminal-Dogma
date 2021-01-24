import fs from 'fs';
import path from 'path';
import * as util from 'util';
import axios from 'axios';
import extract from 'extract-zip';

const exec = util.promisify(require('child_process').exec);

export default class WaifuApi {
    constructor() {
        // Check if latest waifu2x models and binary is in the folder
        (async () => {
            try {
                if (!fs.readdirSync(__dirname).some(file => file === 'waifu2x')) {
                    let jsonReq = await axios.get('https://api.github.com/repos/nihui/waifu2x-ncnn-vulkan/releases/latest');
                    let packageURL = jsonReq.data.assets.filter(asset => asset.name.includes('ubuntu.zip'))[0].browser_download_url;

                    let fileReq = await axios({
                        method: 'GET',
                        url: packageURL,
                        responseType: 'stream'
                    });

                    let savedFile = await this.downloadFile(fileReq.data);

                    fs.readdirSync(__dirname).forEach(file => {
                        if (file.includes('waifu2x-ncnn')) {
                            fs.renameSync(__dirname + '/' + file, __dirname + '/waifu2x');
                        }
                    })

                    if (savedFile) {
                        console.log('Models downloaded.')
                    }
                }
            }
            catch (e) {
                console.log(e);
            }
        })();

        this.scriptDir = __dirname + '/waifu2x/waifu2x-ncnn-vulkan'
    }

    downloadFile(data) {
        return new Promise((resolve, reject) => {
            let stream = fs.createWriteStream(__dirname + '/waifu.zip', { encoding: null });
            data.pipe(stream);

            stream.on('finish', async () => {
                try {
                    await extract(path.resolve(__dirname + '/waifu.zip'), { dir: __dirname + '/' });
                    if (fs.existsSync(__dirname + '/waifu.zip')) {
                        fs.unlinkSync(__dirname + '/waifu.zip');
                    }
                    resolve(true);
                }
                catch (err) {
                    reject(err);
                }
            });
            stream.on('error', (err) => resolve(err));
        });
    }

    upscalePhoto(options) {
        const {
            fileName,
            scale,
            noise
        } = options;

        let input = path.resolve(__dirname, 'uploads', fileName);
        let output = path.resolve(__dirname, 'uploads', '2x_' + fileName);

        let command = `${ this.scriptDir } -i "${ input }" -o "${ output }" -n ${ noise } -s ${ scale } -t 96`;

        return new Promise(async (resolve, reject) => {
            try {
                await exec(command);
                resolve(output);
            }
            catch (err) {
                reject(err);
            }
        });
    }
}