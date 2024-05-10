import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import Register from './user/Register'
import Layout from './user/Layout'
import { Route, Routes } from 'react-router-dom'
import Signin from './user/Signin'
import Todo from './Todo/Todo'


function App() {

  return (
    <>
      <Toaster />

      <Routes>
          <Route element={< Layout/>}>
            <Route exact path="/signup" element={<Register />} />
            <Route  path="/" element={<Signin />} />
          </Route>
      <Route path='/home' element={<Todo />} />
      </Routes>
    </>
  )
}

export default App
