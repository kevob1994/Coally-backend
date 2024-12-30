export enum ErrorType {
    InternalServerError = 'Internal server error',
    InvalidCredentials = 'Invalid Credentials',
    NoTokenProvided = 'No token provided',
    InvalidToken = 'Invalid token',
    UserExist = 'User already exists',
    ErrorCreatingTask = 'Error creating the task',
    ErrorGetTask = 'Error retrieving the tasks',
    ErrorGetTaskById = 'Error retrieving the task by ID',
    ErrorUpdateTask = 'Error updating the task',
    ErrorDeleteTask = 'Error deleting the task',
    TaskNotFound = 'Task not found',
}
