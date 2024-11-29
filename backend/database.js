import sqlite from "sqlite3";
import { open} from 'sqlite';

const initDb = async () => {
  const db = await open({
    filename: "./tasks.db",
    driver: sqlite.Database,
  });

  await db.exec(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            due_date TEXT,
            status TEXT DEFAULT 'Pending'
        );
    `);
    return db;
};

export default initDb;
