import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import ServiceCard from './ServiceCard'
import ServiceHeading from './ServiceHeading';

export default function HomePage() {

    const [services, setServices] = useState([1,1,1,1]);

    const [bestServicesTitle, setBestServicesTitle] = useState('Best Services');
    const [popularServicesTitle, setPopularServicesTitle] = useState('Popular Services');
    const [description, setDescription] = useState('Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque cum doloremque quasi illum corporis? Nostrum dolore temporibus ea aspernatur nobis at. Adipisci in vero unde nostrum velit nam! Magni, rerum?')

  return (
    <>
        <Header/>

        <div className='outer_services'>
            <ServiceHeading title={bestServicesTitle} description={description}/>
            <div className='inner_services'>

                {
                    services.map(() => {
                        return(
                            <ServiceCard/>
                        )
                    })
                }
            </div>
        </div>

        <div className='outer_services'>
            <ServiceHeading title={popularServicesTitle} description={description}></ServiceHeading>
            <div className='inner_services'>

                {
                    services.map(() => {
                        return(
                            <ServiceCard/>
                        )
                    })
                }
            </div>
        </div>

        <Footer/>
    </>
  )
}
