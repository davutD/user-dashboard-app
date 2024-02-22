import React from 'react'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { RadioButton } from 'primereact/radiobutton'
import { Toast } from 'primereact/toast'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { useState, useRef, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import moment from 'moment'
import data from '../../data/countries.json'
import '../styles/table.css'

import { useTranslation } from 'react-i18next'

export default function FormInputDialog({
  addUser,
  isSubmittable,
  setIsSubmittable,
}) {
  const toast = useRef(null)
  const [visible, setVisible] = useState(false)
  const countries = data

  const { t, i18n } = useTranslation()

  const jobs = [
    { name: 'Backend Developer', key: 'BD' },
    { name: 'Software Developer', key: 'SD' },
    { name: 'Frontend Developer', key: 'FD' },
    { name: 'Software Tester', key: 'ST' },
    { name: 'Mobile App Dev', key: 'MAD' },
    { name: 'Data Analyst', key: 'DA' },
    { name: 'Linux System Administrator', key: 'LSA' },
    { name: 'Security Specialist', key: 'SS' },
  ]

  const genders = [
    { name: 'Male', key: 'M' },
    { name: 'Female', key: 'F' },
    { name: 'Others', key: 'O' },
  ]

  const schema = yup.object({
    name: yup.string().required(t('addUserForm.errors.name')),
    surname: yup.string().required(t('addUserForm.errors.surname')),
    email: yup
      .string()
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email')
      .matches(/.*\.com$/, `Email domain must end with '.com' format`)
      .required(t('addUserForm.errors.email')),
    address: yup.string().required(t('addUserForm.errors.address')),
    jobTitle: yup.string().required(t('addUserForm.errors.jobTitle')),
    birthDate: yup.string().required(t('addUserForm.errors.birthDate')),
    gender: yup.string().required(t('addUserForm.errors.gender')),
    country: yup.string().required(t('addUserForm.errors.country')),
  })

  const {
    register,
    handleSubmit,
    reset,
    onChange,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const isSubmittableFunction = () => {
    setIsSubmittable(!isSubmittable)
  }

  useEffect(() => {
    if (isSubmittable) {
      showSuccess()
      isSubmittableFunction()
    }
  }, [isSubmittable])

  const showSuccess = () => {
    if (isSubmittable) {
      toast.current.show({
        severity: 'success',
        summary: t('userListPage.success'),
        detail: t('userListPage.successMessageAdd'),
        life: 3000,
      })
    }
  }

  const onSubmit = (data) => {
    const date = new moment(data.birthDate).format('DD/MM/YYYY')
    // const birthDate = date.toLocaleDateString('en-US', {
    //   year: 'numeric',
    //   month: '2-digit',
    //   day: '2-digit',
    // })
    addUser({ ...data, id: uuidv4(), birthDate: date })
    setVisible(false)
    reset()
  }

  return (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <Toast ref={toast} />
      <span className="text-xl text-900 font-bold">
        {t('dataTable.header')}
      </span>
      <Button
        icon="pi pi-user"
        label={t('dataTable.addButton')}
        onClick={() => setVisible(true)}
      />
      <Dialog
        header={t('addUserForm.title')}
        visible={visible}
        maximizable
        style={{ width: '50rem' }}
        onHide={() => {
          setVisible(false)
          reset()
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column">
          <div className="grid">
            <div className="col-6">
              <p className="font-bold" htmlFor="name">
                {t('addUserForm.name')}:
              </p>
              <InputText
                id="name"
                placeholder={t('addUserForm.name')}
                className="mr-2 w-full border-round-md"
                {...register('name', { required: true, maxLength: 20 })}
                //value={value}
                // onChange={(e) => setValue(e.target.value)}
              />
              {errors.name && (
                <span className="flex pt-2 text-red-600">
                  {errors.name.message}
                </span>
              )}
              <p className="font-bold" htmlFor="email">
                {t('addUserForm.email')}:
              </p>
              <InputText
                id="email"
                placeholder={t('addUserForm.email')}
                className="mr-2 w-full border-round-md"
                {...register('email', { required: true, maxLength: 30 })}
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
              />
              {errors.email && (
                <span className="flex pt-2 text-red-600">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="col-6">
              <p className="font-bold" htmlFor="surname">
                {t('addUserForm.surname')}:
              </p>
              <InputText
                id="surname"
                placeholder={t('addUserForm.surname')}
                className="w-full border-round-md"
                {...register('surname', { required: true, maxLength: 20 })}
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
              />
              {errors.surname && (
                <span className="flex pt-2 text-red-600">
                  {errors.surname.message}
                </span>
              )}
              <p className="font-bold" htmlFor="address">
                {t('addUserForm.address')}:
              </p>
              <InputText
                id="address"
                placeholder={t('addUserForm.address')}
                className="w-full border-round-md"
                {...register('address', { required: true, maxLength: 30 })}
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
              />
              {errors.address && (
                <span className="flex pt-2 text-red-600">
                  {errors.address.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid">
            <div className="col-6">
              <p className="font-bold" htmlFor="jobTitle">
                {t('addUserForm.jobTitle')}:
              </p>
              <Controller
                name="jobTitle"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    {...field}
                    options={jobs}
                    optionLabel="name"
                    optionValue="name"
                    onChange={(e) => field.onChange(e.value)}
                    filter
                    placeholder={t('addUserForm.jobTitle')}
                    className="w-full border-round-md"
                  />
                )}
              />
              {/* <InputText
                id="jobTitle"
                placeholder={t('addUserForm.jobTitle')}
                className="w-full border-round-md"
                {...register('jobTitle', { required: true, maxLength: 30 })}
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
              /> */}
              {errors.jobTitle && (
                <span className="flex pt-2 text-red-600">
                  {errors.jobTitle.message}
                </span>
              )}
            </div>
            <div className="col-6">
              <p className="font-bold" htmlFor="country">
                {t('addUserForm.country')}:
              </p>

              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    {...field}
                    options={countries}
                    optionLabel="name"
                    optionValue="name"
                    onChange={(e) => field.onChange(e.value)}
                    filter
                    placeholder="Country"
                    className="w-full border-round-md"
                  />
                )}
              />
              {errors.country && (
                <span className="flex pt-2 text-red-600">
                  {errors.country.message} {/* Display error message */}
                </span>
              )}
            </div>
          </div>
          <div className="grid">
            <div className="col-6">
              <p className="font-bold" htmlFor="gender">
                {t('addUserForm.gender')}:
              </p>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-wrap gap-3">
                    {genders.map((gender) => (
                      <div className="flex align-items-center" key={gender.key}>
                        <RadioButton
                          {...field}
                          inputId={gender.name}
                          onChange={(e) => field.onChange(e.value)}
                          checked={field.value === gender.name}
                          name="gender"
                          value={gender.name}
                        />
                        <label htmlFor={gender.key} className="ml-2">
                          {gender.name}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              />
              {errors.gender && (
                <span className="flex pt-2 text-red-600">
                  {errors.gender.message} {/* Display error message */}
                </span>
              )}
            </div>
            <div className="col-6">
              <p className="font-bold" htmlFor="birthDate">
                {t('addUserForm.birthDate')}:
              </p>
              {/* Bakılacak--------------------------------------------------------------------------> */}
              <div>
                <Controller
                  name="birthDate"
                  control={control}
                  //style={{ borderRadius: '0.375rem !important' }}
                  render={({ field }) => (
                    <Calendar
                      {...field}
                      dateFormat="dd/mm/yy"
                      placeholder={t('addUserForm.birthDate')}
                      className=" w-full my-calender "
                      value={field.value}
                    />
                  )}
                />
              </div>
              {errors.birthDate && (
                <span className="flex pt-2 text-red-600">
                  {errors.birthDate.message} {/* Display error message */}
                </span>
              )}
            </div>
          </div>
          <Button
            type="submit"
            label={t('addUserForm.submitButton')}
            className="w-6 m-auto mt-4 border-round-md"
            icon="pi pi-check"
            //onClick={showSuccess}
          />
        </form>
      </Dialog>
    </div>
  )
}
