import React, { useState, useEffect, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import FormInputDialog from './FormInputDialog'
import ModifyUserDialog from './ModifyUserDialog'
import '../styles/table.css'

export default function UserListPage() {
  const [visible, setVisible] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const toast = useRef(null)
  const [users, setUsers] = useState(null)
  const [isSubmittable, setIsSubmittable] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false)

  const { t, i18n } = useTranslation()

  const location = useLocation()

  const columns = [
    { field: 'name', header: t('dataTable.name') },
    { field: 'surname', header: t('dataTable.surname') },
    { field: 'birthDate', header: t('dataTable.birthDate') },
    { field: 'gender', header: t('dataTable.gender') },
    { field: 'jobTitle', header: t('dataTable.jobTitle') },
    { field: 'email', header: t('dataTable.email') },
    { field: 'address', header: t('dataTable.address') },
    { field: 'country', header: t('dataTable.country') },
  ]

  const columnsDashboard = [
    {
      field: 'name',
      header: t('dataTable.name'),
      filter: true,
      filterPlaceholder: 'Search',
    },
    {
      field: 'surname',
      header: t('dataTable.surname'),
      filter: true,
      filterPlaceholder: 'Search',
    },
    {
      field: 'jobTitle',
      header: t('dataTable.jobTitle'),
      filter: true,
      filterPlaceholder: 'Search',
    },
    {
      field: 'email',
      header: t('dataTable.email'),
      filter: false,
      filterPlaceholder: 'Search',
    },
    {
      field: 'country',
      header: t('dataTable.country'),
      filter: true,
      filterPlaceholder: 'Search',
    },
  ]

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3333/dashboard', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Fetch error:', error)
    }
  }

  useEffect(() => {
    const lng = navigator.language
    i18n.changeLanguage(lng)
    fetchData()
  }, [])

  const showSuccess = () => {
    toast.current.show({
      severity: 'warn',
      summary: t('userListPage.success'),
      detail: t('userListPage.successMessageDelete'),
      life: 3000,
    })
  }

  const addUser = (user) => {
    fetch('http://localhost:3333/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          fetchData()
        }
        setIsSubmittable(true)
      })
      .catch((error) => console.error(error))
  }

  const updateUser = (id, userData) => {
    const requestData = { ...userData, id }
    console.log(requestData)
    fetch(`http://localhost:3333/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          fetchData()
        }
        setIsUpdated(true)
      })
      .catch((error) => console.error(error))
  }

  const deleteUser = async (id) => {
    await fetch(`http://localhost:3333/user`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ userId: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          fetchData()
        }
      })
      .catch((error) => console.error(error))
  }

  const header = (
    <FormInputDialog
      addUser={addUser}
      isSubmittable={isSubmittable}
      setIsSubmittable={setIsSubmittable}
    />
  )
  const footer = `${t('dataTable.footer1')} ${users ? users.length : 0} ${t(
    'dataTable.footer2'
  )}`

  const actionBodyTemplateVisible = (rowData) => {
    return (
      <Button
        type="button"
        icon="pi pi-cog"
        rounded
        onClick={() => {
          setVisible(true)
          setSelectedData(rowData)
        }}
      ></Button>
    )
  }
  const actionBodyTemplateDelete = (rowData) => {
    return (
      <Button
        type="button"
        icon="pi pi-trash"
        rounded
        onClick={() => {
          deleteUser(rowData.id)
          showSuccess()
        }}
      ></Button>
    )
  }

  return (
    <div
      className={
        location.pathname === '/dashboard'
          ? 'mt-2 card m-auto'
          : 'mt-2 card m-auto w-11'
      }
    >
      <Toast ref={toast} />
      <DataTable
        size={location.pathname !== '/dashboard' ? 'normal' : 'large'}
        paginator
        // filterDisplay="row"
        rows={6}
        paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        value={users}
        header={location.pathname !== '/dashboard' ? header : null}
        footer={location.pathname !== '/dashboard' ? footer : null}
      >
        {location.pathname !== '/dashboard'
          ? columns.map((col, i) => (
              <Column
                key={col.field}
                field={col.field}
                header={col.header}
                sortable
                filter
                filterPlaceholder="Search"
                style={{ width: '12.5%' }}
              />
            ))
          : columnsDashboard.map((col, i) => (
              <Column
                key={col.field}
                field={col.field}
                header={col.header}
                sortable
                filter={col.filter}
                filterPlaceholder={col.filterPlaceholder}
                style={{ width: '20%' }}
              />
            ))}
        {location.pathname !== '/dashboard' ? (
          <Column
            headerStyle={{ width: '2rem', textAlign: 'center' }}
            bodyStyle={{ textAlign: 'center', overflow: 'visible' }}
            body={(rowData) => actionBodyTemplateDelete(rowData)}
          />
        ) : (
          <></>
        )}
        {location.pathname !== '/dashboard' ? (
          <Column
            headerStyle={{ width: '2rem', textAlign: 'center' }}
            bodyStyle={{ textAlign: 'center', overflow: 'visible' }}
            body={(rowData) => actionBodyTemplateVisible(rowData)}
          />
        ) : (
          <></>
        )}
      </DataTable>
      <ModifyUserDialog
        visible={visible}
        setVisible={setVisible}
        selectedData={selectedData}
        updateUser={updateUser}
        isUpdated={isUpdated}
        setIsUpdated={setIsUpdated}
      />
    </div>
  )
}
