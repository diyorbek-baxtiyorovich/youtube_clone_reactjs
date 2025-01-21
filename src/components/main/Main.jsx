import { Box, Container, Stack, Typography } from '@mui/material'
import React, {  useEffect, useState } from 'react'
import { colors } from '../../constants/color'
import { Category, Videos } from '../'
import { ApiServices } from '../../service/api.service'

const Main = () => {

  const [categoryName, setCategoryName] = useState("New");
  const [videos, setVideos] = useState([])
   
  const selectCategoryHandler = (category) => {
    setCategoryName(category);
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await ApiServices.fetching(`search?part=snippet&q=${categoryName}`)
        setVideos(data.items)
      }
      catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [categoryName])


  return (
    <Stack>
      <Category selectCategoryHender={selectCategoryHandler} selectCategory={categoryName}/>
      <Box p={2} sx={{height: '80vh'}}>
        <Container maxWidth="90%">
            <Typography variant='h4' fontWeight={"bold"} mb={2}>
              {categoryName} <span style={{color: colors.secondary}}>Videos</span>
            </Typography>
            <Videos  videos = {videos} />
        </Container>
      </Box>
    </Stack>
  )
}

export default Main
