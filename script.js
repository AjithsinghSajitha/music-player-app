const songs = [
  {
    id: 1,
    name: "Song Title 1",
    artist: "Artist Name 1",
    img: "./music/horse.ogv",
    genre: "Genre 1",
    source: "./music/horse.ogv",
  },
  {
    id: 2,
    name: "Song Title 2",
    artist: "Artist Name 2",
    img: "img_url_2.jpg",
    genre: "Genre 2",
    source: "source_url_2.mp3",
  },
  {
    id: 3,
    name: "Song Title 3",
    artist: "Artist Name 3",
    img: "img_url_3.jpg",
    genre: "Genre 3",
    source: "source_url_3.mp3",
  },
  {
    id: 4,
    name: "Song Title 4",
    artist: "Artist Name 4",
    img: "img_url_4.jpg",
    genre: "Genre 4",
    source: "source_url_4.mp3",
  },
  {
    id: 5,
    name: "Song Title 5",
    artist: "Artist Name 5",
    img: "img_url_5.jpg",
    genre: "Genre 5",
    source: "source_url_5.mp3",
  },
];

const songList = document.getElementById("song-list");
const filterList = document.getElementById("filters");


const updateSongList = () =>{
    songs.map((song)=>{
        let div = document.createElement('div');
        let filter = document.createElement('option');
        let player = document.getElementById('player');

        filter.innerText = song.genre;
        filter.setAttribute('value', song.genre.toLowerCase());
        filterList.append(filter);

        div.innerText = song.name;
        div.classList.add('song');
        div.addEventListener('click',()=>{
            player.src = song.source;
        })

        songList.append(div);
    });
    
}

(function init() {
    updateSongList();
})();
