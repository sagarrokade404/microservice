const expres = require('express');
const cors = require('cors');
const { default: axios } = require('axios');


const app = expres();

app.use(cors());
app.use(expres.urlencoded({extended : false}));
app.use(expres.json());

const posts = {};
const handleEvent = (type, data) => {
    
    if(type === 'PostCreated') {
        const {id , title} = data;

        posts[id] = {id,title, comment:[]};

    }

    if(type === 'CommentCreated') {

        const{id, content, postId, status} = data;

        posts[postId].comment.push({id, content, status});

    }

    if(type === 'CommentUpdated') {
        const {id, content, postId, status } = data;

        const comments = posts[postId].comment;
        const comment = comments.find(cmt => { return cmt.id === id});
        comment.status = status;
        comment.content = content;
    }
}
app.get('/query', (req, res) => {
    res.status(201).send(posts)
});

app.post('/events', (req, res) => {
    const { type , data } = req.body;

    handleEvent(type,data)
    res.status(200).send({status: 'ok'})
});

app.listen(3003, async () => {
    console.log('query server started 3003');

    await axios.get('http://localhost:3006/events').then(res => {
        
        for(let event of res.data){
            console.log(event);
            handleEvent(event.type,event.data)
        }
    })
})
