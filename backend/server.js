const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 4000;

let Todo = require('./model')

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true })
const connection = mongoose.connection

connection.once('open', function() {
  console.log('MongoDB connection established');
})

todoRoutes.route('/').get(function(req, res) {
  Todo.find(function(err, todos) {
    if (err) {
      console.log(err);
    }
    return res.json(todos)
  })
})

todoRoutes.route('/:id').get(function(req, res) {
  Todo.findById(req.params.id, function(err, todo) {
    if (err) {
      console.log(err);
    }
    return res.json(todo)
  })
})

todoRoutes.route('/add').post(function(req, res) {
  let todo = new Todo(req.body)
  todo.save()
    .then(todo => {
      res.status(200).json({'todo': 'added succesfully'})
    })
    .catch(err => {
      res.status(400).json({'todo': 'adding failed'})
    })
})

todoRoutes.route('/update/:id').post(function(req, res){
  Todo.findById(req.params.id, function(err, todo) {
    if(!todo) {
      res.status(400).send('data not found')
    }
    todo.description = req.body.description
    todo.responsible = req.body.responsible
    todo.priority = req.body.priority
    todo.completed = req.body.completed
    todo.save()
    .then(todo => {
      res.status(200).json({'todo': 'updated succesfully'})
    })
    .catch(err => {
      res.status(400).json({'todo': 'update failed'})
    })
  })
})




app.use('/todos', todoRoutes)

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});