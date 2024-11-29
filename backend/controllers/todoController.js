import { db } from "../server.js";

export const create = async (req, res) => {
  const { title, description, due_date, status } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    const result = await db.run(
      `INSERT INTO tasks (title, description, due_date, status) VALUES (?, ?, ?, ?)`,
      [title, description, due_date, status || "Pending"]
    );
    res
      .status(201)
      .json({
        id: result.lastID,
        title,
        description,
        due_date,
        status: status || "Pending",
      });
  } catch (error) {
    console.error(error);
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await db.all(`SELECT * FROM tasks ORDER BY id DESC`);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export const updatetask = async (req, res) => {
  const { id } = req.params;
  const { title, description, due_date, status } = req.body;
  try {
    const result = await db.run(
        `UPDATE tasks 
         SET title = ?, description = ?, due_date = ?, status = ? 
         WHERE id = ?`,
        [title, description, due_date, status, id]
    );

    if (result.changes === 0) {
        return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
};


export const deletetask = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.run(`DELETE FROM tasks WHERE id = ?`, [id]);
        if (result.changes === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
}