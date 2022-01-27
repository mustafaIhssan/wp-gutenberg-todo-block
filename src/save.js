import {useBlockProps} from '@wordpress/block-editor';

export default function save({attributes: {message = '[]'}}) {

	console.log(message)
	const items = JSON.parse(message)
	return (
		<div {...useBlockProps.save()}>
			<h3>Todo: </h3>
			<ul>
				{items.map(i => <li key={i.id}>{i.checked ? '[X]' : '[ ]'} {i.value}</li>)}
			</ul>
		</div>
	);
}
