const router = require('express').Router()
const { join } = require('path')
const fs = require('fs')
const uuid = require('uuid')

// GETnote
router.get('/notes', (req, res) => {
  fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }
    res.json(JSON.parse(data))
  })
})

// POSTnote
router.post('/notes', (req, res) => {

  fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }

    let notes = JSON.parse(data)
    let note= {
      id: uuid.v1(),
      title: req.body.title,
      text: req.body.text,
      
    }
    notes.push(note)

    fs.writeFile(join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notes), err => {
      if (err) { console.log(err) }

      res.json(note)
    })
  })
})

// PUTnote
router.put('/notes/:id', (req, res) => {

  fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }

    let notes = JSON.parse(data)

    for (let i = 0; i < notes.length; i++) {
      if (notes[i].text === req.params.id) {
        notes[i].isDone = req.body.isDone
      }
    }

    fs.writeFile(join(__dirname, '..', 'db', 'db.json'), JSON.stringify(items), err => {
      if (err) { console.log(err) }

      res.sendStatus(200)
    })
  })
})

// DELETEnote
router.delete('/notes/:id', (req, res) => {

  fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }

    let notes = JSON.parse(data)
    notes = notes.filter(note=> note.id !== req.params.id)

    fs.writeFile(join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notes), err => {
      if (err) { console.log(err) }

      res.sendStatus(200)
    })
  })
})

module.exports = router