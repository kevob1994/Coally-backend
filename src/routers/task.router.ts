import { Router } from 'express';
import {
    createTask,
    deleteTask,
    getTaskById,
    getTasksByUser,
    updateTask,
} from '../controllers/task.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateCreateTask } from '../validations/task.validation';
import { validateMiddleware } from '../middlewares/validate.middleware';

export const taskRouter: Router = Router();

const router = Router();

/**
 * @swagger
 * /api/task:
 *   post:
 *     summary: Create a new task
 *     description: Creates a new task for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the task
 *               description:
 *                 type: string
 *                 description: Description of the task
 *     responses:
 *       201:
 *         description: Task successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 user:
 *                   type: string
 *                   description: ID of the user who created the task
 *       500:
 *         description: Internal server error
 */
taskRouter.post('/', authMiddleware, validateMiddleware(validateCreateTask), createTask);

/**
 * @swagger
 * /api/task:
 *   get:
 *     summary: Get tasks for the authenticated user
 *     description: Retrieves tasks for the authenticated user. Optionally filters by the `completed` status.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: completed
 *         schema:
 *           type: boolean
 *         description: Filter tasks by their completion status (true or false).
 *     responses:
 *       200:
 *         description: Successfully retrieved tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   user:
 *                     type: string
 *                     description: ID of the user who owns the task
 *                   completed:
 *                     type: boolean
 *                     description: Whether the task is completed
 *       500:
 *         description: Internal server error
 */
taskRouter.get('/', authMiddleware, getTasksByUser);

/**
 * @swagger
 * /api/task/{taskId}:
 *   get:
 *     summary: Get a task by ID
 *     description: Retrieves a specific task by its ID for the authenticated user. Ensures the user has access to the task.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved the task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 user:
 *                   type: string
 *                   description: ID of the user who owns the task
 *                 completed:
 *                   type: boolean
 *                   description: Whether the task is completed
 *       403:
 *         description: User is not authorized to access this task
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */
taskRouter.get('/:taskId', authMiddleware, getTaskById);

/**
 * @swagger
 * /api/task/{taskId}:
 *   put:
 *     summary: Update a task
 *     description: Updates the details of a specific task for the authenticated user. Ensures the user has permission to edit the task.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The new title of the task
 *               description:
 *                 type: string
 *                 description: The new description of the task
 *               completed:
 *                 type: boolean
 *                 description: The updated completion status of the task
 *     responses:
 *       200:
 *         description: Successfully updated the task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 user:
 *                   type: string
 *                   description: ID of the user who owns the task
 *                 completed:
 *                   type: boolean
 *                   description: Whether the task is completed
 *       403:
 *         description: User is not authorized to update this task
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */
taskRouter.put('/:taskId', authMiddleware, validateMiddleware(validateCreateTask), updateTask);

/**
 * @swagger
 * /api/task/{taskId}:
 *   delete:
 *     summary: Delete a task
 *     description: Deletes a specific task for the authenticated user. Ensures the user has permission to delete the task.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to delete.
 *     responses:
 *       200:
 *         description: Successfully deleted the task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tarea eliminada correctamente
 *       403:
 *         description: User is not authorized to delete this task
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */
taskRouter.delete('/:taskId', authMiddleware, deleteTask);

export default router;
