const Task = require('./../models/taskModel')
const asyncWrapper = require('../middlewares/async')
const {createCustomError} = require('../errors/customError')
const getAllTasks = asyncWrapper(async (req,res)=>{
    
        const tasks = await Task.find({})
        res.status(200).json({ tasks})
       
})

const createTask = asyncWrapper(async (req,res)=>{
   
    const task = await Task.create(req.body)
    res.status(201).json({task})   
})

const getOneTask = asyncWrapper(async (req,res)=>{
    const {id:taskID} = req.params
    const task = await Task.findOne({_id:taskID})

    if(!task){
        return next(createCustomError(`No task is found with the id:${taskID}`,404))
    }
    res.status(200).json({task})
    
})

const updateTask =asyncWrapper(async (req,res)=>{

    const {id:taskID} = req.params;
    
    const task = await Task.findByIdAndUpdate({_id:taskID},req.body,{new:true,runValidators:true})

    if(!task){
        return next(createCustomError(`No task is found with the id:${taskID}`,404))
    }
    

    res.status(200).json({task})
  
})

const deleteTask = asyncWrapper(async (req,res)=>{
    const {id:taskID} = req.params;
    const task = await Task.findOneAndDelete({_id:taskID})
    if(!task){
        return next(createCustomError(`No task is found with the id:${taskID}`,404))
    }
    res.status(200).send()

    
})




module.exports = {getAllTasks,createTask,getOneTask,updateTask,deleteTask}