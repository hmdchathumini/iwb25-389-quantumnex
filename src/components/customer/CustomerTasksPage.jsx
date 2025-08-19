import React, { useState } from "react";
import PostTaskTab from "./PostTaskTab";
import TaskListTab from "./TaskListTab";

const DUMMY_TASKS = [
  { id: 1, title: "Clean my garden", price: 2000, status: "Pending" },
  { id: 2, title: "Paint the house", price: 5000, status: "Completed" },
];

export default function CustomerTasksPage() {
  const [tasks, setTasks] = useState(DUMMY_TASKS);

  return (
    <>
      <PostTaskTab setTasks={setTasks} />
      <TaskListTab tasks={tasks} setTasks={setTasks} />
    </>
  );
}