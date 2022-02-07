import {TextControl} from "@wordpress/components";
import './editor.scss';

export const Item = ({isDone, onTick, onChange, text = 'empty', isEdit}) => {
	return <div className="item">
		<TickOption onClick={onTick} isDone={isDone}/>
		<ItemText {...{isEdit, text, isDone, onChange}}/>
	</div>
}

export const ItemText = ({isEdit, text, isDone, onChange}) =>
	isEdit ? <ItemTextInput {...{text, isDone, onChange}}/> :
		<ItemTextDisplay {...{text, isDone, onChange}}/>


const TickOption = ({isDone, onClick}) => {
	return <div className={isDone ? "checked" : 'unchecked'} onClick={onClick}>
		<div/>
	</div>
}

const ItemTextDisplay = ({isDone, text}) => <span
	className={`item ${isDone ? 'done' : 'todo'}`}>{text}</span>

const ItemTextInput = ({text, isDone, onChange}) =>
	<TextControl
		className={`itemInput ${isDone ? 'done' : 'todo'}`}
		value={text}
		onChange={onChange}
	/>
