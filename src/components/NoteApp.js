import React, { useReducer, useEffect, useState } from 'react';
import notesReducer from '../reducer/notes';
import NoteList from './NoteList';
import AddNoteForm from './AddNoteForm';
import NotesContext from '../context/notes-context';

const NoteApp = () => {
  const [notes, dispatch] = useReducer(notesReducer, [])

  // NOTE: constructor as fields passed to useEffect is []
  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem('notes'));

    if (notes) {
      dispatch({ type: "POPULATE_NOTES", notes });
    }
  }, []);

  // NOTE: runs on change in notes
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes])


//   const removeNote = (title) => dispatch({ type: 'REMOVE_NOTE', title });

  return (
    <NotesContext.Provider value={{ notes, dispatch }} >
      <h1>Note App</h1>
      <NoteList />
	  <AddNoteForm />
    </NotesContext.Provider>
  )

}

export { NoteApp as default };