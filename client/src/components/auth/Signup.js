import React, { useState, useRef } from 'react'
import { InputText } from 'primereact/inputtext'
import { useForm } from 'react-hook-form'
import { Button } from 'primereact/button'
import { Navigate, Link } from 'react-router-dom'
import { Toast } from 'primereact/toast'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Divider } from 'primereact/divider'

export default function Signup() {
  const schema = yup.object({
    name: yup.string().required('Name is required'),
    surname: yup.string().required('Surname is required'),
    email: yup
      .string()
      .required('Email is required')
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email')
      .matches(/.*\.com$/, `Email domain must end with '.com' format`),
    password: yup.string().required('Password is required'),
  })

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const [redirect, setRedirect] = useState(false)
  const [loading, setLoading] = useState(false)

  const toast = useRef(null)

  const signupUser = async (userData) => {
    const response = await fetch('http://localhost:3333/signup/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(userData),
    })

    if (response.ok) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        setRedirect(true)
      }, 3000)
    }
    console.log(response)
  }

  const onSubmit = (data) => {
    data.password === data.password2
      ? signupUser(data)
      : toast.current.show({
          severity: 'warn',
          summary: 'Warning',
          detail: 'Passwords must be identical!',
          life: 3000,
        })

    console.log(data)
  }

  if (redirect) {
    return <Navigate to="/signin" />
  }

  return (
    <div className="flex flex-row align-items-center grid text-800">
      <div className="col-8 w-auto h-auto mt-5 ml-8">
        <img src="signup.svg" alt="" width="1250" className="select-none" />
      </div>
      <div className="col-4 shadow-7 border-3 border-round-md border-blue-400 w-3 mb-8 ml-8 h-full px-7 py-4 flex flex-column align-items-center">
        <Toast ref={toast} />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-column gap-3 w-full"
        >
          <h1 className="text-center select-none">Sign Up</h1>
          <div className="p-inputgroup h-3rem">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <InputText
              className="select-none"
              placeholder="Name"
              id="name"
              {...register('name', { required: true, maxLength: 30 })}
            />
          </div>
          {errors.name && (
            <span className="flex -mt-2 mb-2 ml-2 text-red-600">
              {errors.name.message}
            </span>
          )}
          <div className="p-inputgroup h-3rem">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <InputText
              className="select-none"
              placeholder="Surname"
              id="surname"
              {...register('surname', { required: true, maxLength: 30 })}
            />
          </div>
          {errors.surname && (
            <span className="flex -mt-2 mb-2 ml-2 text-red-600">
              {errors.surname.message}
            </span>
          )}
          <div className="p-inputgroup h-3rem">
            <span className="p-inputgroup-addon">
              <i className="pi pi-envelope"></i>
            </span>
            <InputText
              className="select-none"
              placeholder="Email"
              id="email"
              {...register('email', { required: true, maxLength: 30 })}
            />
          </div>
          {errors.email && (
            <span className="flex -mt-2 mb-2 ml-2 text-red-600">
              {errors.email.message}
            </span>
          )}
          <div className="p-inputgroup h-3rem">
            <span className="p-inputgroup-addon">
              <i className="pi pi-key"></i>
            </span>
            <InputText
              className="select-none"
              placeholder="Password"
              id="password"
              type="password"
              {...register('password', { required: true, maxLength: 30 })}
            />
          </div>
          {errors.password && (
            <span className="flex -mt-2 mb-2 ml-2 text-red-600">
              {errors.password.message}
            </span>
          )}
          <div className="p-inputgroup h-3rem">
            <span className="p-inputgroup-addon">
              <i className="pi pi-key"></i>
            </span>
            <InputText
              className="select-none"
              placeholder="Enter password again"
              id="password2"
              type="password"
              {...register('password2', { required: true, maxLength: 30 })}
            />
          </div>
          {errors.password && (
            <span className="flex -mt-2 mb-2 ml-2 text-red-600">
              {errors.password.message}
            </span>
          )}
          <Button
            type="submit"
            label="Sign Up"
            className="w-6 m-auto mt-4 border-round-md"
            icon="pi pi-user"
            loading={loading}
          />
        </form>
        {/* <hr className="my-4 w-full" /> */}
        <Divider layout="horizontal" className="hidden md:flex select-none">
          <b>OR</b>
        </Divider>
        <Link
          to="/signin"
          className="flex w-full m-auto border-round-md"
          style={{ textDecoration: 'none' }}
        >
          <Button
            label="Sign In"
            className="w-7 m-auto border-round-md"
            icon="pi pi-sign-in"
          />
        </Link>
      </div>
    </div>
  )
}
