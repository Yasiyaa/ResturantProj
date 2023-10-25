import express from 'express'

import { getAllStudent,getstudent } from './database.js'



const app = express()

app.get('/students', async (req, res) => {
    const students = await getAllStudent();
    res.send(students);
});

app.get('/student/:id', async (req, res) => {
    const id = req.params.id;
    const students = await getstudent(id);
    res.send(students);
});







app.use((err,req,res,next)=>{
    console.error(err)
    res.status(500).send('Something went wrong')
})

app.listen(8080,()=>{
    console.log('Server is running on port 8080')
})