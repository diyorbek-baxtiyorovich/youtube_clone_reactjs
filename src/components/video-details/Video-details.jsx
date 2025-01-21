import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ApiServices } from '../../service/api.service';
import { Box, Chip, Stack, Typography } from '@mui/material';
import ReactPlayer from 'react-player';
import { FavoriteOutlined, MarkChatRead, Visibility } from '@mui/icons-material';
import Videos from '../video/video';
import './video-details.css';

const VideoDetails = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [relativesVideo, setRelativesVideo] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();

  // bu useEffect hool orqali video ma'lumotlarini olishimiz mumkin
  useEffect(() => {
    const fetchVideoDetail = async () => {
      try {
        const data = await ApiServices.fetching(`videos?part=snippet,statistics&id=${id}`);
        if (data?.items?.length) {
          setVideoDetail(data.items[0]);
        } else {
          setError("Video details not found.");
        }
      } catch (err) {
        setError("An error occurred while fetching video details.");
        console.error(err);
      }
    };
    fetchVideoDetail();
  }, [id]);

  // bu useEffect hool orqali related videos ma'lumotlarini olishimiz mumkin
  useEffect(() => {
    if (!videoDetail) return;

    const fetchRelatedVideos = async () => {
      try {
        const relatedData = await ApiServices.fetching(
          `search?part=snippet&relatedToVideoId=${id}&type=video`
        );
        setRelativesVideo(relatedData.items || []);
      } catch (err) {
        setError("An error occurred while fetching related videos.");
        console.error(err);
      }
    };
    fetchRelatedVideos();
  }, [videoDetail, id]);

  const [comments, setComments] = useState([]);
  // bu useEffect hool orqali video commentlarini olishimiz mumkin
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await ApiServices.fetching(
          `commentThreads?part=snippet&videoId=${id}&order=relevance`
        );
        setComments(data.items || []);
      } catch (err) {
        setError("An error occurred while fetching comments.");
        console.error(err);
      }
    };
    fetchComments();
  }, [id]);
  // agar error bo'lsa uni chiqarib beramiz
  if (error) {
    return (
      <Box minHeight="90vh" display="flex" justifyContent="center" alignItems="center">
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Box>
    );
  }
  // agar videoDetail bo'lmagan bo'lsa loading qilib ko'rsatamiz

  if (!videoDetail) {
    return (
      <Box minHeight="90vh" display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  //  agar videoDetail bo'lsa uni ma'lumotlarini olib chiqamiz
  const { snippet = {}, statistics = {} } = videoDetail;
  const { title, description, tags } = snippet;
  const viewCount = statistics.viewCount || 0;
  const likeCount = statistics.likeCount || 0;
  const commentCount = statistics.commentCount || 0;

  // agar relativesVideo bo'lsa uni ma'lumotlarini olib chiqamiz
  return (
    <Box minHeight="90vh" mb={10}>
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }}>
        <Box flex="1" p={2}>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            className="react-player"
            controls
            width="100%"
          />
          {tags?.map((item, idx) => (
            <Chip
              label={item}
              key={idx}
              sx={{ mt: 1, cursor: 'pointer', ml: 1 }}
              variant="outlined"
            />
          ))}
          <Typography variant="h5" fontWeight="bold" mt={2}>
            {title}
          </Typography>
          <Typography variant="subtitle1" mt={2} sx={{ opacity: 0.7 }}>
            {description}
          </Typography>
          <Stack direction="row" gap={2} py={1} px={2} alignItems="center">
            <Stack sx={{ opacity: 0.7 }} direction="row" alignItems="center" gap={1}>
              <Visibility />
              {parseInt(viewCount).toLocaleString()} views
            </Stack>
            <Stack sx={{ opacity: 0.7 }} direction="row" alignItems="center" gap={1}>
              <FavoriteOutlined />
              {parseInt(likeCount).toLocaleString()} likes
            </Stack>
            <Stack sx={{ opacity: 0.7 }} direction="row" alignItems="center" gap={1}>
              <MarkChatRead />
              {parseInt(commentCount).toLocaleString()} comments
            </Stack>
          </Stack>
          <Box mt={4} >
              <Typography variant="h5" fontWeight="bold" mb={2}>
                Comments
              </Typography>
              {comments.map((comment) => {
                const { authorDisplayName, textDisplay, publishedAt } =
                  comment.snippet.topLevelComment.snippet;
                return (
                  <Box key={comment.id} my={2} p={2} sx={{ border: '1px solid #ddd', borderRadius: '8px' }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {authorDisplayName}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      {textDisplay}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.6 }}>
                      {new Date(publishedAt).toLocaleString()}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
        </Box>
        <Box flex="0" p={2}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Related Videos
          </Typography>
          <Videos videos={relativesVideo} />
        </Box>
      </Box>
    </Box>
  );
};

export default VideoDetails;
