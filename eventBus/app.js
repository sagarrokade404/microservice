const { default: axios } = require('axios');
const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const events = [];


app.post('/events', (req, res) => {
    const event = req.body
    events.push(event)
    axios.post('http://localhost:3001/events',event)
    axios.post('http://localhost:3002/events',event)
    axios.post('http://localhost:3003/events',event)
    axios.post('http://localhost:3004/events',event)

    res.status(200).send({status: 'OK'});
} );

app.get('/events',(req, res) => {
    res.status(200).send(events);
})
app.listen(3006, () => {
    console.log('event bus listing on 3006')
})