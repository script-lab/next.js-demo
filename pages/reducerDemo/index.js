import React, { useReducer, useState } from 'react'
import reducer from './events'


const Sum = () => {
  const [count, setCount] = useState(0)
  const [num, setNum] = useState(0)
  const initialState = {count, num};
  const [state, dispatch] = useReducer(reducer, initialState);


  const Add = (e) => {
    e.preventDefault()
    dispatch({
      type: "ADD_EVENT",
      count,
      num
    })
  }


  const Sub = (e) => {
    e.preventDefault()
    dispatch({
      type: "SUB_EVENT",
      count,
      num
    })
  }


  return (
    <>
      <div>{state.count}</div>
      <div>{state.num}</div>
      <button onClick={Add}> + click here!</button>
      <button onClick={Sub}> - click here!</button>
    </>
  )
}


export default Sum