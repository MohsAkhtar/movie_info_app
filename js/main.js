$(document).ready(() => {
  $("#searchForm").on("submit", e => {
    let searchText = $("#searchText").val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText) {
  // make a call to api using axios
  axios
    .get("http://www.omdbapi.com/?apikey=8455bd77&?s=" + searchText)
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    });
}
