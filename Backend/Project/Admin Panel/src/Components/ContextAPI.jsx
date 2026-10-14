import React, { createContext, useState } from 'react'


const GlobalContext = createContext();


export default function ContextAPI({children}) {

    var getToken = localStorage.getItem('user_token');

    const [isLogin, setIsLogin] = useState(getToken ?? '');

    const data = {isLogin, setIsLogin}

  return (
    <GlobalContext.Provider value={ data }>
        {children}
    </GlobalContext.Provider>
  )
}

export { GlobalContext }