import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { ApiServices } from "../../service/api.service";
import { ChannelCard, Videos } from "../";

const Channel = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const dataChannelDetail = await ApiServices.fetching(
          `channels?part=snippet&id=${id}`
        );
        setChannelDetail(dataChannelDetail.items[0]);
        const dataVideo = await ApiServices.fetching(
          `search?channelId=${id}&part=snippet%2Cid&order=date`
        );
        setVideos(dataVideo?.items);
      } catch (error) {
        setError("Failed to load channel data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [id]);

  if (loading) return <Box>Loading...</Box>;
  if (error) return <Box>{error}</Box>;
  if (!channelDetail) return <Box>Channel details not found.</Box>;

  return (
    <Box minHeight={"95vh"} mt={"1vh"}>
      <Box>
        <Box
          width={"100%"}
          height={"200px"}
          zIndex={10}
          sx={{
            backgroundImage: `url(${channelDetail?.brandingSettings?.image?.bannerExternalUrl})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            objectFit: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />
        <ChannelCard video={channelDetail} marginTop={"-100px"} />
      </Box>
      <Container maxWidth={"90%"}>
        <Videos videos={videos} />
      </Container>
    </Box>
  );
};

export default Channel;
