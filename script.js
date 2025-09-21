// Albums data
const albums = [
  {
    name: "Chill Beats",
    cover: "images/chill.jpg",
    songs: [
      { title: "Smooth Vibes", src: "songs/smooth.mp3" },
      { title: "Evening Flow", src: "songs/evening.mp3" },
      { title: "Soft Breeze", src: "songs/soft.mp3" }
    ]
  },
  {
    name: "Workout Hits",
    cover: "images/workout.jpg",
    songs: [
      { title: "Pump It Up", src: "songs/pump.mp3" },
      { title: "Run Faster", src: "songs/run.mp3" },
      { title: "Beast Mode", src: "songs/beast.mp3" }
    ]
  }
];

// If on index.html
if (document.getElementById('album-container')) {
  fetch('albums.json')
    .then(res => res.json())
    .then(albums => {
      const albumContainer = document.getElementById('album-container');

      albums.forEach((album, index) => {
        const div = document.createElement('div');
        div.className = "album-card";
        div.innerHTML = `
          <img src="${album.cover}" alt="${album.name}">
          <h3>${album.name}</h3>
        `;
        div.onclick = () => {
          localStorage.setItem('selectedAlbum', JSON.stringify(album));
          window.location.href = 'album.html';
        };
        albumContainer.appendChild(div);
      });
    });
}

// If on album.html
if (document.getElementById('album-name')) {
  const album = JSON.parse(localStorage.getItem('selectedAlbum'));

  document.getElementById('album-cover').src = album.cover;
  document.getElementById('album-name').textContent = album.name;

  const songList = document.getElementById('song-list');
  const audioPlayer = document.getElementById('audio-player');

  album.songs.forEach(song => {
    const div = document.createElement('div');
    div.className = "song-item";
    div.textContent = song.title;
    div.onclick = () => {
      audioPlayer.src = song.src;
      audioPlayer.play();
    };
    songList.appendChild(div);
  });
}
