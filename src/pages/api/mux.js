export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' });
  const requestType = req.body.type;
  if (requestType === 'video.asset.ready') {
    const playbackId = req.body.data.playback_ids[0].id;
  }
}
