let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.info = function() {
    return `${this.title}, ${this.author}, ${this.pages}, ${this.read}`
}

function addBookToLibarary(){
    title = prompt('Title?');
    author = prompt('Author?');
    pages = prompt('Pages in the book:');
    read = prompt('Have you read the book?');
    myLibrary.push(new Book(title, author, pages, read));
}