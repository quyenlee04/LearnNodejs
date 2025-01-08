// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { log } = require('console');

// Initialize the app and middleware
const app = express();
app.use(bodyParser.json());

// Sample in-memory data store for to-do tasks
let todos = [
    { id: 1, task: 'Learn Node.js', completed: true  },
    { id: 2, task: 'Build a REST API', completed: false },
    { id: 3, task: 'Write unit tests', completed: false },
    { id: 4, task: 'Deploy application', completed: true },
    { id: 5, task: 'Document API endpoints', completed: false }
];
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));

// Get all to-do tasks
app.get('/todos', (req, res) => {
    res.render('todos', { todos });
});

app.post('/todos', (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        task: req.body.task,
        completed: req.body.completed || false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todoIndex = todos.findIndex(t => t.id === todoId);
    if (todoIndex !== -1) {
        todos[todoIndex] = {
            ...todos[todoIndex],
            task: req.body.task || todos[todoIndex].task,
            completed: req.body.completed || todos[todoIndex].completed
        };
        res.json(todos[todoIndex]);
    } else {
        res.status(404).send('Todo not found');
    }
});
// Add this route to toggle task completion
app.put('/todos/:id/toggle', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todoIndex = todos.findIndex(t => t.id === todoId);

    if (todoIndex !== -1) {
        // Toggle the completed status
        todos[todoIndex].completed = !todos[todoIndex].completed;
        res.json(todos[todoIndex]);
    } else {
        res.status(404).send('Todo not found');
    }
});

app.delete('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todoIndex = todos.findIndex(t => t.id === todoId);
    if (todoIndex !== -1) {
        const deletedTodo = todos.splice(todoIndex, 1);
        res.json(deletedTodo);
    } else {
        res.status(404).send('Todo not found');
    }
});
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});