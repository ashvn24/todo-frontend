import React, { useState } from 'react'
import "./Todo.css";
import List from './List';

const Todo = () => {

    const [Input, setInput] = useState('')
  return (
    <div className=' flex justify-center items-center'>
      <div className="card">
        <div className="card-header text-center"><strong>To-Do</strong></div>
        <div className="card-body">
          <List Input={Input} setInput={setInput} />
        </div>
      </div>
    </div>
  )
}

export default Todo
