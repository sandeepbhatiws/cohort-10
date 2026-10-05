import React from 'react'
import Logo from './assets/images/ws-cube-white-logo.svg'

export default function HomePage() {

    var heading = 'This is a heading';
    var status = 1;

  return (
    <>
        {
            status == 1
            ?
            <div className='header' style={{ backgroundColor : 'red', fontSize : '40px' }}>
                <img src={Logo}/>
            </div>
            :
            <div className='header' style={{ backgroundColor : 'red', fontSize : '40px' }}>
                <h1>No Record Found</h1>
            </div>
        }


        <div className='header' style={{ display : `${ status == 1 ? 'none' : '' }` }}>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore, odit accusantium delectus eligendi placeat repudiandae fugit laboriosam, consectetur quae aperiam velit nesciunt corporis optio illum! Pariatur asperiores velit earum enim.</p>
        </div>
                
    </>
  )
}
