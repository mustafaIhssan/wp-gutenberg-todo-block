import {useBlockProps} from '@wordpress/block-editor';

import {Item} from "./item";

export default function save({attributes}) {

	const {message = '[]', title, subtitle} = attributes
	const items = JSON.parse(message)

	return (
		<div {...useBlockProps.save()}>
			<div className="todoList">
				<h1 className="todo-title">{title}</h1>
				<h2 className="todo-subtitle">{subtitle}</h2>
				{items.map((item) => (
					<div className="todoItem">
						<Item
							key={item.id}
							text={item.value}
							isDone={item.checked}
							isEdit={false}
						/>
					</div>))}
			</div>
		</div>
	);
}
