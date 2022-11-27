import React, { useState } from 'react';
import axios from 'axios';
import * as UpChunk from '@mux/upchunk';
import styles from '../styles/MuxUpload.module.css';

function MuxUpload() {
  const [progress, setProgress] = useState(0);
  // const [videoFiles, setVideoFiles] = useState([]);

  async function handleUpload(e) {
    e.preventDefault();
    // for (const video of videoFiles) {
    try {
      const lotNum = videoFiles.name.split(' ')[0];
      const response = await axios.post('http://localhost:3001/upload', { lot: lotNum });

      console.log('👉 Authenticated upload url:', response.data.url);
      const upload = UpChunk.createUpload({
        endpoint: response.data.url,
        file: videoFiles, // the file object with all your video file’s data
        chunkSize: 5120, // Uploads the file in ~5mb chunks
      });

      // Subscribe to events
      upload.on('error', (error) => {
        console.error('💥 🙀', error.detail);
      });

      upload.on('progress', (progress) => {
        setProgress(progress.detail);
      });

      upload.on('success', () => {
        // inputRef.value = null;
        setProgress(0);
        console.log("Wrap it up, we're done here. 👋");
      });
    } catch (error) {
      console.log(`😱 Creating authenticated upload url failed: ${error}`);
    }
  }
  // }

  return (
    <div className={styles.container}>
      <h1>File upload button</h1>
      <form onSubmit={handleUpload}>
        <label htmlFor='file-picker'>Select a video file:</label>
        <input type='file' onChange={(e) => setVideoFiles(e.target)} id='file-picker' name='file-picker' multiple />
        <button>Upload Video</button>
      </form>
      <label htmlFor='upload-progress'>Downloading progress:</label>
      <progress value={progress} max='100' />
    </div>
  );
}

export default MuxUpload;
