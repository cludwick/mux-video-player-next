import VideoPlayer from '../components/VideoPlayer';

export default function Home() {
  // console.log(props.videos);
  return (
    <div>
      <VideoPlayer />
    </div>
  );
}

import fsPromises from 'fs/promises';
import path from 'path';

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), 'src/app/services/CurrentVideo.js');
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);
  const videoArray = objectData.videos;

  return {
    props: objectData,
  };
}
