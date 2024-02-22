import React, { useState, useEffect } from 'react'
import { Chart } from 'primereact/chart'
import moment from 'moment'

export default function LineChart({ users }) {
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement)
    const textColor = documentStyle.getPropertyValue('--text-color')

    // function calculateAgeRange(birthDate) {
    //   const today = moment()
    //   const dob = moment(birthDate, 'DD-MM-YYYY')
    //   const age = today.diff(dob, 'years')

    //   //return age

    //   if (age >= 15 && age < 20) {
    //     return '15-20'
    //   } else if (age >= 20 && age < 25) {
    //     return '20-25'
    //   } else if (age >= 25 && age < 30) {
    //     return '25-30'
    //   } else if (age >= 30 && age < 35) {
    //     return '30-35'
    //   } else if (age >= 35 && age < 40) {
    //     return '35-40'
    //   } else if (age >= 40 && age < 45) {
    //     return '40-45'
    //   } else if (age >= 45 && age < 50) {
    //     return '45-50'
    //   } else if (age >= 50 && age < 55) {
    //     return '50-55'
    //   } else if (age >= 55 && age < 60) {
    //     return '55-60'
    //   } else if (age >= 60) {
    //     return '60+'
    //   }
    // }

    function calculateAgeRange(birthDate) {
      const today = moment()
      const dob = moment(birthDate, 'DD-MM-YYYY')
      const age = today.diff(dob, 'years')

      if (age >= 15 && age < 20) {
        return '15-20'
      } else if (age >= 20 && age < 25) {
        return '20-25'
      } else if (age >= 25 && age < 30) {
        return '25-30'
      } else if (age >= 30 && age < 35) {
        return '30-35'
      } else if (age >= 35 && age < 40) {
        return '35-40'
      } else if (age >= 40 && age < 45) {
        return '40-45'
      } else if (age >= 45 && age < 50) {
        return '45-50'
      } else if (age >= 50 && age < 55) {
        return '50-55'
      } else if (age >= 55 && age < 60) {
        return '55-60'
      } else {
        return '60+'
      }
    }

    const ageCounts = {
      '15-20': 0,
      '20-25': 0,
      '25-30': 0,
      '30-35': 0,
      '35-40': 0,
      '40-45': 0,
      '45-50': 0,
      '50-55': 0,
      '55-60': 0,
      '60+': 0,
    }

    users.forEach((user) => {
      const ageRange = calculateAgeRange(user.birthDate)
      ageCounts[ageRange]++
    })

    const sortedAges = Object.entries(ageCounts)
    console.log(sortedAges)

    const newAgeCounts = sortedAges.map((age) => age[1])
    const newAgeLabels = sortedAges.map((age) => age[0])

    const data = {
      labels: newAgeLabels,
      datasets: [
        {
          label: 'Age',
          data: newAgeCounts,
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4,
        },
      ],
    }

    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        y: {
          min: 0, // Ensure the y-axis starts at 0
          stepSize: 1,
        },
      },
    }

    setChartData(data)
    setChartOptions(options)
  }, [users])

  return (
    <div className="card justify-content-center mt-5">
      <Chart type="line" data={chartData} options={chartOptions} />
    </div>
  )
}
