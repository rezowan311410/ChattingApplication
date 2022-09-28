import React from 'react'
import {AiOutlineSearch} from 'react-icons/ai';
import {BsThreeDotsVertical} from 'react-icons/bs';
const Search = () => {
  return (
    <div className='search'>
        <input placeholder='search'/>
        <div className='icon'>
        <AiOutlineSearch/>
        
        </div>
        <div className='icon2'>
        <BsThreeDotsVertical/>
        </div>
    </div>
  )
}

export default Search