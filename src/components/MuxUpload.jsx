import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import axios from 'axios';
import * as UpChunk from '@mux/upchunk';
import styles from '../styles/MuxUpload.module.css';
import VideoList from './VideoList';

function MuxUpload() {
  const [progress, setProgress] = useState(0);
  const [videoFiles, setVideoFiles] = useState([]);

  async function handleUpload(e) {
    e.preventDefault();

    for (const video of videoFiles) {
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
          setProgress(progress.detail);
        });

        upload.on('success', () => {
          setVideoFiles([]);
          setProgress(0);
          console.log("Wrap it up, we're done here. 👋");
        });
      } catch (error) {
        console.log(`😱 Creating authenticated upload url failed: ${error}`);
      }
    }
  }

  const handleVideos = async (file) => {
    for (let i = 0; i < file.length; i++) {
      setVideoFiles([...videoFiles, file[i]]);
    }
  };
  return (
    <div className={styles.container}>
      <h1>Mux File Upload</h1>
      <h4>
        <em>Can handle multiple video uploads, but only one video selection at this time</em>
      </h4>

      <form onSubmit={handleUpload}>
        <FileUploader className={styles.input} id='file-drop' multiple={true} handleChange={handleVideos} />
        <button>Upload Videos</button>
      </form>
      <VideoList videoFiles={videoFiles} />
      <label htmlFor='upload-progress'>Downloading progress:</label>
      <progress value={progress} max='100' />
    </div>
  );
}

export default MuxUpload;
