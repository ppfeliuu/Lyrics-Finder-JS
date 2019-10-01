import { API } from './api.js'
import * as UI from './interface.js';

UI.formSearch.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get data from Form
    const artist = document.querySelector('#artist').value,
    song = document.querySelector('#song').value;


    if (artist === '' || song === '') {
        UI.divMsg.innerHTML = 'All fields are required';
        UI.divMsg.classList.add('error');

        setTimeout(() => {
            UI.divMsg.innerHTML = '';
            UI.divMsg.classList.remove('error');
        }, 3000)
    } else {
        // Get data from api
        const api = new API(artist, song);
        api.requestAPI()
            .then(data => {
                if(data.response.lyrics) {
                    const lyric = data.response.lyrics;
                    UI.divResult.textContent = lyric;
                } else {
                    UI.divMsg.innerHTML = 'Song does not exist';
                    UI.divMsg.classList.add('error');
                    UI.divResult.textContent = '';
        
                    setTimeout(() => {
                        UI.divMsg.innerHTML = '';
                        UI.divMsg.classList.remove('error');
                        UI.formSearch.reset();
                    }, 3000)
                }
            })
    }
});