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
    source:
      "https://commondatastorage.googleapis.com/codeskulptor-assets/Evillaugh.ogg",
  },
  {
    id: 3,
    name: "Song Title 3",
    artist: "Artist Name 3",
    img: "img_url_3.jpg",
    genre: "Genre 3",
    source:
      "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3",
  },
  {
    id: 4,
    name: "Song Title 4",
    artist: "Artist Name 4",
    img: "img_url_4.jpg",
    genre: "Genre 2",
    source:
      "https://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/ateapill.ogg",
  },
  {
    id: 5,
    name: "Song Title 5",
    artist: "Artist Name 5",
    img: "img_url_5.jpg",
    genre: "Genre 3",
    source:
      "https://codeskulptor-demos.commondatastorage.googleapis.com/descent/background%20music.mp3",
  },
];

let genreList = [];
const songList = document.getElementById("song-list");
const filterList = document.getElementById("filters");
const switchTheme = document.getElementById("theme");

const updateSongList = (songs) => {
  songList.innerHTML = "";
  songs.map((song) => {
    let div = document.createElement("div");
    let player = document.getElementById("player");

    div.innerText = song.name;
    div.classList.add("song");
    div.addEventListener("click", () => {
      player.src = song.source;
      player.play();
    });

    songList.append(div);
  });
};

const filteredSongs = () => {
  filterList.addEventListener("change", (e) => {
    let filteredSongsList = songs.filter(
      (song) =>
        song.genre.toLocaleLowerCase() == e.target.value.toLocaleLowerCase()
    );

    e.target.value.toLocaleLowerCase() == "all"
      ? updateSongList(songs)
      : updateSongList(filteredSongsList);
  });
};

const setGenreList = () => {
  songs.map((song) => {
    let filter = document.createElement("option");

    if (!genreList.includes(song.genre.toLowerCase())) {
      genreList.push(song.genre.toLowerCase());
      filter.innerText = song.genre;
      filter.setAttribute("value", song.genre.toLowerCase());
      filterList.append(filter);
    }
  });
};

(function init() {
  updateSongList(songs);
  setGenreList();
  filteredSongs();
})();
