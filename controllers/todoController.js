var bodyParser = require('body-parser');
var mongoose = require('mongoose');

 //connect to database
mongoose.connect('mongodb://test:test123@ds155833.mlab.com:55833/first_todo', { useNewUrlParser: true });

 //create a schema - this is like a blueprint
 var todoSchema = new mongoose.Schema({
    item: String
 });
// to create a model 
 var Todo = mongoose.model('Todo', todoSchema);

var urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports = function(app){

app.get('/todo',function(req,res){
    //get data from monodb and pass it ti view 
    Todo.find({}, function(err,data){
        if(err) throw err;
        res.render('todo', {items: data});
    });
});

app.post('/todo', urlencodedParser , function(req,res){
    //get data from view and store it to database
    var newTodo = Todo(req.body).save(function(err , data){
        if(err) throw err;
        res.json(data);
    });
});

app.delete('/todo/:item',function(req,res){
    //delete request item from database

    Todo.find({item:req.params.item.replace(/\-/g ,' ')}).remove(function(err,data){
        if(err) throw err;
        res.json(data);
    });
});


};