import React from 'react'

export default function ServiceHeading({ title, description }) {

  // console.log(title, description)

  return (
    <>
        <div className='service_heading'>
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    </>
  )
}
