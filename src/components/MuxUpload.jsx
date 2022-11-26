import React, { Component } from 'react';
import axios from 'axios';
import * as UpChunk from '@mux/upchunk';
import styles from '../styles/MuxUpload.module.css';

export default class MuxUpload extends Component {
  constructor() {
    super();
    this.state = {
      progress: 0,
      videosArray: [],
    };
  }
  handleUpload = async (e) => {
    e.preventDefault();
    console.log(this.state.videosArray);

    for (const video of this.state.videosArray) {
      try {
        const lotNum = video.name.split(' ')[0];
        const response = await axios.post('http://localhost:3001/upload', { lot: lotNum });

        console.log('👉 Authenticated upload url:', response.data.url);
        const upload = UpChunk.createUpload({
          endpoint: response.data.url,
          file: video, // the file object with all your video file’s data
          chunkSize: 5120, // Uploads the file in ~5mb chunks
        });

        // Subscribe to events
        upload.on('error', (error) => {
          console.error('💥 🙀', error.detail);
        });

        upload.on('progress', (progress) => {
          this.setState({ progress: progress.detail });
        });

        upload.on('success', () => {
          // inputRef.value = null;
          // setProgress(0);
          console.log("Wrap it up, we're done here. 👋");
        });
      } catch (error) {
        console.log(`😱 Creating authenticated upload url failed: ${error}`);
      }
    }
  };

  handleVideos = async (event) => {
    this.setState({ videosArray: [event.target.value] });
  };

  render() {
    return (
      <div className={styles.container}>
        <h1>File upload button</h1>
        <form onSubmit={this.handleUpload}>
          <label htmlFor='file-picker'>Select a video file:</label>
          <input type='file' onChange={this.handleVideos} id='file-picker' name='file-picker' multiple />
          <button>Upload</button>
        </form>

        <label htmlFor='upload-progress'>Downloading progress:</label>
        <progress value={this.state.progress} max='100' />
      </div>
    );
  }
}

// function MuxUpload() {
//   const [progress, setProgress] = useState(0);

// }
// export default MuxUpload;
