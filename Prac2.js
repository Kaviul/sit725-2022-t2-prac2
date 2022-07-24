const express = require('express');
const app = express();

app.use(express.json());

const Class = [
    {std_id: 1, std_name: 'Name1', height: '5.1'},
    {std_id: 2, std_name: 'Name2', height: '5.2'},
    {std_id: 3, std_name: 'Name3', height: '5.3'},
    {std_id: 4, std_name: 'Name4', height: '5.4'},


]

app.get('/', (req, res) => {
    res.send('This is the class database.')
});

app.get('/Class', (req, res) => {
    res.send(Class);
});

app.get('/Class/:std_id', (req, res) => {
    const Student = Class.find(c => c.std_id === parseInt(req.params.std_id));
    if (!Student) res.status(404),send("No such record found");
    res.send(Student);
});

app.post('/Class', (req, res) => {
    const Student = {
        std_id: Class.length + 1,
        std_name: req.body.std_name 
    }
Class.push(Student);
res.send(Student);
});

app.put('/Class/:std_id', (req,res) => {
    const Student= Class.find(c => c.std_id === parseInt(req.params.std_id));
    if(!Student) res.status(404).send("Sorry! No such record found");
    Student.std_name= req.body.std_name;
    res.send(Student);

});

app.delete('/Class/:std_id', (req, res) => {
    const Student= Class.find(c => c.std_id === parseInt(req.params.std_id));
    if(!Student) res.status(404).send("Sorry! No such record found");

    const idx = Class.indexOf(Student);
    Class.splice(idx, 1);
    res.send(Student);
    
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at port: ${port}`));