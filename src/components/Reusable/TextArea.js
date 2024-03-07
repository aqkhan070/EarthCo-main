import React, { useState } from 'react'

const TextArea = ({placeholder, value, name, onChange, }) => {
    const [textareaHeight, setTextareaHeight] = useState('3em'); 

 

    const handleResize = (event) => {
      const { target } = event;
      target.style.height = 'auto'; 
      target.style.height = `${target.scrollHeight}px`; 
      setTextareaHeight(`${target.scrollHeight}px`); 
    };
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
      onInput={handleResize}
      style={{ height: textareaHeight }}
      className="form-control textarea-resizable"
      rows="3"
    ></textarea>
  )
}

export default TextArea