// Funtions section
function Book(index, title, author, pages, read) {
    this.index = index;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function () {
    if (this.read) return `${this.title}\nby ${this.author}\n\nPages: ${this.pages}\n\nYou have read this book!`
    else return `${this.title}\nby ${this.author}\n\nPages: ${this.pages}\n\nYou have not read this book.`
}

// Get values from form inputs
let title = () => inputTitle.value;
let author = () => inputAuthor.value;
let pages = () => inputPages.value;
let read = () => inputRead.checked;

let index = 0; // Counter for added books

function addBookToLibrary() {

    let book = new Book(index, title(), author(), pages(), read());
    index++;
    myLibrary.push(book); // Push book object to "library" (array)

    createCard(); // Creates a div for the book info
    const firstDiv = container.lastChild;  // Selects just created div
    firstDiv.textContent = book.info(); // Add book info into this div

    // Bind book index to this div to be able to removed by the user
    firstDiv.setAttribute('data-index', book.index);

    // Create remove button for the book and add click listener
    createButton(firstDiv);
    const button = firstDiv.querySelector('button');
    button.addEventListener('click', removeBook);

}


// Creates a div element for book info
function createCard() {

    let div = document.createElement('div');
    div.classList.add('card');
    container.appendChild(div);
}


function removeBook() {
    let bookIndex = this.parentNode.dataset.index;
    let pos = myLibrary.map(obj => obj.index).indexOf(+bookIndex);
    myLibrary.splice(pos, 1);
    clearCards();
    myLibrary.forEach(book => createCards(book));
}


// For removeBook function to create book-divs again to show updated library after removed item
function createCards(book) {

    createCard();

    const firstDiv = container.lastChild; // Select newly added div
    firstDiv.textContent = book.info(); // Adds book info into created div
    firstDiv.setAttribute('data-index', book.index);
    createButton(firstDiv);
    const button = firstDiv.querySelector('button');
    button.addEventListener('click', removeBook);
}


function createButton(element) {
    let button = document.createElement('BUTTON');
    button.textContent = "Remove this book";
    button.classList.add('remove');
    element.appendChild(button);
}

const resetForm = () => document.querySelector('#add-book').reset();

function clearCards() {

    while (container.firstChild) container.removeChild(container.lastChild);
}

// Inactive funtions


/* function showAdd() {

    const message = document.querySelector('#log');
    message.textContent = "Book added!"
    setTimeout(() => {
        message.textContent = "";
    }, 2000);
} */

// Library
let myLibrary = [];

// Selectors
const inputTitle = document.querySelector('input[name="title"');
const inputAuthor = document.querySelector('input[name="author"');
const inputPages = document.querySelector('input[name="pages"');
const inputRead = document.querySelector('input[name="read"');
const container = document.querySelector('.container');