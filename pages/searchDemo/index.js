import React, { useState } from 'react'
import axios from 'axios';


const Search = () => {
  const [keyword, setKeyword] = useState("")
  const [array, setArray] = useState([])


  const getData = async(data) => {
    await axios.get('http://localhost:12345/posts/search', {
      params: {
        keyword: data
      }
    })
    .then (result => {
      console.log(result.data);
      setArray(result.data)
    })
    .catch(error => {
      console.log(error);
    });
  }


  const preview = () => {
    if(keyword !== "" && array.length !== 0) {
      return (
        <ul>
        {
          array.map((val, index) => (
          <li key={index}>{val.title}</li>
          ))
        }
      </ul>
      )
    } else if(keyword !== "" && array.length === 0) {
      return (
        <p>一致するデータはありません</p>
      )
    } else {
      return ""
    }
  }


  return (
    <>
      <input onChange={e => {setKeyword(e.target.value); getData(e.target.value)}}></input>
      {preview()}
    </>
  );
}


export default Search