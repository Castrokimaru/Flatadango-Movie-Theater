const BASE_URL = 'https://json-server-vercel-8x7p.vercel.app/films';

let currentMovie = null;


const filmsList = document.getElementById('films');
const movieDetailsContainer = document.getElementById('movie-details');


document.addEventListener('DOMContentLoaded', () => {

    const placeholderLi = filmsList.querySelector('li');
    if (placeholderLi && placeholderLi.id === 'placeholder') {
        filmsList.removeChild(placeholderLi);
    }
    

    fetchFirstMovie();
    fetchAllFilms();
});

function fetchFirstMovie() {
    fetch(`${BASE_URL}/films/1`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch movie details');
            }
            return response.json();
        })
        .then(movie => {
            currentMovie = movie;
            displayMovieDetails(movie);
        })
        .catch(error => {
            console.error('Error:', error);
            movieDetailsContainer.innerHTML = `
                <div class="text-center py-8">
                    <p class="text-red-500 text-lg">Error loading movie details.</p>
                    <p class="text-gray-600">Please try again later.</p>
                </div>
            `;
        });
}


function fetchAllFilms() {
    fetch(`${BASE_URL}/films`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch films list');
            }
            return response.json();
        })
        .then(films => {
            displayFilmsList(films);
        })
        .catch(error => {
            console.error('Error:', error);
            filmsList.innerHTML = `
                <li class="p-3 bg-red-50 text-red-600 rounded-md">
                    Error loading films. Please try again later.
                </li>
            `;
        });
}


function displayMovieDetails(movie) {
    const availableTickets = movie.capacity - movie.tickets_sold;
    const isSoldOut = availableTickets === 0;
    
    movieDetailsContainer.innerHTML = `
        <div class="mb-6">
            <img src="${movie.poster}" alt="${movie.title}" 
                 class="w-full h-64 md:h-96 object-cover rounded-lg shadow-md">
        </div>
        
        <div class="mb-6">
            <h2 class="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                ${movie.title}
                ${isSoldOut ? '<span class="ml-3 bg-red-500 text-white text-sm px-3 py-1 rounded-full">Sold Out</span>' : ''}
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <p class="text-gray-700"><span class="font-semibold">Runtime:</span> ${movie.runtime} minutes</p>
                    <p class="text-gray-700"><span class="font-semibold">Showtime:</span> ${movie.showtime}</p>
                </div>
                <div>
                    <p class="text-gray-700"><span class="font-semibold">Capacity:</span> ${movie.capacity}</p>
                    <p class="text-gray-700"><span class="font-semibold">Tickets Sold:</span> ${movie.tickets_sold}</p>
                </div>
            </div>
            
            <p class="text-gray-800 mb-4"><span class="font-semibold">Description:</span> ${movie.description}</p>
            
            <div class="bg-blue-50 p-4 rounded-lg mb-6">
                <p class="text-xl font-bold text-blue-800">
                    Available Tickets: <span class="text-2xl">${availableTickets}</span>
                </p>
            </div>
        </div>
        
        <button id="buy-ticket-btn" 
                class="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200 ${isSoldOut ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed' : ''}" 
                ${isSoldOut ? 'disabled' : ''}>
            ${isSoldOut ? 'Sold Out' : 'Buy Ticket'}
        </button>
    `;
    
    const buyButton = document.getElementById('buy-ticket-btn');
    if (buyButton && !isSoldOut) {
        buyButton.addEventListener('click', () => {
            buyTicket(movie);
        });
    }
}


function displayFilmsList(films) {
    filmsList.innerHTML = '';
    
    films.forEach(film => {
        const availableTickets = film.capacity - film.tickets_sold;
        const isSoldOut = availableTickets === 0;
        
        const li = document.createElement('li');
        li.className = `film-item flex justify-between items-center p-3 rounded-md cursor-pointer transition duration-200 ${isSoldOut ? 'bg-red-50 text-red-700' : 'bg-gray-50 hover:bg-gray-100'}`;
        li.innerHTML = `
            <span class="font-medium truncate">${film.title}</span>
            <div class="flex items-center space-x-2">
                ${isSoldOut ? '<span class="text-xs bg-red-200 text-red-800 px-2 py-1 rounded-full">Sold Out</span>' : ''}
                <button class="delete-btn bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded transition duration-200">
                    Delete
                </button>
            </div>
        `;
        
        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            deleteFilm(film.id, li);
        });
        
        li.addEventListener('click', () => {
            selectFilm(film);
        });
        
        filmsList.appendChild(li);
    });
}

function selectFilm(film) {

    movieDetailsContainer.innerHTML = `
        <div class="animate-pulse">
            <div class="h-64 bg-gray-200 rounded-lg mb-4"></div>
            <div class="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2 mb-1"></div>
            <div class="h-4 bg-gray-200 rounded w-2/3 mb-1"></div>
            <div class="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
            <div class="h-10 bg-gray-200 rounded w-32"></div>
        </div>
    `;
    
    
    setTimeout(() => {
        currentMovie = film;
        displayMovieDetails(film);
    }, 500);
}


function buyTicket(movie) {
    const updatedTicketsSold = movie.tickets_sold + 1;
    const availableTickets = movie.capacity - updatedTicketsSold;
    
    
    const buyButton = document.getElementById('buy-ticket-btn');
    const originalText = buyButton.textContent;
    buyButton.textContent = 'Processing...';
    buyButton.disabled = true;
    
    fetch(`${BASE_URL}/films/${movie.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tickets_sold: updatedTicketsSold
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update tickets');
        }
        return response.json();
    })
    .then(updatedMovie => {
    
        return fetch(`${BASE_URL}/tickets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                film_id: movie.id,
                number_of_tickets: 1
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create ticket record');
            }
            return response.json();
        })
        .then(ticket => {
            
            showNotification('Ticket purchased successfully!', 'success');
            
        
            currentMovie = updatedMovie;
            displayMovieDetails(updatedMovie);
            
            
            fetchAllFilms();
        });
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('Failed to purchase ticket. Please try again.', 'error');
    
        buyButton.textContent = originalText;
        buyButton.disabled = false;
    });
}


function deleteFilm(filmId, listItem) {
    if (!confirm('Are you sure you want to delete this film?')) {
        return;
    }
    
    fetch(`${BASE_URL}/films/${filmId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete film');
        }
        
    
        listItem.style.opacity = '0';
        listItem.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            filmsList.removeChild(listItem);
        }, 300);
        
    
        if (currentMovie && currentMovie.id === filmId) {
            movieDetailsContainer.innerHTML = `
                <div class="text-center py-12">
                    <p class="text-gray-500 text-lg">Select a movie from the list to view details.</p>
                </div>
            `;
            currentMovie = null;
        }
        
        showNotification('Film deleted successfully!', 'success');
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('Failed to delete film. Please try again.', 'error');
    });
}


function showNotification(message, type) {

    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transform transition-transform duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    

    setTimeout(() => {
        notification.classList.remove('transform');
        notification.classList.add('translate-x-0');
    }, 10);
    
    
    setTimeout(() => {
        notification.classList.add('opacity-0');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

const style = document.createElement('style');
style.textContent = `
    .film-item {
        transition: all 0.3s ease;
    }
    
    .notification {
        transform: translateX(100%);
    }
    
    .notification.translate-x-0 {
        transform: translateX(0);
    }
`;
document.head.appendChild(style);