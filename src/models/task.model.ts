import mongoose, { Schema, Document } from 'mongoose';

interface ITask extends Document {
    title: string;
    description?: string;
    completed: boolean;
    createdAt: Date;
    user: mongoose.Types.ObjectId;
}

const TaskSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const Task = mongoose.model<ITask>('Task', TaskSchema);

export default Task;
