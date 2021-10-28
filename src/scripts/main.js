import $ from 'jquery';
import './components/NavigationBar';
import './components/SearchBar';
import './components/AppFooter';

async function main() {
  const showMovieCard = (movie) => {
    return `
    <div class="col-sm-2 col-4 my-3">
      <div class="card-movie">
      <img src="${movie.Poster}" class="card-img-top" data-bs-toggle="modal" data-bs-target="#showDetail" data-id="${movie.imdbID}">
      <p class="card-movie-title">${movie.Title}</p>
      </div>
    </div>
    `;
  };

  const showMovieDetail = (movie) => {
    return `
    <div class="modal-content">
      <div class="modal-header">
          <h5 class="modal-title" id="showDetailLabel">${movie.Title}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="container-fluid">
          <div class="row">
              <div class="col-md-3">
              <img src="${movie.Poster}" class="img-fluid">
              </div>
              <div class="col-md">
              <ul class="list-group">
                  <li class="list-group-item"><strong>Genre : </strong> ${movie.Genre}</li>
                  <li class="list-group-item"><strong>Director : </strong> ${movie.Director}</li>
                  <li class="list-group-item"><strong>IMDB Rating : </strong> ${movie.imdbRating}</li>
                  <li class="list-group-item"><strong>Plot : </strong> <br>${movie.Plot}</li>
              </ul>
              </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
    `;
  };
  
  const updateMoviesList = (movies) => {
    let moviesList = '';
    movies.forEach((movie) => {
      moviesList += showMovieCard(movie);
    });
    $('#movies-list').html(moviesList);
  };

  const updateModalContent = (movie) => {
    const modalContent = showMovieDetail(movie);
    $('#modal-content').html(modalContent);
  };

  const getMovies = (keyword) => {
    return fetch(`http://www.omdbapi.com/?apikey=57e8c0e7&s=${keyword}`)
      .then((response) => response.json())
      .then((responseJson) => responseJson.Search);
  };

  const getMovieDetail = (id) => {
    return fetch(`http://www.omdbapi.com/?apikey=57e8c0e7&i=${id}`)
      .then((response) => response.json())
      .then((responseJson) => responseJson);
  };

  $('#search-button').click(async () => {
    const keyword = $('#search-input').val();
    const movies = await getMovies(keyword);
    updateMoviesList(movies);
  });

  $(document).click(async (event) => {
    if (event.target.classList.contains('card-img-top')) {
      const imdbID = event.target.dataset.id;
      const movie = await getMovieDetail(imdbID);
      updateModalContent(movie);
    }
  });

  $('.featured').click(async () => {
    $('.featured').addClass(' active');
    $('.home').removeClass(' active');
    $('.movies-list-title').html('Featured Movies');
    const movies = await getMovies('harry potter');
    updateMoviesList(movies);
  });

  $('.home').click(async () => {
    $('.home').addClass(' active');
    $('.featured').removeClass(' active');
    $('.movies-list-title').html('Movies');
    const movies = await getMovies('spongebob');
    updateMoviesList(movies);
  });
  
  const movies = await getMovies('spongebob');
  updateMoviesList(movies);
}

export default main;