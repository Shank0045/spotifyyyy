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


async function getsong() {

  const songFiles = [
    "Dolby Walya - Full Video _ Jaundya Na Balasaheb _ Ajay-Atul _ Girish Kulkarni & Saie Tamhankar.mp3", 
    "Masked Wolf - Astronaut In The Ocean (Official Music Video).mp3"  ,
    "POP SMOKE - DIOR (OFFICIAL VIDEO).mp3",
    "Tokyo Drift - Teriyaki Boyz [ MUSIC VIDEO ] HD.mp3",
    "Ye Tune Kya Kiya - Javed Bashir (Lyrics) _ Lyrical Bam Hindi.mp3", 
    "Kaho Na Kaho (Official Video) Murder _ Emraan Hashmi _ Mallika Sherawat.mp3"  
  ];

  const baseURL = "https://raw.githubusercontent.com/Shank0045/spotifyyyy/main/songs/";

  let sogul = document.querySelector(".addmusic").getElementsByTagName("ul")[0];


  songFiles.forEach((song) => {
    let songName = song.replaceAll("%20", " "); 
    sogul.innerHTML += `
      <li>
        <div class="music"><img class="invert" src="music.svg" alt="music"> music</div>
        <div class="songname">${songName}</div>
      </li>`;
  });


  return songFiles.map((song) => baseURL + song);
}

const playmusic = (track, pause = false) => {

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
  songs = await getsong(); 


  playmusic(songs[0].split("/songs/")[1], true);


  Array.from(document.querySelector(".addmusic").getElementsByTagName("li")).forEach((e) => {
    e.addEventListener("click", () => {
      console.log(e.querySelector(".songname").innerHTML);
      playmusic(e.querySelector(".songname").innerHTML);
    });
  });


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


  currentsong.addEventListener("timeupdate", () => {
    document.querySelector(".songtime").innerHTML = `${convertToMMSS(
      currentsong.currentTime
    )}/${convertToMMSS(currentsong.duration)}`;

    document.querySelector(".circle").style.left =
      (currentsong.currentTime / currentsong.duration) * 100 + "%";
  });


  document.querySelector(".seekbar").addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentsong.currentTime = (currentsong.duration * percent) / 100;
  });

 
  document.querySelector(".playlist").addEventListener("click", () => {
    document.querySelector(".lmain").style.left = 0 + "%";
  });

  document.querySelector(".wrong").addEventListener("click", () => {
    document.querySelector(".lmain").style.left = -100 + "%";
  });


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
