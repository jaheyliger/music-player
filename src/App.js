import React, { useState, useRef } from 'react'
import Player from './components/Player'
import Song from './components/Song'
import Library from './components/Library'
import Nav from './components/Nav'
import data from './data'

import './styles/app.scss' 

function App() {

  //Reference
  const audioRef = useRef(null)

  //State
  const [songs, setSongs] = useState(data())
  const [currentSong, setCurrentSong] = useState(songs[0]) //grabs the first song from the array
  const [isPlaying, setIsPlaying] = useState(false)
  const [ songInfo, setSongInfo ] = useState({
    currentTime: 0,
    duration: 0,
})

  const [libraryStatus, setLibraryStatus] = useState(false);

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime
    const duration = e.target.duration
    setSongInfo({
        ...songInfo, 
        currentTime: current,
        duration
    })
  }

  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song currentSong={currentSong} />
      <Player 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying}
        currentSong={currentSong} 
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
      />
      <Library 
        songs={songs} 
        setCurrentSong={setCurrentSong} 
        audioRef={audioRef} 
        isPlaying={isPlaying} 
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      <audio 
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler} 
        ref={audioRef} 
        src={currentSong.audio}
        isPlaying={isPlaying}
      ></audio>
    </div>
  );
}

export default App;
