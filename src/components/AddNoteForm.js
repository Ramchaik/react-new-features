import React, { useState, useContext } from 'react';
import NotesContext from '../context/notes-context';


const AddNoteForm = () => {
	const { dispatch } = useContext(NotesContext);
	const [title, setTitle] = useState('');
  	const [body, setBody] = useState('');

	const addNote = (e) => {
		e.preventDefault();

		dispatch({ type: 'ADD_NOTE', note: { title, body } });

		setTitle('');
		setBody('');
	}


	return (
    	<div>
			<p>Add Note</p>
			<form onSubmit={addNote}>
				<input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
				<textarea name="body" cols="30" rows="10" value={body} onChange={e => setBody(e.target.value)}></textarea>
				<button>Add Note</button>
			</form>
		</div>);
}

export { AddNoteForm as default };