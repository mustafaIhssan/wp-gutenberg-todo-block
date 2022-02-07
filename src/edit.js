import {useBlockProps} from '@wordpress/block-editor';
import {Placeholder, TextControl} from '@wordpress/components';
import {useState} from '@wordpress/element';
import {Button} from '@wordpress/components';

import './editor.scss';
import {Item} from "./item";

export default function Edit(props) {

	const {attributes, setAttributes} = props

	const [count, setCount] = useState(1);

	const getValueByID = (id, attr = 'value') => JSON.parse(attributes.message || '[]').find(i => i.id === id)?.[attr] || ''

	const save = (id, value, attr = 'value') => {

		const data = JSON.parse(attributes.message || '[]')
		const isNew = !data.find(i => id === i.id)

		const newData = isNew ? [...data, {id, value}] : data.map(i => i.id === id ? {...i, id, [attr]: value} : i)

		setAttributes({message: JSON.stringify(newData)})
	}
	const NewToDo = () => <Button variant="primary" onClick={() => setCount(e => e + 1)}>+</Button>;

	return (
		<div {...useBlockProps()}>
			<div className="todoList">
				<TextControl className="todo-title" value={attributes?.title || 'Title'}
							 onChange={(val) => setAttributes({title: val})}/>
				<TextControl
					className="todo-subtitle"
					value={attributes?.subtitle || 'Subtitle'}
					onChange={(val) => setAttributes({subtitle: val})}
				/>
				<div className="items">
					{[...Array(count)].map((_, i) => (
						<div className="todoItem">
							<Item
								key={`Item-${i}`}
								isDone={Boolean(getValueByID(i, 'checked'))}
								onTick={() => save(i, !getValueByID(i, 'checked'), 'checked')}
								isEdit={true}
								text={getValueByID(i)}
								onChange={(val) => save(i, val)}
							/>
							{i === count - 1 && <NewToDo/>}
						</div>))}
				</div>
			</div>
		</div>
	);
}
