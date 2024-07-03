const songs = [
  {
    id: 6,
    name: "Death Bed",
    artist: "Powfu",
    img: "https://samplesongs.netlify.app/album-arts/death-bed.jpg",
    genre: "Rock",
    source: "https://samplesongs.netlify.app/Death%20Bed.mp3",
  },
  {
    id: 7,
    name: "Bad Liar",
    artist: "Imagine Dragons",
    img: "https://samplesongs.netlify.app/album-arts/bad-liar.jpg",
    genre: "Classic",
    source: "https://samplesongs.netlify.app/Bad%20Liar.mp3",
  },
  {
    id: 8,
    name: "Faded",
    artist: "Alan Walker",
    img: "https://samplesongs.netlify.app/album-arts/faded.jpg",
    genre: "Rock",
    source: "https://samplesongs.netlify.app/Faded.mp3",
  },
  {
    id: 9,
    name: "Hate Me",
    artist: "Ellie Goulding",
    img: "https://samplesongs.netlify.app/album-arts/hate-me.jpg",
    genre: "Unknown",
    source: "https://samplesongs.netlify.app/Hate%20Me.mp3",
  },
  {
    id: 10,
    name: "Solo",
    artist: "Clean Bandit",
    img: "https://samplesongs.netlify.app/album-arts/solo.jpg",
    genre: "Classic",
    source: "https://samplesongs.netlify.app/Solo.mp3",
  },
  {
    id: 11,
    name: "Without Me",
    artist: "Halsey",
    img: "https://samplesongs.netlify.app/album-arts/without-me.jpg",
    genre: "Classic",
    source: "https://samplesongs.netlify.app/Without%20Me.mp3",
  },
];

let genreList = [];
let allPlaylist = [];
let currentSongList = songs;
let selectedPlayList;
let currentSongPlaying;
let currentPlayListId;

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

//This will update the song list and create a div for each song.
const updateSongList = (songs, element, id = -1) => {
  element.innerHTML = "";
  songs.map((song) => {
    let div = document.createElement("div");

    div.innerText = song.name;
    div.setAttribute("playlist-id", id);
    div.classList.add("song");
    div.addEventListener("click", () => {
      playMusic(song);
      if (allPlaylist[id].list) currentSongList = allPlaylist[id].list;
    });

    element.append(div);
  });
};

//This will filter the all songs using the genre
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

//switch the theme
const changeTheme = () => {
  switchTheme.addEventListener("change", function () {
    if (this.checked) {
      root.style.setProperty("--theme-background", "var(--white)");
      root.style.setProperty("--theme-foreground", "var(--grey)");
      root.style.setProperty("--theme-button", "var(--violet)");
    }
    if (!this.checked) {
      root.style.setProperty("--theme-background", "var(--grey)");
      root.style.setProperty("--theme-foreground", "var(--white)");
      root.style.setProperty("--theme-button", "var(--blue)");
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

//play the selected music
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
        nextSong(currentSongList, song);
      },
      { once: true }
    );
    prevBtn.addEventListener(
      "click",
      () => {
        prevSong(currentSongList, song);
      },
      { once: true }
    );
  }
  currentSongPlaying = song;
};

//Add each song playing to playlist and when click on the song the current list is updated
const addSongsToPlaylist = () => {
  addToPlaylist.addEventListener("click", () => {
    let div = document.createElement("div");

    if (selectedPlayList || selectedPlayList === 0) {
      if (
        allPlaylist[selectedPlayList].list.findIndex(
          (s) => s.id === currentSongPlaying.id
        ) === -1
      ) {
        allPlaylist[selectedPlayList].list.push(currentSongPlaying);

        div.innerText = currentSongPlaying.name;
        div.setAttribute("playlist-id", currentPlayListId);
        div.classList.add("song");
        div.addEventListener("click", () => {
          playMusic(currentSongPlaying);
          currentSongList = allPlaylist[currentPlayListId].list;
        });
        currentPlaylist.append(div);
      }
    }
  });
};

//Creates playlist and update the song list when clicked on the list
const createPlaylist = () => {
  let newPlaylistName = document.getElementById("new-playlist-name").value;
  let div = document.createElement("div");
  let listId = allPlaylist.length;

  div.innerHTML = newPlaylistName;
  div.classList.add("playlist");
  playList.append(div);
  div.setAttribute("playlist-id", listId);
  allPlaylist.push({ name: newPlaylistName, list: [] });
  div.addEventListener("click", () => {
    currentPlayListId = listId;
    updateSongList(
      allPlaylist[listId].list,
      currentPlaylist,
      currentPlayListId
    );
    selectedPlayList = listId;
  });
};

//Create playlist
createPlaylistBtn.addEventListener("click", createPlaylist);

//update the current song list
songList.addEventListener("click", () => {
  currentSongList = songs;
});

(function init() {
  changeTheme();
  updateSongList(songs, songList);
  setGenreList();
  filteredSongs();
  addSongsToPlaylist();
})();