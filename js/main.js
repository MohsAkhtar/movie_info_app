$(document).ready(() => {
  $("#searchForm").on("submit", e => {
    let searchText = $("#searchText").val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText) {
  console.log(searchText);
  // make a call to api using axios
  axios
    .get("http://www.omdbapi.com/?s=" + searchText + "&apikey=8455bd77")
    .then(response => {
      console.log(response);
      // add search result to array
      let movies = response.data.Search;
      let output = "";
      // jquery for each
      $.each(movies, (index, movie) => {
        // output movies
        console.log(movies);
        output += `
            <div class="col-md-3">
                <div class="well text-center">
                    <img src="${movie.Poster}">
                    <h5>${movie.Title}</h5>
                    <a onclick="movieSelected('${
                      movie.imdbID
                    }')" class="btn btn-primary" href="#">Movie Details</a>
                </div>
            </div>
          `;
      });
      console.log(output);
      $("#movies").html(output);
    })
    .catch(err => {
      console.log(err);
    });
}

// when we click a single movie
function movieSelected(id) {
  // to pass data from page to another we use session storage
  sessionStorage.setItem("movieId", id);
  // what page to open
  window.location = "movie.html";
  return false;
}

function getMovie() {
  // get movie id from local storage
  let movieId = sessionStorage.getItem("movieId");

  // make a call to api using axios
  axios
    .get("http://www.omdbapi.com/?i=" + movieId + "&apikey=8455bd77")
    .then(response => {
      console.log(response);
      let movie = response.data;

      let output = `
          <div class="row">
              <div class="col-md-4">
                  <img src ="${movie.Poster}" class="thumbnail">
              </div>
              <div class="col-md-8">
                <h2>${movie.Title}</h2>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Genre </strong>${
                      movie.Genre
                    }</li>
                    <li class="list-group-item"><strong>Release Date </strong>${
                      movie.Released
                    }</li>
                    <li class="list-group-item"><strong>Rating </strong>${
                      movie.Rated
                    }</li>
                    <li class="list-group-item"><strong>IMDB Rating </strong>${
                      movie.imdbRating
                    }</li>
                    <li class="list-group-item"><strong>Director </strong>${
                      movie.Director
                    }</li>
                    <li class="list-group-item"><strong>Writer </strong>${
                      movie.Writer
                    }</li>
                    <li class="list-group-item"><strong>Actors </strong>${
                      movie.Actors
                    }</li>
                </ul>
              </div>
          </div>
          <div class="row">
                <div class="well">
                    <h3>Plot</h3>
                    ${movie.Plot}
                    <hr>
                    <a href="http://imdb.com/title/${
                      movie.imdbID
                    }" target="_blank" class="btn btn-primary">View IMDB</a>
                    <a href="index.html" class="btn btn-default">Go Back To Search</a>
                </div>
            </div>
        `;
      console.log(output);
      $("#movie").html(output);
    })
    .catch(err => {
      console.log(err);
    });
}
