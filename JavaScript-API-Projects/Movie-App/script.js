// API used:Search movie by name
//API Site URL:https://omdbapi.com/

// get the elements from index.html file into JS file.
const searchForm = document.querySelector("form");
const movieContainer = document.querySelector(".movieContainer");
const inputBox = document.querySelector(".inputBox");

//function to fetch movie details using omDb API
const getMovieInfo = async (movie) =>{
    try {
          const myApiKey = "fa2ec7d2";
          const url = `http://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`;

          const response = await fetch(url);
          const data = await response.json();
          
          showMovieData(data);
        }
        catch (error) {
            showErrorMessage("No Movie Found!!!");
        }
}

//Function to show movie data on screen
const showMovieData = (data)=>{
     movieContainer.innerHTML = "";
     movieContainer.classList.remove("noBackground");
    //Example: Use of Array-Destructuring assignment to extract properties from data object
    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;

    const movieElement = document.createElement("div");
    movieElement.classList.add("movie-info");
    movieElement.innerHTML = `<h2>${Title}</h2>
                              <p><strong>Rating: &#11088;</strong>${imdbRating}<p>`;
    
    
    const movieGenreElement = document.createElement("div");
    movieGenreElement.classList.add("movieGenre");

    Genre.split(",").forEach(element => {
        const p = document.createElement("p");
        p.innerText = element;
        movieGenreElement.appendChild(p);
    });

    movieElement.appendChild(movieGenreElement);

    movieElement.innerHTML += `<p><strong>Release Date: </strong>${Released}<p>
                                <p><strong>Duration: </strong>${Runtime}<p>
                                <p><strong>Cast: </strong>${Actors}<p>
                                <p><strong>Plot: </strong>${Plot}<p>`;
    
    //Creating a Div for Movie Poster
    const moviePosterElement = document.createElement("div");
    moviePosterElement.classList.add("movie-poster");
    moviePosterElement.innerHTML = `<img src="${Poster}"/>`;



    movieContainer.appendChild(moviePosterElement);
    movieContainer.appendChild(movieElement);
}
//Function to Display error message
const showErrorMessage = (message) =>{
    movieContainer.innerHTML = `<h2>${message}</h2>`;
    movieContainer.classList.add("noBackground");
}

//Function to handle Form Submision
const handleFormSubmission = (e) =>{
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if (movieName!=""){
        showErrorMessage("Fetching Movie Information...");
        getMovieInfo(movieName);
    }
    else{
        showErrorMessage("Enter a movie Name to get movie information");
        //movieContainer.classList.add("noBackground");
    }
}


//Add eventListner to Search form
searchForm.addEventListener("submit", handleFormSubmission);


