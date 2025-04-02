let currentsong = new Audio();

let songs;
let currentSongIndex = 0;

currentsong.volume = 0.01;

function convertToMMSS(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  const formattedSeconds =
    remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;

  return `${formattedMinutes}:${formattedSeconds}`;
}

// Update the getsong function
async function getsong() {
  // Manually list the songs in your 'songs' folder here, or automate it via GitHub API (this is a simplified version)
  const songFiles = [
    "Dolby Walya - Full Video _ Jaundya Na Balasaheb _ Ajay-Atul _ Girish Kulkarni & Saie Tamhankar.mp3", 
    "Dr.Vishnuvardhan Hits _ Kannada Songs _ Elu Shiva Elu Shiva Song and more _ Hallunda Thavaru Movie.mp3", 
    "Kaho Na Kaho (Official Video) Murder _ Emraan Hashmi _ Mallika Sherawat.mp3"  
  ];

  const baseURL = "https://raw.githubusercontent.com/Shank0045/spotifyyyy/main/songs/";

  let sogul = document.querySelector(".addmusic").getElementsByTagName("ul")[0];

  // Loop through song files and add them to the list
  songFiles.forEach((song) => {
    let songName = song.replaceAll("%20", " "); // To handle spaces in file names
    sogul.innerHTML += `
      <li>
        <div class="music"><img class="invert" src="music.svg" alt="music"> music</div>
        <div class="songname">${songName}</div>
      </li>`;
  });

  // Return the full URLs of the songs
  return songFiles.map((song) => baseURL + song);
}

const playmusic = (track, pause = false) => {
  // Play the song from the GitHub raw URL
  currentsong.src = "https://raw.githubusercontent.com/Shank0045/spotifyyyy/main/songs/" + track;
  console.log(track);

  if (!pause) {
    currentsong.play();
    play.src = "pause.svg";
  }

  document.querySelector(".scoverd").innerHTML = `<p>${decodeURI(track)}</p>`;
  document.querySelector(".songtime").innerHTML = "00:00/00:00";
};

async function main() {
  songs = await getsong(); // Fetch the song list

  // Play the first song initially
  playmusic(songs[0].split("/songs/")[1], true);

  // Set up click events for each song in the list
  Array.from(document.querySelector(".addmusic").getElementsByTagName("li")).forEach((e) => {
    e.addEventListener("click", () => {
      console.log(e.querySelector(".songname").innerHTML);
      playmusic(e.querySelector(".songname").innerHTML);
    });
  });

  // Set up the play/pause button
  play.addEventListener("click", () => {
    if (currentsong.paused) {
      currentsong.play();
      play.src = "pause.svg";
    } else {
      currentsong.pause();
      play.src = "play.svg";
    }

    vol.addEventListener("change", (e) => {
      currentsong.volume = parseInt(e.target.value) / 100;
    });
  });

  // Update song time and position in the progress bar
  currentsong.addEventListener("timeupdate", () => {
    document.querySelector(".songtime").innerHTML = `${convertToMMSS(
      currentsong.currentTime
    )}/${convertToMMSS(currentsong.duration)}`;

    document.querySelector(".circle").style.left =
      (currentsong.currentTime / currentsong.duration) * 100 + "%";
  });

  // Seekbar functionality
  document.querySelector(".seekbar").addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentsong.currentTime = (currentsong.duration * percent) / 100;
  });

  // Playlist slide-in/out
  document.querySelector(".playlist").addEventListener("click", () => {
    document.querySelector(".lmain").style.left = 0 + "%";
  });

  document.querySelector(".wrong").addEventListener("click", () => {
    document.querySelector(".lmain").style.left = -100 + "%";
  });

  // Next/Previous buttons functionality
  document.getElementById("next").addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playmusic(songs[currentSongIndex].split("/songs/")[1]);
  });

  document.getElementById("previous").addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playmusic(songs[currentSongIndex].split("/songs/")[1]);
  });

  vol.addEventListener("change", (e) => {
    currentsong.volume = parseInt(e.target.value) / 100;
  });
}

main();
