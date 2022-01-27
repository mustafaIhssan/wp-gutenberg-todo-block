import {TextControl} from "@wordpress/components";

export const Item = ({isDone, onTick, onChange, text, isEdit}) =>
	<div className="item">
		<TickOption onClick={onTick} isDone={isDone}/>
		{isEdit ? <ItemText text={text} isDone={isDone}/> : <ItemTextInput text={text} onChange={onChange}/>}
	</div>


const TickOption = ({isDone, onClick}) => {
	return <div className={isDone ? "checked" : 'unchecked'} onClick={isDone ? onClick : null}>
		<div/>
	</div>
}

const ItemText = ({isDone, text}) => <span className={isDone ? 'done' : 'todo'}>{text}</span>

const ItemTextInput = ({text, onChange}) =>
	<TextControl
		value={text}
		onChange={onChange}
	/>
