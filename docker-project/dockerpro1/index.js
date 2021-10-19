const express = require('express');

const app = express();


app.get('/', (req, res) => {
    res.send('hello form docker node project PORT 8080')
});

app.listen(8080, () => {
    console.log('docker node js server started 8080')
})