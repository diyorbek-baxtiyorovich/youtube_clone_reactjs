import { Button, Box } from '@mui/material'
import React from 'react'
import { Link, useParams } from 'react-router-dom'

const Channel = () => {
  const params = useParams();
  console.log(params)
  return <Box>
    <Link to='/'>
      <Button variant="contained">Main</Button>    
    </Link>
  </Box>
}

export default Channel
