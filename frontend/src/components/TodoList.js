import { useEffect, useState } from "react";
import axios from "axios";

const TodoList = ({ refreshList }) => {
  const [todos, setTodos] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [filteredTodos, setFilteredTodos] = useState([]);
    const [statusFilter, setStatusFilter] = useState('All'); // To track the task being edited
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    status: "",
  });

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/gettasks");
        setTodos(response.data);
        setFilteredTodos(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTodos();
  }, [refreshList]);

  useEffect(() => {
    if (statusFilter === 'All') {
        setFilteredTodos(todos);
    } else {
        setFilteredTodos(todos.filter((todo) => todo.status === statusFilter));
    }
}, [statusFilter, todos]);

  const handleEditClick = (task) => {
    setEditTask(task.id);
    setFormData(task); // Pre-fill the form with the task's data
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/deletetask/${id}`);
      refreshList(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleFilter = () => {
    setStatusFilter((prev) =>
        prev === 'Pending' ? 'Completed' : prev === 'Completed' ? 'All' : 'Pending'
    );
};

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/updatetask/${editTask}`,
        formData
      );
      setEditTask(null); // Exit edit mode
      refreshList(); // Trigger parent to refresh the list
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">To-Do List</h2>

        {/* Toggle Button */}
        <div className="mb-4">
                <button
                    onClick={toggleFilter}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Show: {statusFilter}
                </button>
            </div>


      {filteredTodos.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No Tasks Found</p>
      ) : (
        <ul className="space-y-6">
          {filteredTodos.map((todo) => (
            <li key={todo.id} className="w-full">
              {editTask === todo.id ? (
                <form
                  onSubmit={handleUpdate}
                  className="flex flex-col space-y-4 bg-white shadow-lg rounded-lg p-6"
                >
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  ></textarea>
                  <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                    <input
                      type="date"
                      name="due_date"
                      value={formData.due_date}
                      onChange={handleChange}
                      className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md transition duration-300"
                  >
                    Save
                  </button>
                </form>
              ) : (
                <div className="flex flex-col sm:flex-row items-start sm:items-center bg-white shadow-lg rounded-lg p-6 space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="flex-1">
                    <p className="text-xl font-semibold text-gray-800 mb-2">
                      {todo.title}
                    </p>
                    <p className="text-gray-600 text-sm">{todo.description}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-600 text-sm">
                      Due: {todo.due_date}
                    </p>
                    <p
                      className={`text-sm font-medium mt-1 ${
                        todo.status === "Completed"
                          ? "text-green-600"
                          : todo.status === "Pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {todo.status}
                    </p>
                  </div>
                  <button
                    onClick={() => handleEditClick(todo)}
                    className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-3 px-6 rounded-md transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="bg-red-500 text-white p-2 ml-2"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
