import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ApiServices } from '../../service/api.service';
import { Box } from '@mui/material';
import ReactPlayer from 'react-player';
import './video-details.css'
const VideoDetails = () => {

  const [videoDetail, setVideoDetail] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await ApiServices.fetching(`videos?part=snippet&id=${id}`)
        setVideoDetail(data.items[0])
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [id])

  // const {
  //   snippet: { title, description, channelTitle, tags, thumbnails, channelId },
  //   statistics: { viewCount, likeCount, commentCount }
  // } = videoDetail
  console.log(videoDetail)

  return (
    <Box minHeight={'90vh'} mb={10}>
      <Box display={'flex'}>
        <Box width={'75%'}>
          <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`}  className='react-player' controls/>
        </Box>
        <Box width={'25%'}></Box>
      </Box>
    </Box>
  )   
}

export default VideoDetails
