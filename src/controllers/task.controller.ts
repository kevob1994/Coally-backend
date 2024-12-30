import { Request, Response } from 'express';
import Task from '../models/task.model';
import { ErrorType } from '../utils/constants';

export const createTask = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;
        const userId = req.user.id;

        const newTask = new Task({
            title,
            description,
            user: userId,
        });

        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: ErrorType.ErrorCreatingTask, error });
    }
};

export const getTasksByUser = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const { completed } = req.query;
        const filter: { user: string; completed?: boolean } = { user: userId };

        if (completed !== undefined) {
            filter.completed = completed === 'true';
        }

        const tasks = await Task.find(filter);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: ErrorType.ErrorGetTask, error });
    }
};

export const getTaskById = async (req: Request, res: Response) => {
    try {
        const { taskId } = req.params;
        const userId = req.user.id;

        const task = await Task.findById(taskId);

        if (!task) {
            res.status(404).json({ message: ErrorType.TaskNotFound });
            return;
        }

        if (task.user.toString() !== userId) {
            res.status(403).json({ message: ErrorType.InvalidCredentials });
            return;
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: ErrorType.ErrorGetTaskById, error });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const { taskId } = req.params;
        const { title, description, completed } = req.body;
        const userId = req.user.id;

        const task = await Task.findById(taskId);

        if (!task) {
            res.status(404).json({ message: ErrorType.TaskNotFound });
            return;
        }

        if (task.user.toString() !== userId) {
            res.status(403).json({ message: ErrorType.InvalidCredentials });
            return;
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.completed = completed;

        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: ErrorType.ErrorUpdateTask, error });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { taskId } = req.params;
        const userId = req.user.id;

        const task = await Task.findById(taskId);

        if (!task) {
            res.status(404).json({ message: ErrorType.TaskNotFound });
            return;
        }

        if (task.user.toString() !== userId) {
            res.status(403).json({ message: ErrorType.InvalidCredentials });
            return;
        }

        await Task.findByIdAndDelete(taskId);

        res.status(200).json({ message: 'Task successfully deleted' });
    } catch (error) {
        res.status(500).json({ message: ErrorType.ErrorDeleteTask, error });
    }
};
