import { Box, CardContent, CardMedia, Typography } from "@mui/material"
import { CheckCircle } from "@mui/icons-material"
import { Link } from "react-router-dom"


const ChannelCard = ({video}) => {
  return (
    <Box sx={{boxShadow: 'none', borderRadius: "20px", display: "flex", justifyContent: "center", alignItems: "center", width: {xs: "100%", md: "320px"}, height: "326px", margin: "auto"}}> 
    <Link to={`/channel/${video?.snippet?.channelId}`} style={{textDecoration: "none", color: "black"}}>
        <CardContent sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
          <CardMedia  image={video?.snippet?.thumbnails?.default?.url} alt={video?.snippet?.title} sx={{borderRadius: "50%", height: "180px", width: "180px", mb: 2, border: "1px solid #e3e3e3"}}/>
          <Typography variant='h6'>
              {video?.snippet?.title}{" "}
              <CheckCircle sx={{fontSize: "14px", color: "gray", ml: "5px"}}/>
          </Typography>
          {
            video?.statistics?.subscriberCount && (
              <Typography sx={{fontSize: "14px", color: "gray", fontWeight: "bold"}}>
                 {parseInt(video?.statistics?.subscriberCount).toLocaleString('en-US')} {" "} subscribers
              </Typography>
            )
          }
        </CardContent>
    </Link>
        
    </Box>
  )
}

export default ChannelCard
