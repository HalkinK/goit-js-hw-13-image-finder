const API_KEY = '21946293-ddb661a7c3de00e68a212d36c';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    const url = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';

    return fetch(`${url}&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`)
      .then(responce => {
        return responce.json();
      })
      .then(({ hits }) => {
        this.page += 1;

        return hits;
      });
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
