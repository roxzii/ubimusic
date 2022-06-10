var music = document.getElementById("music")

//Create a progress bar for the music player with event listener:
var progressmusic = document.getElementById("music-progress-bar")
music.addEventListener("timeupdate", function () {
    var progress = (music.currentTime / music.duration) * 100
    document.getElementById("music-progress-bar").value = progress
})

progressmusic.addEventListener("click", function (e) {
    var percent = e.offsetX / this.offsetWidth
    music.currentTime = percent * music.duration
})

var trade = 2
var cookie = document.cookie
var icon = document.getElementById("Play-Pause-Icon")
const DecodeCookie = decodeURIComponent(cookie)
var volume = document.getElementById("VolumeBar")
var volume_button = document.getElementById("volume")
console.log("cookie🥮 = " + DecodeCookie)
//roxzii.chickenkiller.com
music.src = "https://roxzii.chickenkiller.com:8084/public/music/" + cookie.substring(cookie.search("videoTittle") + 12, cookie.search("videoImg") - 2) + ".webm"
if (DecodeCookie.search("videoTittle") != -1) {
    var tittle = cookie.substring(cookie.search("videoTittle") + 12, cookie.search("videoImg") - 2)
    document.getElementById("TittleDownload").value = decodeURI(tittle);
    document.getElementById("Tittle").innerHTML = decodeURI(tittle);
}
var ImageURL = cookie.substring(cookie.search("videoImg") + 9, cookie.length).replace("%3A", ":").replace("%2F", "/").replace("%2F", "/").replace("%2F", "/").replace("%2F", "/").replace("%2F", "/")
document.getElementById("music-player").style.backgroundImage = "url(" + ImageURL + ")"
function Play() {
    //Verefica se a radio esta a tocar:
    if (document.getElementById("Play-PauseIcon").innerText == "play_arrow") {
        if (trade % 2 == 0) {
            music.play()
            icon.innerHTML = "pause"
            document.getElementById("music-player").style.animationPlayState = "running"
            trade++;
        }
        else {
            music.pause()
            icon.innerHTML = "play_arrow"
            document.getElementById("music-player").style.animationPlayState = "paused"
            trade++;
        }
        if (trade == 20000) {
            trade = 2
        }
    }
}

//Evento responsável por alterar o volume da musica
volume.addEventListener("change", function(e){
    music.volume = volume.value/10
})

var volume_bar_visible = false

volume_button.addEventListener("click", function (event) {
    if(volume_bar_visible){
        volume.style.display = "none"
        volume_bar_visible = false
        document.getElementById("download").style = "margin-left: 585px;"
    }   else{
        volume.style.display = "inline"
        volume_bar_visible = true
        document.getElementById("download").style = "margin-left: 387px;"
    }
})
