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
  {
    id: 6,
    name: "Death Bed",
    artist: "Powfu",
    img: "https://samplesongs.netlify.app/album-arts/death-bed.jpg",
    genre: "Unknown", // Genre not provided in the original data
    source: "https://samplesongs.netlify.app/Death%20Bed.mp3",
  },
  {
    id: 7,
    name: "Bad Liar",
    artist: "Imagine Dragons",
    img: "https://samplesongs.netlify.app/album-arts/bad-liar.jpg",
    genre: "Unknown", // Genre not provided in the original data
    source: "https://samplesongs.netlify.app/Bad%20Liar.mp3",
  },
  {
    id: 8,
    name: "Faded",
    artist: "Alan Walker",
    img: "https://samplesongs.netlify.app/album-arts/faded.jpg",
    genre: "Unknown", // Genre not provided in the original data
    source: "https://samplesongs.netlify.app/Faded.mp3",
  },
  {
    id: 9,
    name: "Hate Me",
    artist: "Ellie Goulding",
    img: "https://samplesongs.netlify.app/album-arts/hate-me.jpg",
    genre: "Unknown", // Genre not provided in the original data
    source: "https://samplesongs.netlify.app/Hate%20Me.mp3",
  },
  {
    id: 10,
    name: "Solo",
    artist: "Clean Bandit",
    img: "https://samplesongs.netlify.app/album-arts/solo.jpg",
    genre: "Unknown", // Genre not provided in the original data
    source: "https://samplesongs.netlify.app/Solo.mp3",
  },
  {
    id: 11,
    name: "Without Me",
    artist: "Halsey",
    img: "https://samplesongs.netlify.app/album-arts/without-me.jpg",
    genre: "Unknown", // Genre not provided in the original data
    source: "https://samplesongs.netlify.app/Without%20Me.mp3",
  },
];

let genreList = [];
let allPlaylist = [];
let currentSongList;
let selectedPlayList;
let currentSongPlaying;

const songList = document.getElementById("song-list");
const playList = document.getElementById("all-playlist");
const currentPlaylist = document.getElementById("current-playlist");
const filterList = document.getElementById("filters");
const switchTheme = document.getElementById("theme-switch");
const albumImage = document.getElementById("album-image");
const root = document.querySelector(":root");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const createPlaylistBtn = document.getElementById("create-playlist");
const addToPlaylist = document.getElementById("add-to-playlist");

const updateSongList = (songs, elementUpdated) => {
  elementUpdated.innerHTML = "";
  songs.map((song) => {
    let div = document.createElement("div");

    div.innerText = song.name;
    div.classList.add("song");
    div.addEventListener("click", () => {
      playMusic(song);
    });

    elementUpdated.append(div);
  });
};

const filteredSongs = () => {
  filterList.addEventListener("change", (e) => {
    let filteredSongsList = songs.filter(
      (song) =>
        song.genre.toLocaleLowerCase() == e.target.value.toLocaleLowerCase()
    );

    e.target.value.toLocaleLowerCase() == "all"
      ? updateSongList(songs, songList)
      : updateSongList(filteredSongsList, songList);
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

const changeTheme = () => {
  switchTheme.addEventListener("change", function () {
    if (this.checked) {
      root.style.setProperty("--theme-background", "var(--white)");
      root.style.setProperty("--theme-foreground", "var(--grey)");
    }
    if (!this.checked) {
      root.style.setProperty("--theme-background", "var(--grey)");
      root.style.setProperty("--theme-foreground", "var(--white)");
    }
  });
};

const nextSong = (songs, currentSong) => {
  let songIndex = songs.findIndex((song) => song.id === currentSong.id);

  if (songs[songs.length - 1].id === currentSong.id) playMusic(songs[0]);
  else playMusic(songs[songIndex + 1]);
};

const prevSong = (songs, currentSong) => {
  let songIndex = songs.findIndex((song) => song.id === currentSong.id);

  if (songs[0].id === currentSong.id) playMusic(songs[songs.length - 1]);
  else playMusic(songs[songIndex - 1]);
};

const playMusic = (song) => {
  let player = document.getElementById("player");
  player.src = song.source;
  albumImage.setAttribute("src", song.img);

  player.pause();
  player.play();

  if (song) {
    nextBtn.addEventListener(
      "click",
      () => {
        nextSong(songs, song);
      },
      { once: true }
    );
    prevBtn.addEventListener(
      "click",
      () => {
        prevSong(songs, song);
      },
      { once: true }
    );
  }
  currentSongPlaying = song;
};

const addSongsToPlaylist = () => {
  addToPlaylist.addEventListener("click", () => {
    let div = document.createElement("div");
    // && allPlaylist[selectedPlayList].list.findIndex(s => s.id === song.id) === -1
    if (selectedPlayList || selectedPlayList === 0) {

      if(allPlaylist[selectedPlayList].list.findIndex(s => s.id === currentSongPlaying.id) === -1){
        allPlaylist[selectedPlayList].list.push(currentSongPlaying);

        div.innerText = currentSongPlaying.name;
        div.classList.add("song");
        div.addEventListener("click", () => {
          playMusic(currentSongPlaying);
        });
        currentPlaylist.append(div);
        console.log(allPlaylist[selectedPlayList].list.findIndex(s => s.id === currentSongPlaying.id));
        console.log(allPlaylist[selectedPlayList].list);
      }
      
    }
  });
};

const cratePlaylist = () => {
  let newPlaylistName = document.getElementById("new-playlist-name").value;
  let div = document.createElement("div");
  let listId = allPlaylist.length;

  div.innerHTML = newPlaylistName;
  div.classList.add("playlist");
  playList.append(div);
  div.setAttribute("playlist-id", listId);
  allPlaylist.push({ name: newPlaylistName, list: [] });
  div.addEventListener("click", () => {
    updateSongList(allPlaylist[listId].list, currentPlaylist);
    selectedPlayList = listId;
  });
};

createPlaylistBtn.addEventListener("click", cratePlaylist);

(function init() {
  changeTheme();
  updateSongList(songs, songList);
  setGenreList();
  filteredSongs();
  addSongsToPlaylist();
})();
