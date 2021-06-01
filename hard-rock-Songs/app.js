const searchSong = () => {
    const searchText = document.getElementById('search-field').value;
    // console.log(searchText)
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    // console.log(url)
    //losd data
    fetch(url)
        .then(res => res.json())
        .then(data => displaySongs(data.data))
        .catch(error => displayError('Something went wrong please try again later')) // error catch kora nise function ase
}

const displaySongs = songs => {
    // console.log(songs)
    const songContainer = document.getElementById('song-container');
    songContainer.innerText = ''
    songs.forEach(song => {
        // console.log(song)
        const songDiv = document.createElement('div');
        songDiv.className = "single-result row align-items-center my-3 p-3";
        songDiv.innerHTML = `
        <div class="col-md-9">
        <h3 class="lyrics-name">${song.title}</h3>
        <p class="author lead">Album by <span>${song.artist.name} </span></p>
        <audio controls> 
            <source src="${song.preview}" type="audio/mpeg">    
         </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick = "getLyric( '${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
            `
        songContainer.appendChild(songDiv)


    });
}

const getLyric = (artist, title) => {
    // console.log(artist, title)
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    // console.log(url)

    // try diye error catch kora 
//     try{
//         fetch(url)
//         .then(res => res.json())
//         .then(data => displayLyrics(data.lyrics))
//     }
//     catch(error){
//         displayError("Sorry we failed to load  lyrics Please try again later");
//         // console.log(error)
//     }
// }
        fetch(url)
        .then(res => res.json())
        .then(data => displayLyrics(data.lyrics))
}      

const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('lyrics');
    lyricsDiv.innerText = lyrics;

}

const displayError = error => {
    const errorTag = document.getElementById("error-msg");
    errorTag.innerText = error; 
}