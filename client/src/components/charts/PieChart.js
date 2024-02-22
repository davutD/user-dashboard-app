import React, { useState, useEffect } from 'react'
import { Chart } from 'primereact/chart'

export default function PieChart({ users, selectedFilter }) {
  const [chartData, setChartData] = useState()
  const [chartOptions, setChartOptions] = useState()

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement)
    const countryCounts = users.reduce((counts, user) => {
      counts[user.country] = (counts[user.country] || 0) + 1
      return counts
    }, {})

    const jobTitleCounts = users.reduce((counts, user) => {
      counts[user.jobTitle] = (counts[user.jobTitle] || 0) + 1
      return counts
    }, {})

    function randomColor() {
      const r = Math.floor(Math.random() * 256) // Random red value between 0 and 255
      const g = Math.floor(Math.random() * 256) // Random green value between 0 and 255
      const b = Math.floor(Math.random() * 256) // Random blue value between 0 and 255
      return `rgb(${r}, ${g}, ${b})` // Construct the RGB color string
    }

    const colorArray = Object.keys(countryCounts).map(() => {
      return randomColor()
    })

    const hoverColorArray = colorArray.map((color) => {
      const [r, g, b] = color
        .substring(4, color.length - 1)
        .split(',')
        .map((value) => parseInt(value.trim()))
      const updatedR = Math.min(r + 30, 255)
      const updatedG = Math.min(g + 30, 255)
      const updatedB = Math.min(b + 30, 255)

      return `rgb(${updatedR}, ${updatedG}, ${updatedB})`
    })
    // const colorArray = [
    //   (documentStyle.getPropertyValue('--blue-500'),
    //   documentStyle.getPropertyValue('--yellow-500'),
    //   documentStyle.getPropertyValue('--green-500'),
    //   documentStyle.getPropertyValue('--primary-500'),
    //   documentStyle.getPropertyValue('--cyan-500'),
    //   documentStyle.getPropertyValue('--pink-500'),
    //   documentStyle.getPropertyValue('--indigo-500'),
    //   documentStyle.getPropertyValue('--teal-500'),
    //   documentStyle.getPropertyValue('--orange-500'),
    //   documentStyle.getPropertyValue('--bluegray-500'),
    //   documentStyle.getPropertyValue('--purple-500'),
    //   documentStyle.getPropertyValue('--red-500'),
    //   documentStyle.getPropertyValue('--blue-300'),
    //   documentStyle.getPropertyValue('--yellow-300'),
    //   documentStyle.getPropertyValue('--green-300'),
    //   documentStyle.getPropertyValue('--primary-300'),
    //   documentStyle.getPropertyValue('--cyan-300'),
    //   documentStyle.getPropertyValue('--pink-300'),
    //   documentStyle.getPropertyValue('--indigo-300'),
    //   documentStyle.getPropertyValue('--teal-300'),
    //   documentStyle.getPropertyValue('--orange-300'),
    //   documentStyle.getPropertyValue('--bluegray-300'),
    //   documentStyle.getPropertyValue('--purple-300'),
    //   documentStyle.getPropertyValue('--red-300')),
    // ]

    // const hoverColorArray = [
    //   (documentStyle.getPropertyValue('--blue-400'),
    //   documentStyle.getPropertyValue('--yellow-400'),
    //   documentStyle.getPropertyValue('--green-400'),
    //   documentStyle.getPropertyValue('--primary-400'),
    //   documentStyle.getPropertyValue('--cyan-400'),
    //   documentStyle.getPropertyValue('--pink-400'),
    //   documentStyle.getPropertyValue('--indigo-400'),
    //   documentStyle.getPropertyValue('--teal-400'),
    //   documentStyle.getPropertyValue('--orange-400'),
    //   documentStyle.getPropertyValue('--bluegray-400'),
    //   documentStyle.getPropertyValue('--purple-400'),
    //   documentStyle.getPropertyValue('--red-400'),
    //   documentStyle.getPropertyValue('--blue-200'),
    //   documentStyle.getPropertyValue('--yellow-200'),
    //   documentStyle.getPropertyValue('--green-200'),
    //   documentStyle.getPropertyValue('--primary-200'),
    //   documentStyle.getPropertyValue('--cyan-200'),
    //   documentStyle.getPropertyValue('--pink-200'),
    //   documentStyle.getPropertyValue('--indigo-200'),
    //   documentStyle.getPropertyValue('--teal-200'),
    //   documentStyle.getPropertyValue('--orange-200'),
    //   documentStyle.getPropertyValue('--bluegray-200'),
    //   documentStyle.getPropertyValue('--purple-200'),
    //   documentStyle.getPropertyValue('--red-200')),
    // ]

    const data = {
      labels:
        selectedFilter === 'Country'
          ? Object.keys(countryCounts)
          : Object.keys(jobTitleCounts),
      datasets: [
        {
          data:
            selectedFilter === 'Country'
              ? [...Object.values(countryCounts)]
              : [...Object.values(jobTitleCounts)],
          backgroundColor: colorArray,
          hoverBackgroundColor: hoverColorArray,
        },
      ],
    }
    const options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
          },
        },
      },
    }

    setChartData(data)
    setChartOptions(options)
  }, [users, selectedFilter])

  return (
    <div className="card flex justify-content-center">
      <Chart
        type="pie"
        data={chartData}
        options={chartOptions}
        className="w-full md:w-30rem"
      />
    </div>
  )
}
