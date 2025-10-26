import { Mic, MicOff, Video, VideoOff } from 'lucide-react';
import { useAppSelector } from '@/app/hooks';
import { useMediaStream } from '@/shared/hooks/useMediaStream';
import { useVideoActions } from '@/shared/hooks/useSocket';

const VideoPreview = () => {
  const { localStream, audioEnabled, videoEnabled } = useAppSelector((state) => state.webrtc);
  const videoRef = useMediaStream(localStream);
  const { toggleAudio, toggleVideo } = useVideoActions();

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-white text-lg font-bold mb-4">Video Preview</h3>
      
      <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        {!videoEnabled && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <VideoOff className="w-12 h-12 text-gray-600" />
          </div>
        )}
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => toggleAudio()}
          className={`flex-1 py-3 rounded-lg font-medium transition ${
            audioEnabled
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-red-500 text-white hover:bg-red-600'
          }`}
        >
          {audioEnabled ? <Mic className="w-5 h-5 mx-auto" /> : <MicOff className="w-5 h-5 mx-auto" />}
        </button>

        <button
          onClick={() => toggleVideo()}
          className={`flex-1 py-3 rounded-lg font-medium transition ${
            videoEnabled
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-red-500 text-white hover:bg-red-600'
          }`}
        >
          {videoEnabled ? <Video className="w-5 h-5 mx-auto" /> : <VideoOff className="w-5 h-5 mx-auto" />}
        </button>
      </div>
    </div>
  );
};

export default VideoPreview;