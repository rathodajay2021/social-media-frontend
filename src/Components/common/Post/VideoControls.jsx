import React from 'react';
import { Box, IconButton, Slider, Typography } from '@mui/material';

//ICONS
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

import { VideoPlayerControlsWrapper } from './Post.style';

const VideoControls = React.forwardRef(
    (
        {
            videoPlay,
            setVideoPlay,
            duration,
            elapsedTime,
            videoLengthInSeconds,
            elapsedTimeInSeconds,
            setElapsedTimeInSeconds
        },
        ref
    ) => {
        return (
            <VideoPlayerControlsWrapper className="flex f-column">
                <Box className="player-controls flex f-h-space-between">
                    <Box className="pause-play flex f-v-center">
                        {!videoPlay ? (
                            <IconButton className="icon-style" onClick={() => setVideoPlay(true)}>
                                <PlayArrowIcon />
                            </IconButton>
                        ) : (
                            <IconButton className="icon-style" onClick={() => setVideoPlay(false)}>
                                <PauseIcon />
                            </IconButton>
                        )}
                        <Box className="video-time flex">
                            <Typography>{elapsedTime}</Typography>
                            <Typography>/</Typography>
                            <Typography>{duration}</Typography>
                        </Box>
                    </Box>
                    <Box className="other-controls">
                        <Typography onClick={() => ref?.current?.requestFullscreen()}>full screen</Typography>
                    </Box>
                </Box>
                <Box className="progress-bar">
                    <Slider
                        value={elapsedTimeInSeconds}
                        max={videoLengthInSeconds}
                        onChange={(e, value) => {
                            ref?.current && ref.current.seekTo(value, 'seconds');
                            setElapsedTimeInSeconds(value);
                        }}
                        classes={{
                            root: 'slider-root',
                            thumb: 'slider-thumb',
                            track: 'slider-track'
                        }}
                    />
                </Box>
            </VideoPlayerControlsWrapper>
        );
    }
);

export default VideoControls;
