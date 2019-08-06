const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//connect to the database with your credentials
mongoose.connect('mongodb+srv://username:password@host:port/database?retryWrites=true&w=majority');

//create a schema - this is like a blueprint
const todoSchema = new mongoose.Schema({
    item: String
});

const Todo = mongoose.model('Todo', todoSchema);

const urlencodedParser = bodyParser.urlencoded({ extended: false })


module.exports = function(app){

app.get('/todo', function(req, res){
    //get data from mongodb and pass it to view
    Todo.find({}, function(err, data){
        if(err) throw err;
        res.render('todo', {todos:data});
    });
});

app.post('/todo', urlencodedParser, function(req, res){
    //get data from the view and add to mongodb
    const newTodo = Todo(req.body).save(function(err,data){
        if(err) throw err;
        res.json(data);
    });
});

app.delete('/todo/:item', function(req, res){
    //delete the requested item from mongodb
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).deleteOne(function(err,data){
        if(err) throw err;
        res.json(data);
    });
});

};