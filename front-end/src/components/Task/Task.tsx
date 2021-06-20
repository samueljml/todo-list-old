import React, { useState } from "react";
import { TaskForm } from "./TaskForm";
import editIcon from "../../img/edit.png";
import deleteIcon from "../../img/delete.png";
import { TaskProps } from "../../App";

let order = 1000;

// export interface taskMethodsProps {
// 	tasks: TaskProps[];
// 	updateTask: Function;
// 	removeTask: Function;
// 	completeTask: Function;
// }

export const Task = ({ tasks, completeTask, removeTask, updateTask }: any) => {
	const [edit, setEdit] = useState({
		id: null,
		value: "",
	});

	const submitUpdate = (value: string) => {
		updateTask(edit.id, value);
		setEdit({
			id: null,
			value: value,
		});
	};

	if (edit.id) {
		return <TaskForm edit={edit} onSubmit={submitUpdate} />;
	}

	const getOrder = ({ isComplete }: TaskProps) => {
		if (isComplete) {
			return order--;
		}
		return 0;
	};

	return tasks.map((task: TaskProps) => (
		<div
			key={task.id}
			style={{ display: "flex", order: getOrder(task) }}
			className={task.isComplete ? "task isComplete" : "task"}
		>
			<input
				onClick={(e) => completeTask(task.id)}
				type="checkbox"
				id="task-checkbox"
			/>
			<label id="task-title" onChange={(e) => completeTask(task.id)}>
				{task.text}
			</label>

			{task.isComplete ? (
				""
			) : (
				<>
					<img
						onClick={(e) =>
							setEdit({ id: task.id, value: task.text })
						}
						className="item"
						id="button-edit-task"
						src={editIcon}
					/>
				</>
			)}

			<img
				onClick={(e) => removeTask(task.id)}
				style={{ display: "flex" }}
				id="button-delete-task"
				src={deleteIcon}
			/>
		</div>
	));
};
