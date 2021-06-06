import './sass/main.scss';
import imagesTpl from './templates/images.hbs';
import ImagesApiService from './apiService';

const refs = {
  searchForm: document.querySelector('#search-form'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
  galleryContainer: document.querySelector('.gallery'),
  galleryBox: document.querySelector('.gallery-box'),
};

const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  refs.loadMoreBtn.removeAttribute('disabled');
  clearGalleryContainer();
  imagesApiService.query = e.currentTarget.elements.query.value;
  imagesApiService.resetPage();
  imagesApiService.fetchImages().then(appendImagesMarkup);
}

function onLoadMore() {
  imagesApiService.fetchImages().then(appendImagesMarkup);

  const element = refs.galleryContainer.lastElementChild.lastElementChild;
  console.log(element);
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

function appendImagesMarkup(hits) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', imagesTpl(hits));
}

function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}
