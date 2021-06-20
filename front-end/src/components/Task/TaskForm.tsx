import React, { useState, useEffect, useRef } from "react";
import { inputTaskPlaceHolder, buttonAddTaskValue } from "../../App";
import { verifyValueLength } from "../../common/Utils";
import editImg from "../../img/edit.png";

export const TaskForm = ({edit: editing, onSubmit}: any) => {
	const [input, setInput] = useState(editing ? editing.value : "");

	const handleChange = (value: string) => {
		if (verifyValueLength(value, 25)) {
			setInput(value);
		}
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();

		onSubmit({
			id: Math.floor(Math.random() * 10000),
			text: input,
		});
		setInput("");
	};

	const onPressEnter = (e:any) => {
		if(e.code === "Enter"){
			handleSubmit(e);
		}
	}

	return (
		<div onSubmit={handleSubmit} className={editing ? "edit-task" : "row"}>
			{editing ? (
				<>
					<input
						onChange={({target}) => handleChange(target.value)}
						className="item"
						id="input-text-title"
						value={input}
					/>

					<img
						onClick={handleSubmit}
						className={editing ? "item edit-white" : "item"}
						id="button-edit-task"
						src={editImg}
					/>
				</>
			) : (
				<>
					<input
						value={input}
						onChange={({target}) => handleChange(target.value)}
						className="item"
						id="input-text-title"
						placeholder={inputTaskPlaceHolder}
						onKeyDown={(e) => onPressEnter(e)}
					></input>
					<button
						onClick={handleSubmit}
						className="item"
						id="button-add-task"
					>
						{buttonAddTaskValue}
					</button>
				</>
			)}
		</div>
	);
};
