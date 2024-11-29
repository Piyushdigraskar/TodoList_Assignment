import { useState } from "react";
import CreateTodo from "./components/CreateTodo.js";
import TodoList from "./components/TodoList.js";

function App() {
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const handleTodoCreated = (newTask)=>{
    setTasks([...tasks, newTask]);
    setRefresh(!refresh);
  }

  const refreshList = () => {
    setRefresh(!refresh); // Toggle refresh to force re-fetch
};

  return (
   <>
     <div className="bg-slate-400 mt-6 mb-6">
      <h1 className="p-5 text-3xl text-bold text-center">
      Todo List
      </h1>
    </div>
    <div className="container mx-auto p-4 mb-10">
            <h1 className="text-2xl font-bold mb-4">Task Management</h1>
            <CreateTodo onTodoCreated={handleTodoCreated} />
        </div>
        <TodoList refreshList={refreshList}/>
   </>
  );
}

export default App;
