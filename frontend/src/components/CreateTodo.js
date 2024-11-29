import axios from 'axios';
import { useState } from 'react';

const CreateTodo = ({onTodoCreated}) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        due_date: '',
        status: 'Pending',
    });

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormData({...formData, [name]:value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/create', formData);
            onTodoCreated(response.data); // Notify parent of the new task
            console.log(response.data);
            setFormData({ title: '', description: '', due_date: '', status: 'Pending' }); // Reset form
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='p-4 space-y-4'>
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className="block w-full p-2 border rounded"
                required
            />
            <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="block w-full p-2 border rounded"
            ></textarea>
            <input
                type="date"
                name="due_date"
                value={formData.due_date}
                onChange={handleChange}
                className="block w-full p-2 border rounded"
            />
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                Add Task
            </button>
        </form>
    )
}

export default CreateTodo;