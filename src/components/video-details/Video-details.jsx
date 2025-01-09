import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ApiServices } from '../../service/api.service';
import { Box, Chip, Stack, Typography } from '@mui/material';
import ReactPlayer from 'react-player';
import { FavoriteOutlined, MarkChatRead, Tag, Visibility } from '@mui/icons-material';
import './video-details.css';

const VideoDetails = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await ApiServices.fetching(`videos?part=snippet,statistics&id=${id}`);
        if (data.items && data.items.length > 0) {
          setVideoDetail(data.items[0]);
        } else {
          setError("Video details not found.");
        }
      } catch (err) {
        setError("An error occurred while fetching video details.");
        console.error(err);
      }
    };
    getData();
  }, [id]);

  if (error) {
    return (
      <Box minHeight="90vh" display="flex" justifyContent="center" alignItems="center">
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!videoDetail) {
    return (
      <Box minHeight="90vh" display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  const { snippet, statistics } = videoDetail;
  const { title, description, tags } = snippet || {};
  const viewCount = statistics?.viewCount || 0;
  const likeCount = statistics?.likeCount || 0;
  const commentCount = statistics?.commentCount || 0;

  return (
    <Box minHeight="90vh" mb={10}>
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }}>
        <Box flex="1">
          <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
          {tags?.map((item, idx) => (
            <Chip
              label={item}
              key={idx}
              sx={{ marginTop: '10px', cursor: 'pointer', ml: '10px' }}
              variant="outlined"
            />
          ))}
          <Typography variant="h5" fontWeight="bold" mt={2}>
            {title}
          </Typography>
          <Typography variant="subtitle1" mt={2} sx={{ opacity: '0.7' }}>
            {description}
          </Typography>
          <Stack direction="row" gap="20px" py={1} px={2} alignItems="center">
            <Stack sx={{ opacity: '0.7' }} direction="row" alignItems="center" gap="3px">
              <Visibility />
              {parseInt(viewCount).toLocaleString()} views
            </Stack>
            <Stack sx={{ opacity: '0.7' }} direction="row" alignItems="center" gap="3px">
              <FavoriteOutlined />
              {parseInt(likeCount).toLocaleString()} likes
            </Stack>
            <Stack sx={{ opacity: '0.7' }} direction="row" alignItems="center" gap="3px">
              <MarkChatRead />
              {parseInt(commentCount).toLocaleString()} comments
            </Stack>
          </Stack>
        </Box>
        <Box flex="0.3" display={{ xs: 'none', md: 'block' }}>
          <Typography variant="h6">Suggested Videos</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoDetails;
