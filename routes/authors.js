const { Router } = require('express')

const router = Router()

router.get('/', (req, res) => {
    res.send('All authors')
})

router.get('/new', (req, res) => {
    res.send('New author form')
})

router.get('/:id', (req, res) => {
    res.send('Show author')
})

router.post('/', (req, res) => {
    res.send('Create new author')
})

router.put('/:id', (req, res) => {
    res.send('Edit author')
})

router.delete('/:id', (req, res) => {
    res.send('Delete author')
})

module.exports = router