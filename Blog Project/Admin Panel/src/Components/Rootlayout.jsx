import React, { useContext, useEffect } from 'react'
import { GlobalContext } from './ContextAPI'
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Rootlayout() {

    const { isLogin } = useContext(GlobalContext);

    const navigate = useNavigate();

    useEffect(() => {
        if(isLogin == ''){
            navigate('/')
        }
    }, [])

    return (
        <>
            <div className='flex'>
                <Sidebar />
                <div className='basis-[100%] h-[100vh] relative overflow-y-scroll '>
                    <Outlet />
                </div>
            </div>
        </>
    )
}
