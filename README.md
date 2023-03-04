# Search Book App
This repository contains code for a simple book search application built using HTML, CSS, and JavaScript and the Google Books API. The live version of this app can be accessed at https://sakshammishra5.github.io/search-book/.

Table of Contents
Usage
Functionality
Code Overview
Usage
To use this app, simply open the live version at https://sakshammishra5.github.io/search-book/ in your web browser. Enter a search query in the search box and click the "Search" button to fetch book data from the Google Books API. The app will display a list of books matching the search query.

Functionality
This app allows users to search for books by title, author, or keyword. Upon entering a search query, the app fetches book data from the Google Books API and displays the results in a paginated list. Users can click on a book to view its details, including a description, cover image, and link to purchase or read the book online.

Code Overview
The app is built using HTML, CSS, and JavaScript and follows a modular architecture. The main modules used in the app are:

app.js - the top-level module that handles user input and makes API requests
search-form.js - a module that contains the search form and handles form submission
book-list.js - a module that displays a paginated list of books
book.js - a module that displays detailed information about a book
The app uses the fetch API to make HTTP requests to the Google Books API. The API key is stored in a config.js file for security reasons.

The app also uses CSS to style its components. Styles are defined in a style.css file and applied to the corresponding HTML elements using the class attribute. The app uses the Bootstrap framework for some of its styling.

Finally, the app uses pagination to limit the number of books displayed on the page at once. The book-list.js module calculates the number of pages based on the total number of books and the maxResults parameter in the API request. Users can navigate between pages using the "Previous" and "Next" buttons at the bottom of the book list.
