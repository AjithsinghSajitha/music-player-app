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
const songName = document.getElementById("song-name");
const artistName = document.getElementById("artist-name");
const searchSongInput = document.getElementById("search-song");
const playlistSearchInput = document.getElementById("playlist-search");
const allPlaylistElements = document.getElementsByClassName("playlist");


//Create song element
const createSongElement = (song, div, id) => {
  div.innerText = `${song.name} - ${song.artist}`;
  div.setAttribute("playlist-id", id);
  div.classList.add("song");
  div.addEventListener("click", () => {
    renderCurrentSong(song);
    if (allPlaylist[id]) currentSongList = allPlaylist[id].list;
  });
  return div;
};

//This will update the song list and create a div for each song.
const updateSongList = (songs, element, id = -1, isPlaylist = false) => {
  element.innerHTML = "";
  songs.map((song, index) => {
    let div = document.createElement("div");
    let removeIcon = document.createElement("span");
    let result;

    result = createSongElement(song, div, id);
    if ((selectedPlayList || selectedPlayList === 0)&& isPlaylist) {
      removeIcon.innerHTML = `<i class="fa-solid fa-trash" song-id="${index}"></i>`;
      removeIcon.addEventListener("click", (e) => {
        allPlaylist[selectedPlayList].list.splice(index, 1);
        e.stopPropagation();
        updateSongList(
          allPlaylist[selectedPlayList].list,
          currentPlaylist,
          currentPlayListId, 
          true
        );
      });
      result.append(removeIcon);
    }

    element.append(result);
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
//This will search songs based on the input
const searchSongs = () => {
  searchSongInput.addEventListener("input", (e) => {
    let filteredSongsList = songs.filter((song) =>
      song.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    e.target.value.toLowerCase() == ""
      ? updateSongList(songs, songList)
      : updateSongList(filteredSongsList, songList);
  });
};

//Song list
const showSongs = () => {
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
const toggleTheme = () => {
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

//next song
const nextSong = (songs, currentSong) => {
  let songIndex = songs.findIndex((song) => song.id === currentSong.id);

  if (songs && songs[songs.length - 1].id === currentSong.id)
    renderCurrentSong(songs[0]);
  else if (songs) renderCurrentSong(songs[songIndex + 1]);
};

//previous song
const prevSong = (songs, currentSong) => {
  let songIndex = songs.findIndex((song) => song.id === currentSong.id);

  if (songs && songs[0].id === currentSong.id)
    renderCurrentSong(songs[songs.length - 1]);
  else if (songs) renderCurrentSong(songs[songIndex - 1]);
};

//play the selected music
const renderCurrentSong = (song) => {
  let player = document.getElementById("player");
  player.src = song.source;
  albumImage.setAttribute("src", song.img);
  songName.innerText = song.name;
  artistName.innerText = song.artist;

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
    let removeIcon = document.createElement("span");
    let result;
    let index = allPlaylist[selectedPlayList].list.length;

    removeIcon.innerHTML = `<i class="fa-solid fa-trash" song-id="${index}"></i>`;
    removeIcon.addEventListener("click", (e) => {
      allPlaylist[selectedPlayList].list.splice(index, 1);
      e.stopPropagation();
      updateSongList(
        allPlaylist[selectedPlayList].list,
        currentPlaylist,
        currentPlayListId,
        true
      );
    });

    if (selectedPlayList || selectedPlayList === 0) {
      if (
        allPlaylist[selectedPlayList].list.findIndex(
          (s) => s.id === currentSongPlaying.id
        ) === -1
      ) {
        allPlaylist[selectedPlayList].list.push(currentSongPlaying);
        result = createSongElement(currentSongPlaying, div, currentPlayListId);
        result.append(removeIcon);
        currentPlaylist.append(result);

        let removeAction = document.querySelector(
          `[song-id = '${currentSongPlaying.id}']`
        );
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
    selectedPlayList = listId;
    updateSongList(
      allPlaylist[listId].list,
      currentPlaylist,
      currentPlayListId,
      true
    );
  });
};

//Search playlist
const searchPlaylist = () => {
  playlistSearchInput.addEventListener("input", (e) => {
    for (var item of allPlaylistElements) {
      if (
        item.innerText
          .toLocaleLowerCase()
          .includes(e.target.value.toLocaleLowerCase())
      ) {
        item.classList.remove("hide");
      } else {
        item.classList.add("hide");
      }
    }
  });
};

//Create playlist
createPlaylistBtn.addEventListener("click", () => {
  createPlaylist();
  document.getElementById("new-playlist-name").value = "";
});

//update the current song list
songList.addEventListener("click", () => {
  currentSongList = songs;
});

(function init() {
  toggleTheme();
  updateSongList(songs, songList);
  showSongs();
  filteredSongs();
  addSongsToPlaylist();
  searchSongs();
  searchPlaylist();
})();
