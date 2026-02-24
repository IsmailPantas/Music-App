import React, { useRef, useEffect } from "react";
import Video from "react-native-video";
import { useSelector, useDispatch } from "react-redux";
import { setDuration, playRandomSong } from "../../store/slices/playerSlice";



// Henüz geçiş yapılmadı

const GlobalAudioPlayer = () => {
    const videoRef = useRef(null);
    const dispatch = useDispatch();
    
    const { currentSong, isPlaying, seekTime, isShuffle, offlineSongs } = useSelector((state) => state.player);

    useEffect(() => {
        if (videoRef.current && seekTime !== undefined && currentSong) {
            videoRef.current.seek(seekTime);
        }
    }, [seekTime]);

    if (!currentSong) return null;

    const getSource = () => {
        const offlineData = offlineSongs[currentSong.id];
        const path = typeof offlineData === 'object' ? offlineData.offlinePath : offlineData;
        const uri = (path && typeof path === 'string') ? path : currentSong.preview;
        return uri ? { uri } : null;
    };

    const source = getSource();

    return (
        <Video
            ref={videoRef}
            source={source}
            paused={!isPlaying}
            repeat={false}
            style={{ width: 0, height: 0, position: 'absolute' }}
            playInBackground={true}
            audioOnly={true}
            onLoad={(data) => dispatch(setDuration(data.duration))}
            onEnd={() => {
                if (isShuffle) {
                    dispatch(playRandomSong()); 
                    
                }
            }}
            onError={(e) => console.log("Ses Motoru Hatası:", e)}
        />
    );
};

export default GlobalAudioPlayer;