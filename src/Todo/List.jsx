import React ,{useState, useEffect}from 'react'
import './Todo.css'
import { axiosInstance } from '../Axios/axiosInstance'
import Items from './Items'

// import Items from './Items'

function List({Input, setInput}) {
    const initial = JSON.parse(localStorage.getItem("todo"))||[]

     

    const [todo, setTodo] = useState(initial)
    const [edit, setEdit] = useState(null)

    const addTodo=(event)=>{
        event.preventDefault();
        if (edit===null){

            if(Input!==''){
                const data = new FormData();
                data.append('todo', Input)
                axiosInstance.post('/todo/create-list/', data).then(res =>{  
                    setInput('')             
                    console.log(res.data);
                })
            }
        }
        
        if (edit!==null){
            console.log(edit);
            const data = new FormData()
            data.append('todo', Input)
            axiosInstance.patch(`/todo/manage/${edit}/`, data)
          setInput('')
          setEdit(null)
        }
    }

    useEffect(()=>{
        axiosInstance.get('/todo/create-list/').then(res=>{

            console.log(res.data);
            setTodo(res.data)
        })
    //   localStorage.setItem("todo",JSON.stringify(todo));
    },[addTodo]);

  return (
    <div>
      <form onSubmit={addTodo}>
        <div className='group'>
        <input className={edit?'text2':'text'} type="text" value={Input} placeholder='Enter your todo' onChange={(event)=>setInput(event.target.value)} />
        <button  className={`btns btn mb-1 ms-2 text-light  ${edit?'btn-warning':'btn-success'} btn-sm`}>{edit?'EDIT':'ADD'}</button>
        </div>
    </form>   
        <div>
            <Items todo={todo} setTodo={setTodo} setInput={setInput} setEdit={setEdit}/>
        </div>
      
    </div>
  )
}

export default List