
import React from 'react'
import './notes.css'
import PropTypes from 'prop-types';

function CreateNotes({inputText, setInputText, saveHandler}) {
    const char = 100;
    const charLimit = inputText ? char - inputText.length : char;
    
  return (
    <div className='note'>
        <textarea 
        cols={10}
        rows={5}
        maxLength={100}
        value={inputText}
        onChange={(e)=> setInputText(e.target.value)}
        placeholder='Type....'
        />
        <div className='note_footer'>
            <span className='label'>{charLimit} Left</span>
            <button className='note_save' onClick={saveHandler}>Save</button>
        </div>
    </div>
  )
}
CreateNotes.propTypes = {
    inputText: PropTypes.string.isRequired,
    setInputText: PropTypes.func.isRequired,
    saveHandler: PropTypes.func.isRequired
};

export default CreateNotes