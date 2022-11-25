import React from 'react';
import MuxPlayer from '@mux/mux-player-react';
// import currentVideo from '';

import styles from '../styles/VideoPlayer.module.css';

export default class VideoPlayer extends React.Component {
  render() {
    return (
      <div className={styles.videoContainer}>
        <MuxPlayer nohotkeys loop autoPlay streamType='on-demand' playbackId='Y4fAGAjXkECyGp00bHI5Q7d7lQXTa3fI4orj3SdxWuCk' />
      </div>
    );
  }
}
