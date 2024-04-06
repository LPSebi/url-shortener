import express from 'express'
import dns from 'dns'
const app = express()

const urls = []

app.post('/api/shorturl', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    // get posted url
    console.log(req.body)
    // validate wiht dns.lookup
    if (!dns.lookup(req.body, (err) => err)) {
        res.json({
            error: 'invalid url',
        })
    }
    urls.push(req.body)
    res.json({
        original_url: req.body,
        short_url: urls.length - 1,
    })
})

app.get('/api/shorturl/:short_url', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    const short_url = req.params.short_url
    res.redirect(urls[short_url])
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
