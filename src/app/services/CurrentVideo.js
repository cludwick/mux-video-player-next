import { videos } from '../data/videos';

export default function handler(req, res) {
  let videoId = videos[0].playbackId;

  let current = 0;
  let next = current < videos.length - 1 ? current + 1 : 0;
  let prev = current > 0 ? current - 1 : videos.length - 1;

  const updateVideo = () => {
    videoId = videos[current].playbackId;
  };

  const goToNum = (newCurrentIndex) => {
    current = newCurrentIndex;
    next = current < videos.length - 1 ? current + 1 : 0;
    prev = current > 0 ? current - 1 : videos.length - 1;
    updateVideo();
  };

  const goToNext = () => (current < videos.length - 1 ? goToNum(current + 1) : goToNum(0));

  res.status(200).json({ videoId });
}
