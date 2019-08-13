const YOUTUBE_OEMBED_URI = 'https://www.youtube.com/oembed'
const YOUTUBE_VIDEO_URI = 'https://www.youtube.com/watch'

export const getInfo = async (videoId) => {
  const video_url = `${YOUTUBE_VIDEO_URI}?v=${videoId}`;
  const resp = await fetch(`https://bypasscors.herokuapp.com/api/?url=${YOUTUBE_OEMBED_URI}?url=${video_url}&format=json`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  });
  const data = await resp.json();
  return data;
}

export const extractVideoId = (url) => {
  var match = url.match(/v=([0-9a-z_-]{1,20})/i);
  return (match ? match['1'] : false);
};

export default {
  getInfo,
  extractVideoId,
}
