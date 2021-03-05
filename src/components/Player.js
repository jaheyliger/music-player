import React, { useEffect } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlay, faAngleLeft, faAngleRight, faPause, } from '@fortawesome/free-solid-svg-icons'
import {playAudio} from '../util'

const Player = ({currentSong,setSongs, isPlaying, setIsPlaying, audioRef, songInfo, setSongInfo, songs, setCurrentSong}) => {

    //useEffect
    useEffect(() => {
        const newSongs = songs.map((song) => {
            if (song.id === currentSong.id){//song.id is the state we click on and id is the song's id
                return{
                    ...song, //keep all other properties the same
                    active: true, //change the active property to true
                };
            }else{
                return{
                    ...song,
                    active: false,
                };
            }
        });
        setSongs(newSongs);
    }, [currentSong])

    //Event Handler
    const playSongHandler = () => {
        if(isPlaying){
            audioRef.current.pause();
            setIsPlaying(!isPlaying);//change to the oposite state
        }else{
            setIsPlaying(!isPlaying);//change to the oposite state
        }
    }

    const formatTime = (time) => {
        return(
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value
        setSongInfo({
            ...songInfo,
            currentTime: e.target.value
        })
    }

    const skipTrackHandler = (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if(direction === 'skip-forward'){
            setCurrentSong(songs[(currentIndex + 1)% songs.length])
        }
        if(direction === "skip-back"){
            if((currentIndex - 1) % songs.length === -1){
                setCurrentSong(songs[songs.length-1])
                playAudio(isPlaying, audioRef);
                return
            }
            setCurrentSong(songs[(currentIndex - 1)% songs.length])
        }
        playAudio(isPlaying, audioRef);
    }

    return(
        <div className="player">
            <div className="time-control">
                <p>{songInfo.duration ? formatTime(songInfo.currentTime) : "0:00"}</p>
                <input 
                    min={0} 
                    max={songInfo.duration || 0} 
                    value={songInfo.currentTime}
                    onChange={dragHandler} 
                    type="range"
                />
                <p>{formatTime(songInfo.duration)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={ () => skipTrackHandler('skip-back')} className="skip-back" size="2x" icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeIcon onClick={ () => skipTrackHandler('skip-forward')} className="skip-forward" size="2x" icon={faAngleRight} />
            </div>
        </div>
    )
}

export default Player;