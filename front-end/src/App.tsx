import React, { useState } from "react";
import "./App.css";
import { Task } from "./components/Task/Task";
import { TaskForm } from "./components/Task/TaskForm";
import { isEmpty } from "./common/Utils";

export interface TaskProps {
	id: null;
	text: string;
	isComplete: boolean;
}

export const inputTaskPlaceHolder = "Task name";
export const buttonAddTaskValue = "+ Add";
export const buttonClearCompleteTaskValue = "Clear completed tasks";

const emptyTasks: TaskProps[] = [];

const setTaskValue = (task: any, value: string) => {
	task.text = value;
};

const App = () => {
	const [tasks, setTasks] = useState(emptyTasks);

	const addTask = (task: TaskProps) => {
		if (isEmpty(task.text)) {
			return;
		}
		setTaskValue(task, task.text.trim());
		setTasks([task, ...tasks]);
	};

	const updateTask = (taskId: number, task: TaskProps) => {
		if (isEmpty(task.text)) {
			return;
		}

		setTasks((prev: TaskProps[]) =>
			prev.map((item: TaskProps) => (item.id === taskId ? task : item))
		);
	};

	const removeTask = (id: number) => {
		setTasks([...tasks].filter((task: any) => task.id !== id));
	};

	const completeTask = (id: number) => {
		let updatedTodos: any[] = tasks.map((task: TaskProps) => {
			if (task.id === id) {
				task.isComplete = !task.isComplete;
			}
			return task;
		});
		setTasks(updatedTodos);
	};

	const clearAllTasks = () => {
		setTasks(emptyTasks);
	};

	const clearAllCompletedTasks = () => {
		const newArray = [...tasks].filter((task: TaskProps) => !task.isComplete);
		setTasks(newArray);
	};

	return (
		<div id="container">
			<div id="header">
				<h1>Todo list ({tasks.length})</h1>
				<h2>Tasks</h2>
				<TaskForm onSubmit={addTask} />
			</div>

			<div id="container-tasks">
				<Task
					tasks={tasks}
					completeTask={completeTask}
					removeTask={removeTask}
					updateTask={updateTask}
				/>
			</div>

			<div id="footer">
				<button
					onClick={(e) => clearAllCompletedTasks()}
					id="button-clear-completed"
					className="item"
				>
					{buttonClearCompleteTaskValue}
				</button>
				<button
					onClick={(e) => clearAllTasks()}
					id="button-clear-all"
					className="item"
				>
					{"Clear all tasks"}
				</button>
			</div>
		</div>
	);
};

export default App;
