const http = require('http');
const https = require('https');
const urlparser = require('url');

module.exports.getHttpContent = function (url) {
    return new Promise((resolve, reject) => {
        const protocol = (urlparser.parse(url).protocol == 'https:' ? https : http);
        const request = protocol.get(url, (response) => {
            if (response.statusCode < 200 || response.statusCode > 299) {
                reject(new Error('Failed to load page, status code: ' + response.statusCode));
            }
            const temporaryDataBody = [];
            response.on('data', (chunk) => temporaryDataBody.push(chunk));
            response.on('end', () => resolve(temporaryDataBody.join('')));
        });
        request.on('error', (err) => reject(err))
    })
};