import React, { useState, useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const notesReducer = (state, action) => {
  switch (action.type) {
    case 'POPULATE_NOTES':
      return action.notes;

    case 'ADD_NOTE':
      return [...state, action.note];

    case 'REMOVE_NOTE':
      return state.filter(note => note.title !== action.title);
  
    default:
      return state;
  }
}

const NoteApp = () => {
  const [notes, dispatch] = useReducer(notesReducer, [])
  // const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

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

  const addNote = (e) => {
    e.preventDefault();
    
    dispatch({ type: 'ADD_NOTE', note: { title, body } });

    setTitle('');
    setBody('');
  }

  const removeNote = (title) => dispatch({ type: 'REMOVE_NOTE', title });

  return (
    <div>
      <h1>Note App</h1>
      {notes.map(note => (
        <Note key={note.title} note={note} removeNote={removeNote} />
      ))}
      <form onSubmit={addNote}>
        <h3>Add Note</h3>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
          <br/>
          <textarea name="body" cols="30" rows="10" value={body} onChange={e => setBody(e.target.value)}></textarea>
        <button>Add Note</button>
       
      </form>

    </div>
  )

}

const Note = ({ note = {}, removeNote }) => {
  useEffect(() => {
    console.log('Setting up effect');

    return () => {
      console.log('Cleaning up effect')
    }
  }, []);

  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <button onClick={ () => removeNote(note.title)}>X</button>
    </div>);
}

// const App = props => {
//   const [count, setCount] = useState(props.count);
//   const [text, setText] = useState('');

//   useEffect(() => {
//     console.log('Run once (Constructor).');
    
//   }, [])
//   useEffect(() => {
//     console.log('count updated.');
//     document.title = count;
//   }, [count])

//   return (
//     <div>
//       <p>
//         The current {text || 'count'} is {count}
//       </p>
//       <button onClick={() => setCount(count - 1)}>-1</button>
//       <button onClick={() => setCount(props.count)}>reset</button>
//       <button onClick={() => setCount(count + 1)}>+1</button>
//       <input type='text' value={text} onChange={e => setText(e.target.value)} />
//     </div>
//   );
// };

// App.defaultProps = {
//   count: 0
// };

ReactDOM.render(<NoteApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
