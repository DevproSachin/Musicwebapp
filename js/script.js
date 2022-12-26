const music = document.querySelector ("audio");
const play = document.getElementById("play");
const img = document.querySelector("img");
const artist = document.getElementById("artist");
const title = document.getElementById("title");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
let myprogressBar =  document.getElementById("myprogressBar");
let total_current_time = document.getElementById("current_time");
let total_duration = document.getElementById("duration");
let volume_bar = document.getElementById("volume-bar");
const mutes = document.getElementById("mute");
let Mvolume = document.getElementById("volumeslider");
const songs = [
   {
     name: "1",
     title: "oh oh jane jana",
     artist: "kamaL Khan", 
     cover:"janejana", 
   },
   {
    name: "2",
    title: "Khanabadosh",
    artist: "Akhil", 
    cover:"khanabdosh",    
  },
  {
    name: "3",
    title: "Kesariya",
    artist: "Brahmashtra",
    cover:"Brahmastra",    
  },
  {
    name: "4",
    title: "Saami-Saami",
    artist: "Pushpa-the Rise",  
    cover:"saami",     
  },
  {
    name: "5",
    title: "Meri jindagi hai tu",
    artist: "satyamev jayate",  
    cover:"satyamev",     
  },
  {
    name: "srivali",
    title: "Srivali",
    artist: "pushpa the rise",  
    cover:"srivali",     
  },
  {
    name: "white",
    title: "White Brown Black",
    artist: "Karan Aujla Avvy Sra",  
    cover:"white",     
  },

];
let isPlaying = false;
//for play functionality
const playMusic = ()=>{
    isPlaying = true;
    music.play();
    play.classList.replace("fa-play", "fa-pause");
    img.classList.add("anime");
};
//for pause functionality 
const pauseMusic= ()=>{
    isPlaying = false;
    music.pause();
    play.classList.replace("fa-pause", "fa-play");
    img.classList.remove("anime");
};

play.addEventListener('click',() =>{
    //   if(isPlaying){
    //     pauseMusic();
    //   }else{
    //     playMusic();
    //   }
      isPlaying ? pauseMusic() : playMusic();
});

// mutes.addEventListener ('click', ()=> {
//   if(music.muted) {
//     music.muted=false;
//   }  
//   else{
//     music.muted=true;
//   }
// },false);
mutes.addEventListener ('click', ()=> {
  if(music.muted == false) {
    music.muted= true;
    mute.classList.remove("fa-volume-xmark");
    mute.classList.add ( "fa-music");
    document.getElementById("volumeslider").style.display="none";
    
    
  }  
  else{
    music.muted=false;
    mute.classList.add("fa-volume-xmark");
    mute.classList.remove ( "fa-music");
    document.getElementById("volumeslider").style.display="inline-block";
  }
});

//volume slider functionality
Mvolume.addEventListener('mousemove',()=>{
    music.volume= volumeslider.value/100;
});
//changing the music data 
const loadSong = (songs) =>{
    title.innerText = songs.title;
    artist.innerText = songs.artist;
    music.src = "music/" + songs.name + ".mp3";
     img.src = "assets/" +songs.cover + ".jpg";
}

songIndex = 0;

// loadSong(songs);

const nextSong = () => {
    // songIndex++;
    //Remember this formula calculations
    songIndex = (songIndex + 1) % songs.length
    loadSong(songs[songIndex]);
    music.play();
    play.classList.replace("fa-play", "fa-pause");
};
const prevSong = () => {
  // songIndex++;
  //Remember this formula calculations
  songIndex = (songIndex - 1 + songs.length) % songs.length
  loadSong(songs[songIndex]);
  music.play();
  play.classList.replace("fa-play", "fa-pause");
};

//listen to timeupdate event for progressbar code from harry

music.addEventListener('timeupdate', () =>{
  //update progressbar dynamically using calculations
  progress = parseInt( (music.currentTime/music.duration)*100);
  myprogressBar.value = progress;
 // console.log('timeupdate');
 //console.log(duration);
 let min_duration = Math.floor(music.duration / 60);
 let sec_duration = Math.floor(music.duration % 60);
   tot_duration = `${min_duration} : ${sec_duration}`;
   if(music.duration){
   total_duration.textContent = `${tot_duration}`;
  }
   //current Time Update
   let min_current = Math.floor(music.currentTime/ 60);
   let sec_current = Math.floor(music.currentTime % 60);
   if(sec_current < 10){
    sec_current = `0 ${sec_current}`;
   }
     tot_currentTime = `${min_current} : ${sec_current}`;
     total_current_time.textContent = `${tot_currentTime}`;
});
 //change progress with click on progress dynamically moving forward backward
 myprogressBar.addEventListener('change',() => {
  music.currentTime = myprogressBar.value *music.duration/100;
});




music.addEventListener('ended' ,nextSong);
next.addEventListener('click',nextSong);
prev.addEventListener('click',prevSong);