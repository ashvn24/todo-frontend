import React from "react";
import "./Todo.css";
import { axiosInstance } from "../Axios/axiosInstance";

function Items({ todo, setTodo,setInput,setEdit }) {

    
  const onDelete = (id) => {
    axiosInstance.delete(`/todo/manage/${id}`)
    setTodo(todo.filter((to) => to.id !== id));
  };

  const onComplete = (id) => {
    const complete = todo.map((to) => {
      if (to.id === id) {
        return { ...to, status: !to.status };
      }
      return to;
    });
    setTodo(complete);
  };

  const onEdit=(id)=>{
    const edit= (todo.find((to)=>to.id===id))
    setEdit(id)
    setInput(edit.todo)
  }

  return (
    <div>
      <div>
        <ul className="items">
          {todo && todo.map((to, index) => (
            <li className="list" id={index}>
              <div className="list-item text-black">{to.todo}</div>

              <span>
                <p
                  onClick={() => onComplete(to.id)}
                  id="tick"
                  class={
                    to.completed
                      ? "key bi bi-file-earmark-plus-fill"
                      : "key bi bi-check-all"
                  }
                >done</p>
                <p
                  onClick={() => onEdit(to.id)}
                  id="edit"
                  class="key bi bi-pencil-fill"
                >edit</p>
                <p
                  onClick={() => onDelete(to.id)}
                  id="trash"
                  class="key bi bi-trash-fill"
                >Del</p>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Items;