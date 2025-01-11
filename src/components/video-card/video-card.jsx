import {  CheckCircle } from '@mui/icons-material'
import { Avatar, Card, CardActionArea, CardContent, CardMedia, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { colors } from '../../constants/color'
import moment from 'moment'
import React from 'react'

const VideoCard = ({video}) => {
  return (
    <Card sx={{width: {xs: "100%", sm: "360px", md: "320px"}, borderRadius: 0, boxShadow: 'none'}}>
        <CardActionArea>
            <Link to={`/video-details/${video?.id?.videoId}`}>
                <CardMedia image={video?.snippet?.thumbnails?.high?.url} alt={video?.snippet?.title} sx={{width: "360px", height: "180px"}} />
            </Link>
            <CardContent sx={{position: "relative", padding: "10px", height: "200px", background: colors.primary}}>
                <Link to={`/video-details/${video?.id?.videoId}`} style={{textDecoration: "none", color: "black"}}>
                    <Typography my={"5px"}  sx={{opacity: "0.4", fontSize: "12px"}} >
                        {moment(video?.snippet?.publishedAt).fromNow()}
                    </Typography>
                    <Typography variant='subtitle1' fontWeight={"bold"} >
                        {video?.snippet?.title.slice(0, 50)}...
                    </Typography>
                    <Typography variant='subtitle2' sx={{opacity: "0.6"}} >
                        {video?.snippet?.description.slice(0, 50)}...  
                    </Typography>
                </Link>
                <Link to={`/channel/${video?.snippet?.channelId}`} style={{textDecoration: "none", color: "black"}}>
                    <Stack direction={"row"} position={'absolute'} bottom={"10px"} alignItems={'center'} gap={"5px"}>
                        <Avatar src={video?.snippet?.thumbnails?.high?.url} />
                        <Typography variant='subtitle2' color='gray' >{video?.snippet?.channelTitle}</Typography>
                        <CheckCircle sx={{color: "gray", fontSize: "12px", ml : "5px"}} />
                    </Stack>
                </Link>
            </CardContent>
        </CardActionArea>
    </Card>
  )
}

export default VideoCard
