export default async function handler(req, res) {
  const requestType = req.body.type;

  res.status(200).json({ name: 'OK' });
  if (requestType === 'video.asset.ready') {
    const playbackId = req.body.data.playback_ids[0].id;
    const lotNumber = req.body.data.passthrough;
    await sendToDB(lotNumber, playbackId);
  }
}
