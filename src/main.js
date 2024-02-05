import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

let page;
let searchText = '';
let totalPages;
let gallery = null;

const refs = {
  form: document.querySelector('.form'),
  textInput: document.querySelector('#query'),
  searchBtn: document.querySelector('.search-button'),
  galleryList: document.querySelector('.gallery-list'),
  searchLoader: document.querySelector('.search-loader'),
  moreLoader: document.querySelector('.more-loader'),
  moreBtn: document.querySelector('.more-button'),
  moreWrapper: document.querySelector('.more-wrapper'),
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
  spinner: true,
};

refs.form.addEventListener('submit', onSearch);

async function onSearch(e) {
  e.preventDefault();

  //page = 1 by default
  page = 1;

  //total by default
  totalPages = null;

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
  refs.form.reset();
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
  totalPages = Math.ceil(data.total / 15);
  console.log(data.total);
  console.log('total pages: ', totalPages);
  console.log('current page', page);
  if (page != totalPages) {
    moreBtnShow();
  }
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

function moreBtnHide() {
  refs.moreWrapper.classList.add('hidden');
}

function moreBtnShow() {
  refs.moreWrapper.classList.remove('hidden');
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
  // if (gallery) {
  //   console.log('refreshing gallery');
  //   gallery.refresh();
  // }
  initSimpleLightBox();
}

function initSimpleLightBox() {
  //initializing simplelightbox
  // gallery = null;
  // if (gallery) {
  //   gallery.refresh();
  // gallery = null;
  // }
  gallery = new SimpleLightbox('.gallery-list a', simplelightboxOptions);
  gallery.refresh();
  // return gallery;
}

refs.moreBtn.addEventListener('click', onMoreClick);

async function onMoreClick(e) {
  //check if the last page is downloaded, then disable more button and message show
  if (page + 1 === totalPages) {
    moreBtnHide();
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  }

  //loader show bottom
  loaderShow(refs.moreLoader);
  try {
    page += 1;
    gallery.destroy();
    const data = await fetchPhotos(searchText);
    const markup = renderGalleryMarkup(data.hits);
    loaderHide(refs.moreLoader);
    refs.galleryList.insertAdjacentHTML('beforeend', markup);
    smoothScroll();
    initSimpleLightBox();
  } catch (err) {
    loaderHide(refs.moreLoader);
    console.log(err);
  }
}

function smoothScroll() {
  const galleryItem = document.querySelector('.gallery-item');

  // gettinf height of item
  const galleryItemHeight = galleryItem.getBoundingClientRect().height;

  // scroll fun
  window.scrollBy({
    top: galleryItemHeight * 2, // scroll with 2 heights of item
    behavior: 'smooth', // make scroll smooth
  });
}
