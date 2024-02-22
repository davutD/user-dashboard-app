import React, { useEffect, useRef } from 'react'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { Dialog } from 'primereact/dialog'
import { Calendar } from 'primereact/calendar'
import { InputText } from 'primereact/inputtext'
import { RadioButton } from 'primereact/radiobutton'
import { Dropdown } from 'primereact/dropdown'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import moment from 'moment'
import data from '../../data/countries.json'

import { useTranslation } from 'react-i18next'

export default function ModifyUserDialog({
  visible,
  setVisible,
  selectedData,
  updateUser,
  isUpdated,
  setIsUpdated,
}) {
  const toast = useRef(null)
  const { t, i18n } = useTranslation()
  const countries = data

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
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const isUpdatedFunction = () => {
    setIsUpdated(!isUpdated)
  }

  useEffect(() => {
    if (isUpdated) {
      showSuccess()
      isUpdatedFunction()
    }
  }, [isUpdated])

  const showSuccess = () => {
    toast.current.show({
      severity: 'success',
      summary: t('userListPage.success'),
      detail: t('userListPage.successMessageUpdate'),
      life: 3000,
    })
  }

  const onSubmit = (data) => {
    const date = new moment(data.birthDate).format('DD/MM/YYYY')
    updateUser(selectedData?.id, { ...data, birthDate: date })
    setVisible(false)
  }

  useEffect(() => {
    if (selectedData) {
      reset({
        name: selectedData.name || '',
        surname: selectedData.surname || '',
        email: selectedData.email || '',
        address: selectedData.address || '',
        jobTitle: selectedData.jobTitle || '',
        gender: selectedData.gender || '',
        country: selectedData.country || '',
        birthDate: selectedData.birthDate || '',
      })
    }
  }, [selectedData, reset])

  return (
    <div>
      <Toast ref={toast} />
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
              {errors.jobTitle && (
                <span className="flex pt-2 text-red-600">
                  {errors.jobTitle.message}
                </span>
              )}
              {/* <Controller control={control} /> */}
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
                      value={
                        field.value
                          ? moment(field.value, 'DD/MM/YYYY').toDate()
                          : null
                      }
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
