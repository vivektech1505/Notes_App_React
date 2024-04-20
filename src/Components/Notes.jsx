import React, { useEffect, useState } from 'react';
import CreateNotes from './CreateNotes';
import './notes.css';
import { v4 as uuid } from 'uuid';
import Note from './Note';

function Notes() {
    const [inputText, setInputText] = useState('');
    const [notes, setNotes] = useState([]);
    const [editToggle, setEditToggle] = useState(null);

    const editHandler = (id, text) => {
        setEditToggle(id);
        setInputText(text);
    };

    const saveHandler = () => {
        if (editToggle !== null) {
            setNotes(prevNotes =>
                prevNotes.map(note =>
                    note.id === editToggle ? { ...note, text: inputText } : note
                )
            );
            setEditToggle(null);
        } else {
            setNotes(prevNotes => [
                ...prevNotes,
                {
                    id: uuid(),
                    text: inputText
                }
            ]);
        }

        setInputText('');
    };

    const deleteHandler = (id) => {
        const newNotes = notes.filter(n => n.id !== id);
        setNotes(newNotes);
    };

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('Notes'));
        if (data) {
            setNotes(data);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('Notes', JSON.stringify(notes));
    }, [notes]);

    return (
        <div className='notes'>
            {notes.map(note => (
                editToggle === note.id ? (
                    <CreateNotes
                        key={note.id}
                        inputText={inputText}
                        setInputText={setInputText}
                        saveHandler={saveHandler}
                    />
                ) : (
                    <Note
                        key={note.id}
                        id={note.id}
                        text={note.text}
                        editHandler={() => editHandler(note.id, note.text)}
                        deleteHandler={() => deleteHandler(note.id)}
                    />
                )
            ))}

            {editToggle === null ? (
                <CreateNotes
                    inputText={inputText}
                    setInputText={setInputText}
                    saveHandler={saveHandler}
                />
            ) : null}
        </div>
    );
}

export default Notes;
