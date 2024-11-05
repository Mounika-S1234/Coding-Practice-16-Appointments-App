// Write your code here
import React from 'react'
import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleStarred} = props
  const {id, title, date, isStarred} = appointmentDetails

  const starImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const onClickStar = () => {
    toggleStarred(id)
  }

  return (
    <li className="appointment-item">
      <div className="appointment-details">
        <p className="appointment-title">{title}</p>
        <p className="appointment-date">{formattedDate}</p>
      </div>
      <button
        type="button"
        className="star-button"
        onClick={onClickStar}
        data-testid="star"
      >
        <img src={starImage} alt="star" className="star" />
      </button>
    </li>
  )
}

export default AppointmentItem
