import { IconButton, Paper } from '@mui/material'
import { colors } from '../../constants/color'
import React from 'react'
import { Search } from '@mui/icons-material'
import './search-bar.css'

const SearchBar = () => {
  return (
    <Paper component={'form'} sx={{border: `1px solid ${colors.secondary}`, pl: 2, boxShadow: "none"}}>
        <input type="text" placeholder="Search"  className='search-bar'/>
        <IconButton>
            <Search/>
        </IconButton>
    </Paper>
  )
}

export default SearchBar
