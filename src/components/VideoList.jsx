import React, { useState } from 'react';

export default function VideoList(props) {
  const { videoFiles } = props;

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
