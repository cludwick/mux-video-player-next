import React, { useState } from 'react';

export default function VideoList(props) {
  // const [videoList, setVideoList] = useState([]);

  const { videoFiles } = props;
  // console.log(videoFiles[0].name);

  // console.log(videoFiles);
  // for (const video of videoFiles) {
  //   setVideoList(...videoList, video.name);
  // }
  return (
    <div>
      <h3>Videos to Upload</h3>
      <ul>
        {Array.from(videoFiles).map((video) => (
          <li key={video.lastModified}>{video.name}</li>
        ))}
      </ul>
    </div>
  );
}
