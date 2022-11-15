import MuxPlayer from '@mux/mux-player-react';

export default function VideoPlayer() {
  return (
    <MuxPlayer
      nohotkeys
      loop
      autoPlay
      streamType='on-demand'
      playbackId='Y4fAGAjXkECyGp00bHI5Q7d7lQXTa3fI4orj3SdxWuCk'
      metadata={{
        video_id: 'video-id-54321',
        video_title: 'Test video title',
        viewer_user_id: 'user-id-007',
      }}
    />
  );
}
