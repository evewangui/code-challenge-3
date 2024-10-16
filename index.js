function fetchMovies() {
    fetch('http://localhost:3000/films')
      .then(response => response.json())
      .then(movies => {
        const filmsList = document.getElementById('films');
        filmsList.innerHTML = '';
        movies.forEach(movie => {
          const li = document.createElement('li');
          li.className = 'film item';
          li.textContent = movie.title;
          li.addEventListener('click', () => displayMovieDetails(movie));
          filmsList.appendChild(li);
          const deletebutton = document.createElement('button');
          deletebutton.innerText = "DEL";
          li.appendChild(deletebutton);
          deletebutton.onclick = () => deletemovie(movie.id, li)
        });
        // Display the first movie's details by default
        displayMovieDetails(movies[0]);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }
  
  // Function to display movie details
  function displayMovieDetails(cinema) {
    document.getElementById('poster').src = cinema.poster;
    document.getElementById('poster').alt = cinema.title;
    document.getElementById('title').textContent = cinema.title;
    document.getElementById('runtime').textContent = `${cinema.runtime} minutes`;
    document.getElementById('film-info').textContent = cinema.description;
    document.getElementById('showtime').textContent = cinema.showtime;
   
    const availableTickets = cinema.capacity - cinema.tickets_sold;
    document.getElementById('ticket-num').textContent = availableTickets;
  
    const buyTicketButton = document.getElementById('buy-ticket');
    buyTicketButton.disabled = availableTickets === 0;
    buyTicketButton.textContent = availableTickets === 0 ? 'Sold Out' : 'Buy Ticket';
  
    buyTicketButton.onclick = () => {
      if (availableTickets > 0) {
        cinema.tickets_sold++;
        displayMovieDetails(cinema);
        
        // updateTicketSold(movie.id);
      }
    };
  }
  
  // functtion delete
  function deletemovie(cinemaid, items){
    fetch(`http://localhost:3000/films/${cinemaid}`, {method:"DELETE"}
      .then(res => {
        if (res.ok){
          console.log(`removed movie:${cinemaid}`)
          items.remove()
        }
        else{
          console.error("program not excecuted",response.status)
        }
      })
    )
  }
  // fetching of movies
  document.addEventListener('DOMContentLoaded', fetchMovies);