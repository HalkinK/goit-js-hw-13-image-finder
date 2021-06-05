import './sass/main.scss';
import imagesTpl from './templates/images.hbs';
import ImagesApiService from './apiService';

const refs = {
  searchForm: document.querySelector('#search-form'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
  galleryContainer: document.querySelector('.gallery'),
};

const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  imagesApiService.query = e.currentTarget.elements.query.value;
  imagesApiService.resetPage();
  imagesApiService.fetchImages().then(appendImagesMarkup);
}

function onLoadMore() {
  imagesApiService.fetchImages().then(appendImagesMarkup);
}

function appendImagesMarkup(hits) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', imagesTpl(hits));
}
