import React, { useState, useEffect } from 'react'
import UserListPage from './datatable/UserListPage'
import PieChart from './charts/PieChart'
import { Dropdown } from 'primereact/dropdown'
import { useForm, Controller } from 'react-hook-form'
import BasicChart from './charts/BasicChart'
import LineChart from './charts/LineChart'
import { Divider } from 'primereact/divider'

export default function Dashboard() {
  const [users, setUsers] = useState(null)
  const [selectedFilter, setSelectedFilter] = useState('Country')
  const filters = [
    { name: 'Job Title', code: 'jobTitle' },
    { name: 'Gender', code: 'gender' },
    { name: 'Country', code: 'country' },
    { name: 'Age', code: 'age' },
  ]

  const {
    register,
    handleSubmit,
    reset,
    onChange,
    control,
    formState: { errors },
  } = useForm()

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
    fetchData()
  }, [])

  const handleChange = (selectedValue) => {
    setSelectedFilter(selectedValue)
  }

  return (
    <div className="w-11 m-auto">
      <div className="grid w-full">
        <p className="col-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <Divider layout="vertical" />
        <p className="col-4">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit,
          sed quia non numquam eius modi.
        </p>
        <Divider layout="vertical" />
        <p className="col-3 w-30rem">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
          et quas molestias excepturi sint occaecati cupiditate non provident,
          similique sunt in culpa qui officia deserunt mollitia animi, id est
          laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
          distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
          cumque nihil impedit quo minus.
        </p>
        {/* <div style={{ minHeight: '10rem' }} className="col-4 border-1">
          <h2>In total there are # of users</h2>
        </div>
        <div style={{ minHeight: '10rem' }} className="col-4 border-1">
          <h2>emptyCard</h2>
        </div>
        <div style={{ minHeight: '10rem' }} className="col-4 border-1">
          <h2>emptyCard</h2>
        </div> */}
      </div>
      <div className="grid h-full">
        <div className="col-4">
          <h2 className="text-center text-800">
            Users' {selectedFilter.toLowerCase()} statistics
          </h2>
          <Controller
            name="filter"
            control={control}
            render={({ field }) => (
              <Dropdown
                {...field}
                value={selectedFilter}
                options={filters}
                optionLabel="name"
                optionValue="name"
                onChange={(e) => {
                  field.onChange(e.value)
                  handleChange(e.value)
                }}
                filter
                placeholder="Filter"
                className="w-11 flex m-auto mb-1 border-round-md"
              />
            )}
          />
          {users !== null &&
            selectedFilter !== 'Gender' &&
            selectedFilter !== 'Age' && (
              <PieChart users={users} selectedFilter={selectedFilter} />
            )}
          {users !== null && selectedFilter === 'Gender' && (
            <BasicChart users={users} />
          )}
          {users !== null && selectedFilter === 'Age' && (
            <LineChart users={users} />
          )}
        </div>
        <div className="col-8 pl-7 mt-1">
          <h2 className="text-center text-800">Userlist and Details</h2>
          <UserListPage users={users} />
        </div>
      </div>
    </div>
  )
}
