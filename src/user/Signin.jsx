import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../Axios/axiosInstance'

const Signin = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()

    const handleChange = (e) =>{
        const { name, value } = e.target;
        setFormData((prevFormData)=>{
            return {...prevFormData, [name]:value}
        });
        }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();

        const isValid = Object.values(formData).every(value=>value!=='');
        
        if(isValid){

        data.append('email', formData.email);
        data.append('password', formData.password)
        toast.promise(
            axiosInstance.post('/user/log/', data).then(res => {
                console.log(res.data);
                localStorage.setItem('access', res.data.access_token)
                localStorage.setItem('refresh', res.data.refresh_token)
                navigate('/home')
            }),
            {
                loading: 'Logging in...', // Message shown while waiting for the response
                success: 'Login successful!', // Message shown on successful login
                error: 'Login failed', // Message shown on login failure
              }
        )
        }else{
            toast.warning('fill all fields')
        }

    }

  return (
    <div className='p-4'>
      <h2 className=" text-3xl font-bold mb-6 text-center">Sign In</h2>
      <form onSubmit={(e)=>handleSubmit(e)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={handleChange}
              id="email"
              name="email"
              autoComplete="email"
              className="mt-1 p-3 border border-gray-300 block w-full rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={handleChange}
              id="password"
              name="password"
              autoComplete="current-password"
              className="mt-1 p-3 border border-gray-300 block w-full rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Sign in
            </button>
          </div>
          <div className='flex'>
            <h3>Don't have an account?</h3>
            < Link to='/signup'><p className='text-blue-700'>click here</p></Link>
          </div>
        </form>
    </div>
  )
}

export default Signin