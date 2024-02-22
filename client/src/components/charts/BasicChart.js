import React, { useEffect, useState } from 'react'
import { Chart } from 'primereact/chart'

export default function BasicChart({ users }) {
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement)
    const countryCounts = users.reduce((counts, user) => {
      counts[user.country] = (counts[user.country] || 0) + 1
      return counts
    }, {})

    const genderCounts = users.reduce((counts, user) => {
      counts[user.gender] = (counts[user.gender] || 0) + 1
      return counts
    }, {})

    // function randomColor() {
    //   const r = Math.floor(Math.random() * 256) // Random red value between 0 and 255
    //   const g = Math.floor(Math.random() * 256) // Random green value between 0 and 255
    //   const b = Math.floor(Math.random() * 256) // Random blue value between 0 and 255
    //   return `rgb(${r}, ${g}, ${b})` // Construct the RGB color string
    // }

    // const colorArray = Object.keys(countryCounts).map(() => {
    //   return randomColor()
    // })

    // const hoverColorArray = colorArray.map((color) => {
    //   const [r, g, b] = color
    //     .substring(4, color.length - 1)
    //     .split(',')
    //     .map((value) => parseInt(value.trim()))
    //   const updatedR = Math.min(r + 30, 255)
    //   const updatedG = Math.min(g + 30, 255)
    //   const updatedB = Math.min(b + 30, 255)

    //   return `rgb(${updatedR}, ${updatedG}, ${updatedB})`
    // })

    const data = {
      labels: ['Male', 'Female', 'Others'],
      datasets: [
        {
          label: 'Gender',
          data: genderCounts,
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500'),
          ],
          borderColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400'),
          ],
          borderWidth: 1,
        },
      ],
    }
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    }

    setChartData(data)
    setChartOptions(options)
  }, [])
  return (
    <div className="card justify-content-center mt-5">
      <Chart type="bar" data={chartData} options={chartOptions} />
    </div>
  )
}
