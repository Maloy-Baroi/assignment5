const form = document.getElementById('form')
const search = document.getElementById('search')
const result = document.getElementById('result')


/// api URL ///
const apiURL = 'https://api.lyrics.ovh';


/// adding event listener in form

form.addEventListener('submit', e => {
    e.preventDefault();
    searchValue = search.value.trim()

    if (!searchValue) {
        alert("There is nothing to search")
    } else {
        searchSong(searchValue)
    }
})


//search song
async function searchSong(searchValue) {
    const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`)
    const data = await searchResult.json();

    // console.log(finaldata)
    showData(data)
}

//display final result in DO
function showData(data) {

    document.getElementById('go-back').style.display = 'block';
    result.innerHTML = `
    <ul class="song-list">
      ${data.data
        .map(song => `<div class="d-flex justify-content-center"><p class="author lead">
                    <strong>${song.album.title}</strong> Album by ${song.artist.name} 
                    <button class="btn btn-primary" data-artist="${song.artist.name}" data-songtitle="${song.title}"> get lyrics</button>
</p></div>`
        )
        .join('')}
    </ul>
  `;
}


//event listener in get lyrics button
result.addEventListener('click', e => {
    const clickedElement = e.target;

    //checking clicked elemet is button or not
    if (clickedElement.tagName === 'BUTTON') {
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');

        getLyrics(artist, songTitle)
    }
})

// Get lyrics for song
async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

    result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
    <p>${lyrics}</p>`;

}
