import express from 'express'

const app = express()

const urls = []

app.post('api/shorturl', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    urls.push(req.body.url)
    if (
        !(
            req.body.url.startsWith('http://') ||
            req.body.url.startsWith('https://')
        )
    ) {
        res.json({
            error: 'invalid url',
        })
    }
    res.json({
        original_url: 'https://www.google.com',
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
