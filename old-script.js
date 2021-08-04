let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`
}

function addBookToLibarary() {
    title = textInputs[0].value;
    author = textInputs[1].value;
    pages = textInputs[2].value;
    read = textInputs[3].value;
    myLibrary.push(new Book(title, author, pages, read));
    return console.log("Book added");
}

const textInputs = document.querySelectorAll('input[type="text"');
const submit = document.querySelector('input[type="submit"');

submit.addEventListener('click', () => {
    addBookToLibarary(); // Add book
    textInputs.forEach(input => input.value = ""); // Clear text inputs
});

function showLibrary() {
    myLibrary.forEach(book => console.log(book.info()));
}

myLibrary.push(new Book("Raamattu", 'Jumala', '1400', 'Olen lukenut'));
myLibrary.push(new Book("Vapautettu muuttumaan", 'Juha Ketola', '125', 'Olen lukenut'));

function isEmpty(item) {
    (item.textLength === 0) ? console.log("true") : console.log("false")
}