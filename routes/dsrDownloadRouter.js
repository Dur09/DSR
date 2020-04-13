const express = require('express');
const json2xls = require('json2xls');
const fs = require('fs');
const path = require('path');

function downloadroutes(Dsr) {
	const dsrDownloadRouter = express.Router();
	dsrDownloadRouter.use(json2xls.middleware);

	dsrDownloadRouter.use('/report/:ts', (req, res, next) => {
		Dsr.find({ ts: { $eq: req.params.ts } }, (err, dsr) => {
			if (err) {
				return res.send(err);
			}
			if (dsr) {
				req.dsr = dsr;
				return next();
			}
			return res.sendStatus(404);
		});
	});

	dsrDownloadRouter.route('/report/:ts')
		.get((req, res) => {
			const xls = json2xls(req.dsr, {
				fields: {
					rsrc: 'String', 
					tid: 'String',
					ttitle: 'String',
					status: 'String',
					comments: 'String'
				}
			});

			const filename = 'data' + Date.now() + '.xlsx';
			const filepath = path.resolve('reports/' + filename);
			fs.writeFileSync(filepath, xls, 'binary');
			res.sendFile(filepath, (err) => {
				if(err){
					console.log('------ error downloading file: ' + err);
				}
			});
		});

	return dsrDownloadRouter;
}

module.exports = downloadroutes;