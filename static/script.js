var isPlaying = false;
  var volumeControl = document.getElementById("volume");
  var playPauseButton = document.getElementById('play-pause');
  var audio = document.getElementById("audio");
  var trackTitle = document.getElementById('track-title');
  var trackArtist = document.getElementById('track-artist');
  var trackAlbum = document.getElementById('track-album');
  var coverArt = document.getElementById('cover-art');
  var songIndex = 0;
  var tracks = [
    {
        file: '/static/audio/1.mp3',
        title: 'On My Way',
        artist: 'Alan Walker',
        album: 'Album 1',
        cover: '/static/images/1.jpg'
    },
    {
        file: '/static/audio/2.mp3',
        title: 'Faded',
        artist: 'Alan Walker',
        album: 'Album 2',
        cover: '/static/images/2.jpg'
    },
    {
      file: '/static/audio/3.mp3',
      title: 'On and On',
      artist: 'Cartoon feat. Daniel Levi',
      album: 'Album 3',
      cover: '/static/images/3.jpg'
    },
    {
      file: '/static/audio/11.mp3',
      title: 'Lagdi Lahore Di',
      artist: 'Guru Randhawa',
      album: 'Album 4',
      cover: '/static/images/11.jpg'
    },
    {
      file: '/static/audio/9.mp3',
      title: 'Dilbar',
      artist: 'Dhvani Bhanushali, Ikka Singh, and Neha Kakkar',
      album: 'Album 5',
      cover: '/static/images/9.jpg'
    }
    // Add more tracks as needed
];

// Rest of your existing script...

// Function to play a track
function playTrack(file) {
    audio.src = file;
    audio.play();
    isPlaying = true;
    playPauseButton.textContent = 'Pause';
    updateTrackInfo(file);
}

  //for smooth scroll down
document.querySelectorAll('a[href^="#"]').forEach(anchor =>{
  anchor.addEventListener("click",function (e){
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior:"smooth"
    });
  });
});

// play pause
function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
        playPauseButton.textContent = 'Play';
    } else {
        audio.play();
        playPauseButton.textContent = 'Pause';
    }
    isPlaying = !isPlaying;
}


// change speed
function changeSpeed()
{
  var speed = document.getElementById("speed");
  var selectedSpeed= speed.value;
  if(selectedSpeed=="1")
  {
    audio.playbackRate=1;
  }
  else if(selectedSpeed=="1.5")
  {
    audio.playbackRate=1.5;
  }
  else if(selectedSpeed=="2")
  {
    audio.playbackRate=2;
  }
}

//change volume
function setVolume()
{
  audio.volume = volumeControl.value;
}

// repeat
function toggleRepeat()
{
  var time_slider = document.getElementById("time-slider");
  time_slider.value="0";
  seekTrack();
}
// Function to skip to the previous track

function skipPrevious() {
  songIndex --;
  // var currentIndex = tracks.findIndex(track => track.file === audio.src);
  // var previousIndex = (currentIndex - 1 + tracks.length) % tracks.length;
  if(songIndex<0)
  {
    songIndex = tracks.length-1;
  }
  playTrack(tracks[songIndex].file);
}

// Function to skip to the next track
function skipNext() {
  songIndex ++;
  // var currentIndex = tracks.findIndex(track => track.file === audio.src);
  // var previousIndex = (currentIndex - 1 + tracks.length) % tracks.length;
  if(songIndex>tracks.length - 1)
  {
    songIndex = 0;
  }
  playTrack(tracks[songIndex].file);
}

// shuffle
function toggleShuffle() {
  song = tracks[(Math.floor(Math.random() * tracks.length))];
  var time_slider = document.getElementById("time-slider");
  time_slider.value=0;
  audio.src= song.file;
  audio.play();
  isPlaying = true;
  playPauseButton.textContent = 'Pause';
  updateTrackInfo(song.file);
}


//time slider
function seekTrack()
{//changed time-slider input value too
  var time_slider = document.getElementById("time-slider");
  // var time_slider = document.getElementById("time-slider");
    var seekToTime = audio.duration * (time_slider.value / 100);
    audio.currentTime = seekToTime
}

audio.addEventListener('timeupdate', function() {
    updateSlider();
  });
  function updateCurrentTime() {
    var current_time = document.getElementById("current-time");
    var minutes = Math.floor(audio.currentTime / 60);
    var seconds = Math.floor(audio.currentTime % 60);
    current_time.textContent = minutes + ':' + (seconds < 10 ? '0' : '') + seconds + '   Set Track';
  }
  function updateSlider() {
    var time_slider = document.getElementById("time-slider");
    var currentPercentage = (audio.currentTime / audio.duration) * 100;
    time_slider.value = currentPercentage;
    updateCurrentTime();
  }


  //new tracks 
  function updateTrackInfo(file) {
    var selectedTrack = tracks.find(track => track.file === file);
    trackTitle.textContent = selectedTrack.title;
    trackArtist.textContent = selectedTrack.artist;
    trackAlbum.textContent = selectedTrack.album;
    coverArt.src = selectedTrack.cover;
    songIndex = tracks.indexOf(selectedTrack);
  }

    function addTrack() {
        const playlist = document.getElementById('playlist');
        const newTrack = document.createElement('li');
        newTrack.className = 'track';
        newTrack.textContent = 'New track added Successfully!';
        playlist.appendChild(newTrack);
    }

    function removeTrack() {
        const playlist = document.getElementById('playlist');
        const tracks = playlist.getElementsByClassName('track');
        
        if (tracks.length > 0) {
            // Remove the last track
            playlist.removeChild(tracks[tracks.length - 1]);
        }
    }

