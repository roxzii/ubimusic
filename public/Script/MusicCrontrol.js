console.log(document.getElementById("Play-PauseIcon").innerText)
decoder = new TextDecoder('utf-8')
var trade = 2
var music = document.getElementById("music")
var cookie = document.cookie
var icon = document.getElementById("Play-Pause-Icon")
var volume = document.getElementById("VolumeBar")
const DecodeCookie = decodeURI(cookie)
console.log("cookie🥮 = " + DecodeCookie)
//roxzii.chickenkiller.com:8084
music.src = "https://roxzii.chickenkiller.com:8084/public/music/" + cookie.substring(cookie.search("videoTittle") + 12, cookie.search("videoImg") - 2) + ".webm"
if (DecodeCookie.search("videoTittle") != -1) {
    var tittle = cookie.substring(cookie.search("videoTittle") + 12, cookie.search("videoImg") - 2)
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
            trade++;
        }
        else {
            music.pause()
            icon.innerHTML = "play_arrow"
            trade++;
        }
        if (trade == 20000) {
            trade = 2
        }
    }
}

//Evento responsável por alterar o volume da música
volume.addEventListener("change", function(e) {
    music.volume = volume.value/10
})
