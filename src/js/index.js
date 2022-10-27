import { createFetch } from '../js/fetch'
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

import Notiflix from 'notiflix';




const input = document.querySelector('.search-form_input')
const searchButton = document.querySelector('.search-btn')
const gallery = document.querySelector('.gallery')
const loadMoreButton = document.querySelector ('.load-more')

let gallerySimpleLightbox = new SimpleLightbox('.gallery a');

let pageNr = 1;
let perPage = 40;
loadMoreButton.style.display = 'none'

searchButton.addEventListener('click',onClick)

  async function onClick(evt) {
    evt.preventDefault()
    loadMoreButton.style.display = 'none'
    cleanImages()
    const trimmedValue = input.value.trim();
    if (trimmedValue !== '') {
     const data = await createFetch(trimmedValue, pageNr,perPage) 
            
            if (data.hits.length === 0) {
                Notiflix.Notify.failure(
                    'Sorry, there are no images matching your search query. Please try again.'
                );
              
            }
            else {
                Notiflix.Notify.success(
                    `Hooray! We found ${data.totalHits} images.`
                );
                createMarckup(data.hits);
                gallerySimpleLightbox.refresh()
                loadMoreButton.style.display = 'block'
            }
            
        }
        
    }
    


loadMoreButton.addEventListener('click',onLoadMoreClick)
async function onLoadMoreClick(evt) {
    evt.preventDefault;
    pageNr += 1
    const name = input.value;
     const data= await  createFetch(name, pageNr,perPage)
            console.log(data);
            let totalPages= data.totalHits/perPage
            if (pageNr >= totalPages) {
                loadMoreButton.style.display = 'none'
                Notiflix.Notify.info(
                    "We're sorry, but you've reached the end of search results."
                );
            }
            else {
                createMarckup(data.hits)
                loadMoreButton.style.display = 'block'
                gallerySimpleLightbox.refresh()
            }
        }
    


            
            
            
function createMarckup(images) {
    
    const marcup = images.map(image => {
    return `<div class="render-card">
 <a href="${image.largeImageURL}"><img class="photo" src="${image.webformatURL}" alt="${image.tags}" title="${image.tags}" loading="lazy"/></a>

<div class="card">
  <p class="card-info"> Like 
    <span class="card-info_like"> ${image.likes}</span>
  </p>
  <p class="card-info"> Views
    <span class="card-info_views">${image.views}</span>
  </p>
  <p class="card-info"> Comments
    <span class="card-info_comments">${image.comments}</span>
  </p>
  <p class="card-info"> Downloads
    <span class="card-info_downloads">${image.downloads}</span>
  </p>
</div>
</div>`
    }).join('')
    gallery.innerHTML+=marcup
}

function cleanImages() {
    gallery.innerHTML = ''
    pageNr =1
}

