import React, { useState } from 'react'

export default function Counter() {

    // var count = 4;

    var [count, setCount] = useState(10)

    const minus = () => {
        count--;
        setCount(count)
        console.log(count)
    }

    const plus = () => {
        count++;
        setCount(count)
        console.log(count)
    }

  return (
    <>
      <div className='counterapp'>
        <button onClick={ minus }>-</button>
        <button>{ count }</button>
        <button onClick={ plus }>+</button>
      </div>
    </>
  )
}
