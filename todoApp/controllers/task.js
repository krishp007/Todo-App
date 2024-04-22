const { Task } = require("../models/task");

const newTask = async (req,res,next)=>{
    try {
        const {title, description} = req.body;
        await Task.create({
            title,
            description,
            user: req.user,
        });

        res.status(201).json({
            success: true,
            message:"Task added successfully",
        })
    } catch (error) {
        next(error);
    }
}

const getMyTask = async (req,res,next)=>{
    try {
        const userid = req.user._id;
        const tasks = await Task.find({user: userid});
        res.status(200).json({
            success: true,
            tasks,
        })
    } catch (error) {
        next(error);
    }
}

const updateTask = async (req,res,next)=>{
    try {
        const {id} = req.params;
        const task = await Task.findById(id);

        if(!task){
            return next(new Error("Invalid id"));
        }

        task.isCompleted = !task.isCompleted;
        await task.save();

        res.status(200).json({
            success: true,
            message: "Task updated",
        })
    } catch (error) {
        next(error);
    }
}

const deleteTask = async (req,res,next)=>{
    try {
        const {id} = req.params;
        const task = await Task.findById(id);

        if(!task){
            return next(new Error("Invalid id"));
        }

        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: "Task deleted",
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    newTask,
    getMyTask,
    updateTask,
    deleteTask,
}