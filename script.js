function toggleForm() {
    const element = document.querySelector('#form');
    element.toggleAttribute('hidden');
    const form = document.querySelector('form');
    for (let i = 0; i < form.length; i++) {
        form[i].placeholder = "";
    }
}

const openForm = document.querySelector('#open-button');
openForm.addEventListener('click', toggleForm);

const closeForm = document.querySelector('#close-button')
closeForm.addEventListener('click', toggleForm);

// Funtions section
function Book(index, title, author, pages, read) {
    this.index = index;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function () {
    if (this.read) return `${this.title}\nby ${this.author}\nPages: ${this.pages}\nRead: Yes`
    else return `${this.title}\nby ${this.author}\nPages: ${this.pages}\nRead: No`
}

Book.prototype.toggleRead = function () {
    if (this.read === false) return this.read = true;
    if (this.read === true) return this.read = false;
}

function validateForm() {
    const form = document.querySelector('form');
    let error = 0;

    for (let i = 0; i < form.length; i++) {
        if (form[i].value === "") {
            form[i].placeholder = "* Please fill out this field";
            error++;
        }
    }

    if (error === 0) return addBookToLibrary();
    else return false;
}

let index = 0; // Counter for added books

function addBookToLibrary() {

    let book = new Book(
        index,
        inputTitle.value,
        inputAuthor.value,
        inputPages.value,
        inputRead.checked
    );

    index++;
    myLibrary.push(book); // Push book object to "library" (array)

    // Creates a div for the book info
    let div = document.createElement('div');
    div.classList.add('card');
    container.appendChild(div);

    // Select newly created card
    const card = container.lastChild;

    // Add book info into this div
    card.textContent = book.info();

    // Bind book index to this div to be able to removed by the user
    card.setAttribute('data-index', book.index);

    // Create read button for the book
    const readBtn = document.createElement('BUTTON');
    readBtn.textContent = "Read / Unread";
    readBtn.classList.add('read');
    card.appendChild(readBtn);

    // Add evenlistener for the read button
    const buttonRead = card.querySelector('.read');
    buttonRead.addEventListener('click', toggleRead);

    // Create remove button for the book
    const removeBtn = document.createElement('BUTTON');
    removeBtn.textContent = "Remove this book";
    removeBtn.classList.add('remove');
    card.appendChild(removeBtn);

    // Add evenlistener for the remove button
    const buttonRemove = card.querySelector('.remove');
    buttonRemove.addEventListener('click', removeBook);

    resetForm();
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

function toggleRead() {
    let bookIndex = this.parentNode.dataset.index;
    let pos = myLibrary.map(obj => obj.index).indexOf(+bookIndex);
    myLibrary[pos].toggleRead();
    clearCards();
    myLibrary.forEach(book => createCards(book));
}


// For removeBook function to create book-divs again to show updated library after removed item
function createCards(book) {

    createCard();

    const firstDiv = container.lastChild; // Select newly added div
    firstDiv.textContent = book.info(); // Adds book info into created div
    firstDiv.setAttribute('data-index', book.index);

    let readBtn = document.createElement('BUTTON');
    readBtn.textContent = "Read / Unread";
    readBtn.classList.add('read');
    firstDiv.appendChild(readBtn);

    const read = firstDiv.querySelector('.read');
    read.addEventListener('click', toggleRead);

    let removeBtn = document.createElement('BUTTON');
    removeBtn.textContent = "Remove this book";
    removeBtn.classList.add('remove');
    firstDiv.appendChild(removeBtn);

    const remove = firstDiv.querySelector('.remove');
    remove.addEventListener('click', removeBook);
}

function resetForm() {
    document.querySelector('#add-book').reset();
    if (inputRead.checked) inputRead.click();
}

function clearCards() {
    while (container.firstChild) container.removeChild(container.lastChild);
}

// Library
let myLibrary = [];

// Selectors
const inputTitle = document.querySelector('input[name="title"');
const inputAuthor = document.querySelector('input[name="author"');
const inputPages = document.querySelector('input[name="pages"');
const inputRead = document.querySelector('input[name="read"');
const container = document.querySelector('.container');

const addBookButton = document.querySelector('#submit');
addBookButton.addEventListener('click', validateForm);

