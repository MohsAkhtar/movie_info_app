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
