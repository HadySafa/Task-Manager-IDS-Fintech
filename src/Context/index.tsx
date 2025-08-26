import { createContext, useEffect, useState } from "react";
import type { Task } from "../Model/Task";

export const AppContext = createContext<any>(null);

export function AppProvider({ children }: any) {

  const fakeTask: Task = {
    id: -1,
    name: "",
    status: "incompleted",
    priority: "low",
    createdAt: new Date(),
    deadline: new Date(),
  }
  const [selectedTaskToEdit, setSelectedTaskToEdit] = useState<Task>(fakeTask)
  const [selectedTaskToMarkAsComplete, setSelectedTaskToMarkAsComplete] = useState<Task>(fakeTask)
  const [selectedTaskToDelete, setSelectedTaskToDelete] = useState<Task>(fakeTask)
  const [tasks, setTasks] = useState<Task[]>(getTasks())
  const [lastId, setLastId] = useState<number>(getLastId())

  function getTasks(): Task[] {
    return (JSON.parse(localStorage.getItem("tasks") ?? "[]") as Task[]).map(task => ({
      ...task,
      deadline: new Date(task.deadline),
      createdAt: new Date(task.createdAt),
    }));
    // after getting data from localStorage, the date of the createdAt and deadline would be a string, so we should convert it to date object
  }

  function getLastId(): number {
    return JSON.parse(localStorage.getItem("lastId") ?? "0") as number;
  }

  function addTask(task: Task): void {
    const newTask = { ...task, id: lastId + 1 };
    setTasks([...tasks, newTask])
    setLastId(lastId + 1)
  }

  function removeTask(): void {
    setTasks(tasks.filter((obj) => {
      return obj.id !== selectedTaskToDelete.id
    }))
  }

  function updateTask(task: Task): void {
    setTasks(tasks.map((obj) => {
      if (obj.id === selectedTaskToEdit.id) return task;
      return obj
    }))
  }

  function markTaskAsCompleted(): void {
    setTasks(tasks.map((obj) => {
      if (obj.id === selectedTaskToMarkAsComplete.id) return { ...obj, status: "completed" };
      return obj
    }))
  }

  function getCompletedTasks(): Task[] {
    return tasks.filter((obj) => {
      return obj.status === "completed"
    })
  }

  function getInCompletedTasks(): Task[] {
    return tasks.filter((obj) => {
      return obj.status === "incompleted"
    })
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem("lastId", JSON.stringify(lastId))
  }, [lastId])


  return (
    <AppContext.Provider value={{ tasks, addTask, removeTask, updateTask, getCompletedTasks, getInCompletedTasks, markTaskAsCompleted, setSelectedTaskToEdit, selectedTaskToEdit, setSelectedTaskToMarkAsComplete, setSelectedTaskToDelete }}>
      {children}
    </AppContext.Provider>
  );

}
