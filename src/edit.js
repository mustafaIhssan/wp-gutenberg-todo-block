import {useBlockProps} from '@wordpress/block-editor';
import {FormToggle, Placeholder, TextControl} from '@wordpress/components';
import {useState} from '@wordpress/element';
import {Button} from '@wordpress/components';

import './editor.scss';
import {Item} from "./item";

export default function Edit({attributes, setAttributes}) {

	const [count, setCount] = useState(1);

	const NewToDo = () => <Button variant="primary" onClick={() => setCount(e => e + 1)}>+</Button>;

	const getValueByID = (id, attr = 'value') => JSON.parse(attributes.message || '[]').find(i => i.id === id)?.[attr] || ''


	const save = (id, value, attr = 'value') => {

		const data = JSON.parse(attributes.message || '[]')
		const isNew = !data.find(i => id === i.id)

		const newData = isNew ? [...data, {id, value}] : data.map(i => i.id === id ? {...i, id, [attr]: value} : i)

		setAttributes({message: JSON.stringify(newData)})
	}

	return (
		<div {...useBlockProps()}>
			<Placeholder
				label="Todo"
				instructions="Add Tags separated with ','"
			>

				<div className="todoList">
					{[...Array(count)].map((_, i) => (
						<div>
							<Item isDone={}/>
							<TextControl
								key={`Item-${i}`}
								value={getValueByID(i)}
								onChange={(val) => save(i, val)}
							/>
							<FormToggle
								checked={!!getValueByID(i, 'checked')}
								onChange={() => {
									console.log('val', !getValueByID(i, 'checked'))
									save(i, !getValueByID(i, 'checked'), 'checked')
								}}
							/>
							{i === count - 1 && <NewToDo/>}
						</div>))}
				</div>
			</Placeholder>
		</div>
	);
}
