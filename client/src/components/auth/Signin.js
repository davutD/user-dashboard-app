import React, { useState, useEffect } from 'react'
import { InputText } from 'primereact/inputtext'
import { useForm } from 'react-hook-form'
import { Button } from 'primereact/button'
import { Navigate, Link } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Divider } from 'primereact/divider'

export default function Signin({ jwtToken, getJwtFromCookie, setJwtToken }) {
  const schema = yup.object({
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

  const [loading, setLoading] = useState(false)

  const signinUser = async (userData) => {
    const response = await fetch('http://localhost:3333/signin/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(userData),
    })

    if (response.ok) {
      setTimeout(() => {
        setJwtToken(getJwtFromCookie())
      }, 2999)

      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 3000)
    }

    console.log(response)
  }

  const onSubmit = (data) => {
    signinUser(data)
  }

  return (
    <div className="flex flex-row align-items-center grid text-800">
      <div className="col-8 w-auto h-auto mt-5 ml-8">
        <img
          className="select-none"
          src="signin.svg"
          alt="Image"
          width="1250"
        />
      </div>
      <div className="col-4 shadow-7 border-3 border-round-md border-blue-400 w-3 mb-8 ml-8 h-full px-7 py-4 flex flex-column align-items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-column gap-3  w-full"
        >
          <h1 className="text-center select-none">Sign In</h1>
          <div className="p-inputgroup h-3rem">
            <span className="p-inputgroup-addon">
              <i className="pi pi-envelope"></i>
            </span>
            <InputText
              placeholder="Email"
              id="email"
              className="select-none"
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
              placeholder="Password"
              className="select-none"
              type="password"
              id="password"
              {...register('password', { required: true, maxLength: 30 })}
            />
          </div>
          {errors.password && (
            <span className="flex -mt-2 ml-2 text-red-600">
              {errors.password.message}
            </span>
          )}

          <Button
            type="submit"
            label="Sign In"
            className="w-6 m-auto mt-4 border-round-md"
            icon="pi pi-sign-in"
            loading={loading}
          />
        </form>
        {/* <hr className="my-4 w-full" /> */}
        <Divider layout="horizontal" className="hidden md:flex select-none">
          <b>OR</b>
        </Divider>
        <Link
          to="/signup"
          className="flex w-full m-auto border-round-md"
          style={{ textDecoration: 'none' }}
        >
          <Button
            label="Sign Up"
            className="w-7 m-auto border-round-md"
            icon="pi pi-user"
          />
        </Link>
      </div>
    </div>
  )
}
