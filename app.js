import express from 'express'
import bodyParser from 'body-parser'
import dns from 'dns'
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

const urls = []

app.post('/api/shorturl', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    // get posted url
    console.log(req.body.url)
    // validate with dns.lookup
    dns.lookup(req.body.url, (err) => {
        if (err || !req.body.url) {
            return res.json({
                error: 'invalid url',
            })
        }
        urls.push(req.body.url)
        return res.json({
            original_url: req.body.url,
            short_url: urls.length - 1,
        })
    })
})

app.get('/api/shorturl/:short_url', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    const short_url = req.params.short_url
    return res.redirect(urls[short_url])
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
