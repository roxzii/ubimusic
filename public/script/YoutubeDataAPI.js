let FURL = window.location.search
let music = ""

for (let i = 7; i < FURL.length; i++) {
    if (FURL[i] == "+") {
        music += " "
    } else {
        music += FURL[i]
    }
}

document.getElementById("pesquisa").value = music;
console.log(music)
//My key -> AIzaSyBo9yC1b1cpXRt44kmCzN0ymxL6yOYiLKA
//Ruben key -> AIzaSyDbn9jFwiiv5x6EleaEDPEdem-AwsLRdTY
fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=40&q=${music}&key=AIzaSyDbn9jFwiiv5x6EleaEDPEdem-AwsLRdTY`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        let videos = data.items;
        console.log(videos);
        let list = document.getElementById("list");
        for (let i = 1; i < videos.length; i++) {

            let br = document.createElement("br");

            let div = document.createElement("form");
            div.className = "item";
            div.action = "/player/play"
            div.method = "POST"
            let label = document.createElement("Label");
            label.innerHTML = videos[i].snippet.title;
            let videoTittle = document.createElement("input");
            videoTittle.type = "text";
            videoTittle.name = "videoTitle";
            videoTittle.value = videos[i].snippet.title;
            videoTittle.style.display = "none";
            let textid = document.createElement("input");
            textid.type = "text";
            textid.name = "videoid";
            textid.id = "videoid";
            let textImg = document.createElement("input");
            textImg.type = "text";
            textImg.name = "videoImg";
            textImg.id = "videoImg";
            textImg.value = videos[i].snippet.thumbnails.high.url;
            textImg.style.display = "none";
            textid.value = videos[i].id.videoId;
            textid.innerHTML = videos[i].id.videoId;
            textid.innerText = videos[i].id.videoId;
            console.log(textid.innerText);
            console.log(textid.value);
            console.log(textid.innerHTML);
            console.log(textid.name);
            textid.style = "display:none";
            let img = document.createElement("img");
            img.src = videos[i].snippet.thumbnails.medium.url;

            div.appendChild(img);
            div.appendChild(label);
            div.appendChild(textid);
            div.appendChild(br);
            div.appendChild(videoTittle);
            div.appendChild(textImg);

            div.onclick = function () {
                div.submit();
            }

            list.appendChild(div);
        }
    })