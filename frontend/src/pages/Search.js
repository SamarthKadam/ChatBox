import React from 'react'
import SearchBar from '../components/SearchComponents/SearchBar'
import Result from '../components/SearchComponents/Result'

export default function Search() {

  const SearchHandler=(e)=>{
    console.log("execution")
    console.log(e.target.value)
  }

  return (
    <div className='w-[80vw] relative flex flex-col'>
        <SearchBar Search={SearchHandler}></SearchBar>
        <Result></Result>
    </div>
  )
}
