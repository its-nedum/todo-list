const express = require('express');
const todoController = require('./controllers/todoController');

const app = express();

//set up template engine
app.set('view engine', 'ejs');

//set up static files
app.use(express.static('./public'));

//fire controller
todoController(app);

//listen to port
app.listen(4242, () => {
    console.log('Server is listening on port 4242...');
})