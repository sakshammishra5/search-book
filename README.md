# Search Book App

This repository contains code for a simple book search application built using HTML, CSS, and JavaScript and the Google Books API. The live version of this app can be accessed at:- https://search-book-theta.vercel.app/



**Table of Contents**

[TOCM]

#Usage
#Functionality
#Code Overview


----


###Usage

> To use this app, simply open the live version at  https://search-book-theta.vercel.app/ in your web browser. Enter a search query in the search box and click the "Search" button to fetch book data from the Open Books API. The app will display a list of books matching the search query.
                    

###Functionality

> This app allows users to search for books by title, author, or keyword. Upon entering a search query, the app fetches book data from the Open Books API and displays the results in a paginated list. Users can click on a book to view its details, including a description, cover image, and link to purchase or read the book online.



###Code Overview & highlighting
######HTML CODE
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Open Library Files</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;600;700&family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="design.css">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1 class="page-title">Open Library Files</h1>
  <form id="search-form">
    <label class="search-input" for="search-input">Search for a book:</label>
    <input type="text" id="search-input" name="search" required>
    <button id="search-btn" type="submit">Search</button>
  </form>

  <div class="loader" id="spinner"></div>

<div id="book-Area">
  <div id="file-container" class="file-container"></div>

  <div class="sidebar">
    <h2>Subjects</h2>
    <ul id="subjects-list">
      <li><a href="#" id="history">History</a></li>
      <li><a href="#" id="geography">Geography</a></li>
      <li><a href="#" id="maths">Maths</a></li>
      <li><a href="#" id="science">Science</a></li>
    </ul>
  </div>
</div>

  <span id="pagination">
    <button class="pagination-btn" id="prev-button">Previous</button>
    <button class="pagination-btn" id="next-button">Next</button>
  </span>

  <script src="index.js"></script>
</body>
</html>
```
######JAVASCRIPT CODE
```javascript
 let bookArea = document.getElementById('book-Area');
const spinner = document.getElementById('spinner');
spinner.style.display = 'none';

// Fetch data from Open Library API based on search query
function fetchData(query) {
    const url = `https://openlibrary.org/search.json?q=${query}`;
    spinner.style.display = 'block';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const files = data.docs.filter(doc => doc.hasOwnProperty('cover_i')); // Filter out files without cover images
        let currentPage = 1; // Initialize current page to 1
        const filesPerPage = 10; // Display 10 files per page
  
        // Render initial page
        renderPage(files.slice(0, filesPerPage));
  
        // Update page when Next button is clicked
        const nextButton = document.getElementById('next-button');
        nextButton.addEventListener('click', () => {
          const startIndex = currentPage * filesPerPage;
          const endIndex = (currentPage + 1) * filesPerPage;
          if (endIndex <= files.length) {
            currentPage++;
            renderPage(files.slice(startIndex, endIndex));
          }

        });
  
        // Update page when Previous button is clicked
        const prevButton = document.getElementById('prev-button');
        prevButton.addEventListener('click', () => {
          const startIndex = (currentPage - 2) * filesPerPage;
          const endIndex = (currentPage - 1) * filesPerPage;
          if (startIndex >= 0) {
            currentPage--;
            renderPage(files.slice(startIndex, endIndex));
          }
        });
        console.log(data);
      })
      .then(() => {
        spinner.style.display = 'none';
        // bookArea.style.display='block'
      })
      .catch(error => console.error(error));
  
  }
  
  // Render files on page
  function renderPage(files) {
    const fileContainer = document.getElementById('file-container');
    fileContainer.innerHTML = '';
  
    files.forEach(file => {
      const coverUrl = `https://covers.openlibrary.org/b/id/${file.cover_i}-M.jpg`;
      const fileElement = document.createElement('div');
      fileElement.className = 'file';
      fileElement.innerHTML = `
        <img src="${coverUrl}" alt="${file.title}">
        <h3>${file.title}</h3>
        <p>${file.author_name ? file.author_name.join(', ') : 'Unknown Author'}</p>
      `;
      fileContainer.appendChild(fileElement);
    });
  }
  
  // Add event listener to search form
  const searchForm = document.getElementById('search-form');
  searchForm.addEventListener('submit', event => {
    event.preventDefault(); // Prevent default form submission behavior
    const query = document.getElementById('search-input').value;
    fetchData(query); // Fetch data based on search query
  });

let subjectslist=document.querySelector("#subjects-list")
let subjectArray=['history','geography','maths','science']

subjectslist.addEventListener("click",(e)=>{
    console.log(e.target.id);
    let subject=e.target.id
    if(subject==subjectArray.find(item=>item==e.target.id)){
       let searchString=subject
       runfetch(searchString)
    }

})

function runfetch(searchString){
    fetch(`http://openlibrary.org/subjects/${searchString}.json`)
    .then(res=>res.json())
    .then(data=>{
     RecivedArray= data.works.slice(0,10)
     const files = data.works.filter(works => works.hasOwnProperty('cover_i'));
      console.log(data);
    //   console.log(files);
    //   console.log(data.works);
    console.log(RecivedArray)
    console.log(RecivedArray[0].authors[0].name);
        renderSubject(RecivedArray)
    })
}

function renderSubject(files) {
    const fileContainer = document.getElementById('file-container');
    fileContainer.innerHTML = '';
  
    files.forEach(file => {
      const coverUrl = `https://covers.openlibrary.org/b/id/${file.cover_id}-M.jpg`;
      const fileElement = document.createElement('div');
      fileElement.className = 'file';
      fileElement.innerHTML = `
        <img src="${coverUrl}" alt="${file.title}">
        <h3>${file.title}</h3>
        <p>${file.authors.name ? file.authors.name.join(', ') : 'Unknown Author'}</p>
      `;
      fileContainer.appendChild(fileElement);
    });
  }
```
![alt text](https://imgur.com/a/G2heIsw)

###End
