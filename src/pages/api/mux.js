import excuteQuery from '../../app/services/db';

// const saleDataFile = require('../../app/data/videos.json');

export const sendToDB = async (lotNumber, playbackId) => {
  try {
    const result = await excuteQuery(`INSERT INTO \`mux_playback\` (\`lot\`, \`playbackId\`) VALUES ('${lotNumber}', '${playbackId}')`);
    console.log('Posted to MySQL');
  } catch (error) {
    console.log(error);
  }

  // const saleData = saleDataFile.videos;
  // const newData = { lot: lotNumber, playbackId: playbackId };
  // const jsonData = JSON.stringify(newData, null, 5);
  // saleData.push(newData);
  // console.log(saleDataFile);
};

export default async function handler(req, res) {
  const requestType = req.body.type;

  res.status(200).json({ name: 'OK' });
  if (requestType === 'video.asset.ready') {
    const playbackId = req.body.data.playback_ids[0].id;
    const lotNumber = req.body.data.passthrough;
    await sendToDB(lotNumber, playbackId);
  }
}
