import sirv from 'sirv';
import compression from 'compression';
import bodyParser from 'body-parser';
import fs from 'fs';
import * as sapper from '@sapper/server';
import polka from 'polka';
import send from '@polka/send-type';
import upload from './multer'
import { createReadStream, unlinkSync } from 'fs';
import WaifuApi from './waifuapi';

const { NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const app = polka();

app.use(sirv('static', { dev }));
app.use(sirv('static/assets', { dev }));
app.use(__dirname + '/uploads');

app.use(compression({ threshold: 0 }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// RESP API

let waifuApi = new WaifuApi();

if (!fs.existsSync(__dirname + '/uploads')) {
	fs.mkdirSync(__dirname + '/uploads');
}

app.post('/yamete', (req, res) => {
	upload(req, res, async (err) => {
		if (err) {
			console.log(err);
			return send(res, 500, {
				message: 'Wrong file desu.',
				err: err
			})
		}

		if (!req.file) {
			return send(res, 500, {
				message: 'Unexpected error-kun.'
			});
		}

		let fileName = req.file.filename;

		let output = await waifuApi.upscalePhoto({
			fileName: fileName,
			scale: req.body.scale,
			noise: req.body.noise
		})

		let stream = createReadStream(output);

		return send(res, 200, stream, { 'Content-Type': req.file.mimetype });
	});
});

app.use(sapper.middleware());

// SERVER SETUP

app.listen(dev ? 3000 : 3333);