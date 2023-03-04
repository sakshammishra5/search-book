 let bookArea = document.getElementById('book-Area');
const spinner = document.getElementById('spinner');
spinner.style.display = 'none';

// Fetch data from Open Library API based on search query
function fetchData(query) {
    const url = `https://openlibrary.org/search.json?q=${query}`;
    spinner.style.display = 'block';
    // bookArea.style.display='none'
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


  // Javascript for side panel subjects

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
  spinner.style.display = 'block';
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
    .then(()=>{
      spinner.style.display = 'none'
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

  