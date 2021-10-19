const express = require('express');
const cors = require('cors');
const { default: axios } = require('axios');
const app = express();

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());



app.post('/events', (req,res) => {
    const {type, data} = req.body;

    if(type === 'CommentCreated'){
        const status = data.content.includes('orange') ? 'rejected' : 'approved';

        setTimeout(() => {
            axios.post('http://localhost:3006/events', {
            type: 'CommentModarated',
            data: {
            id:data.id,
            postId: data.postId,
            status,
            content: data.content
            }
        })
        }, 100);
    };

    res.send({});

})


app.listen(3004, () => {
    console.log('modration server started at 3004');
})