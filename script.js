var audio = document.getElementById('player');
var playPauseButton = document.getElementById('play-pause');
var volumeControl = document.getElementById('volume');
var timeSlider = document.getElementById('time-slider');
var currentTimeLabel = document.getElementById('current-time');
var totalTimeLabel = document.getElementById('total-time');
var trackInfo = document.getElementById('track-info');
var trackTitle = document.getElementById('track-title');
var trackArtist = document.getElementById('track-artist');
var trackAlbum = document.getElementById('track-album');
var coverArt = document.getElementById('cover-art');
var playlist = document.getElementById('playlist');
var speedSelect = document.getElementById('speed');
var repeatButton = document.getElementById('repeat');
var shuffleButton = document.getElementById('shuffle');

var isPlaying = false;
var currentTrack = 0;
var repeat = false;
var shuffle = false;

var tracks = [
    { title: 'Track 1', artist: 'Artist 1', album: 'Album 1', cover: 'cover1.jpg', file: 'track1.mp3' },
    { title: 'Track 2', artist: 'Artist 2', album: 'Album 2', cover: 'cover2.jpg', file: 'track2.mp3' },
    // Add more tracks as needed
];

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

function playTrack(file) {
    audio.src = file;
    audio.play();
    isPlaying = true;
    playPauseButton.textContent = 'Pause';
    updateTrackInfo(file);
}

function updateTrackInfo(file) {
    var selectedTrack = tracks.find(track => track.file === file);
    trackTitle.textContent = selectedTrack.title;
    trackArtist.textContent = selectedTrack.artist;
    trackAlbum.textContent = selectedTrack.album;
    coverArt.src = selectedTrack.cover;
}

function skipTrack(direction) {
    if (shuffle) {
        currentTrack = Math.floor(Math.random() * tracks.length);
    } else {
        currentTrack = (currentTrack + direction + tracks.length) % tracks.length;
    }
    playTrack(tracks[currentTrack].file);
}

function setVolume() {
    audio.volume = volumeControl.value;
}

function seekTrack() {
    audio.currentTime = timeSlider.value;
    updateTimeLabels();
}

function updateTimeLabels() {
    currentTimeLabel.textContent = formatTime(audio.currentTime);
    totalTimeLabel.textContent = formatTime(audio.duration);
    timeSlider.value = audio.currentTime;
}

function formatTime(time) {
    var minutes = Math.floor(time / 60);
}