const express = require('express')
const Task = require('../models/todos.js')

const taskRouter = express.Router();

taskRouter.post('/', async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(422).send({
                message: 'le champs est oblegatoire!'
            })
        }
        const newTask = {
            name: req.body.name,
            description : req.body.name
        }
        const task = await Task.create(newTask);
        return res.status(200).send(task);

    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
})

taskRouter.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({})
        return res.status(200).send({ tasks })
    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
})

taskRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(500).send({
                message: "the provided id is not valid! "
            })
        }
        const task = await Task.findById(id)
        return res.status(200).send({ task })
    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
})


taskRouter.put('/:id', async (req, res) => {
    try {
        const { id } = req.params

        if (!req.body.name) {
            return res.status(422).send({
                message: 'le champs est oblegatoire!'
            })
        }

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(500).send({
                message: "the provided id is not valid! "
            })
        }
        const result = await Task.findByIdAndUpdate(id,req.body)
        if(!result){
            return res.status(500).send({
                message: "task not found!"
            })
        }
        return res.status(200).send({ message:"task update successfully!"})
    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
})



taskRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(500).send({
                message: "the provided id is not valid! "
            })
        }
        const result = await Task.findByIdAndDelete(id)
        if(!result){
            return res.status(500).send({
                message: "task not found!"
            })
        }
        return res.status(200).send({ message:"task delete successfully!"})
    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
})

module.exports = taskRouter;