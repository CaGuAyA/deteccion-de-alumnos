import React from 'react'
import './styles/messageAlert.css'

export const MessageAlert = ({clase, mensaje}) => {
  return (
    <div className={clase}>
      <img src='/src/components/messages/images/alert.png'></img>
      <p>{mensaje}</p>
    </div>
  )
}
