const fs = require('fs')
const request = require('request')
const axios = require('axios')
const Path = require('path')
let rawdata = fs.readFileSync('myjsonfile.json')
let product = JSON.parse(rawdata)
let testPath = 'test'
/* var download = async function (uri, path, filename, callback) {
    await request.head(uri, async function (err, res, body) {
        console.log('content-type:', res.headers['content-type'])
        console.log('content-length:', res.headers['content-length'])

        await request(uri)
            .pipe(fs.createWriteStream(path + filename))
            .on('close', callback)
    })
}

product.map(async (p) => {
    if (p.image !== undefined) {
        await download(p.image, testPath, p.id, function () {
            console.log('done')
        })
    }
}) */

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

async function downloadImage(url, id) {
    const path = Path.resolve(__dirname, 'test', id + '.png')
    const writer = fs.createWriteStream(path)
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
    })

    response.data.pipe(writer)

    return new Promise(async (resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
        await sleep(10000)
    })
}

product.map((p) => {
    if (p.img !== undefined) {
        downloadImage(p.img, p.id)
    }
})
