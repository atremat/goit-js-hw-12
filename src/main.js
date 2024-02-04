import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

let page;
let searchText = '';

const refs = {
  form: document.querySelector('.form'),
  textInput: document.querySelector('#query'),
  searchBtn: document.querySelector('.search-button'),
  galleryList: document.querySelector('.gallery-list'),
  searchLoader: document.querySelector('.search-loader'),
  moreLoader: document.querySelector('.more-loader'),
  moreBtn: document.querySelector('.more-button'),
};

//options for simplelightbox
const simplelightboxOptions = {
  captions: true,
  captionDelay: 250,
  captionSelector: 'img',
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionClass: '',
  captionHTML: true,
};

refs.form.addEventListener('submit', onSearch);

async function onSearch(e) {
  e.preventDefault();

  //page = 1 by default
  page = 1;
  //show css-loader
  loaderShow(refs.searchLoader);

  //value of input
  searchText = e.currentTarget.elements.query.value;

  try {
    const data = await fetchPhotos(searchText);
    createGallery(data);
  } catch (err) {
    console.log(err);
  }

  //fetch photos
  // axios
  //   .get(`https://pixabay.com/api/?${searchParams}`)
  //   .then(response => {
  //     createGallery(response.data);
  //   })
  //   .catch(error => console.log(error))
  //   .finally(() => {
  //     refs.form.reset();
  //   });
}
async function fetchPhotos(searchText) {
  //parameters of searching query
  const searchParams = new URLSearchParams({
    key: '42031589-0742425241f8784341d5a922f',
    q: searchText,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page,
  });
  const response = await axios.get(`https://pixabay.com/api/?${searchParams}`);
  const data = response.data;
  return data;
}

function renderGalleryMarkup(photoList) {
  //creating markup
  return photoList
    .map(photo => {
      return `
      <li class="gallery-item">
        <a class="gallery-link" href="${photo.largeImageURL}">
          <img
            class="gallery-image"
            src="${photo.webformatURL}"
            data-source="${photo.largeImageURL}"
            alt="${photo.tags}"
          />
        </a>
      </li>
      `;
    })
    .join('\n');
}

function loaderHide(loader) {
  loader.classList.add('hidden');
}

function loaderShow(loader) {
  loader.classList.remove('hidden');
}

function createGallery(data) {
  //if images are not found, then alert
  if (data.total === 0) {
    iziToast.error({
      message: `Sorry, there are no images matching your search query. Please try again!`,
      position: 'topRight',
    });

    //clear gallery if images not found
    refs.galleryList.innerHTML = '';

    //hiding css-load
    loaderHide(refs.searchLoader);
    return;
  }

  //if images are found, then rendering gallery
  refs.galleryList.innerHTML = renderGalleryMarkup(data.hits);

  //hiding css-load
  loaderHide(refs.searchLoader);

  //initializing simplelightbox
  const gallery = new SimpleLightbox('.gallery-list a', simplelightboxOptions);
  gallery.refresh();
}

refs.moreBtn.addEventListener('click', onMoreClick);

async function onMoreClick(e) {
  //!loader show bottom
  loaderShow(refs.moreLoader);
  try {
    page += 1;
    const data = await fetchPhotos(searchText);
    const markup = renderGalleryMarkup(data.hits);
    loaderHide(refs.moreLoader);
    refs.galleryList.insertAdjacentHTML('beforeend', markup);
  } catch (err) {
    loaderHide(refs.moreLoader);
    console.log(err);
  }
}
