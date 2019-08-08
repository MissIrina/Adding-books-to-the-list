// e6 - Adding books to the list ( using local storage )

// Book class - the object what we manipulate in our app
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI class - the methods used to manipulate the object
class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');
    // Create row element inside table 'book-list'
    const row = document.createElement('tr');
    // Insert cols in this tr row
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X<a></td>
    `;
    list.appendChild(row);
  }

  showAlert(message,className) {
    // Create div for alert message
    const div = document.createElement('div');
    // Add class name to this div
    div.className = `alert ${className}`;
    // Add text to this div
    div.appendChild(document.createTextNode(message));
    // Get parent - where to insert this div
    const container = document.querySelector('.container');
    // Get form - the element above what will be inserted div alert
    const form = document.getElementById('book-form');
    // Insert alert div
    container.insertBefore(div, form);

    // Set timeout after 3 sec - remove alert
    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 2500);

  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }

  deleteBook(target) {
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }
  }
}

// Local Storage Class
class Store {

  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();
    books.forEach((book) => {
      const ui = new UI;

      // Add book to UI
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach((book,index) => {
      if(book.isbn === isbn) {
        books.splice(index, 1);
      }  
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}



// EVENT listeners (anything interactive that would happen in interface)

// 0. DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// 1. When sumbit button is clicked
document.getElementById('book-form').addEventListener('submit', (e) =>{
  // Get form input values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

  // Creating an instance of book
  const book = new Book(title, author, isbn); 
  // Creating an instance of methods
  const ui = new UI();

  // Validate input fields / Dont allow empty input
  if( title === '' || author === '' || isbn === ''){
    // 3.Error message alert
    ui.showAlert('Please fill in all fields','error');
  } else {
    // 3.Success message
    ui.showAlert('Book added','success');
    // 1. Add book to list
    ui.addBookToList(book);

    // Add to Local Storage
    Store.addBook(book);


    // 2. Clear fields after submit clicked
    ui.clearFields();
  }

  e.preventDefault();
});

// 2. When delete button is clicked
document.getElementById('book-list').addEventListener('click',(e) => {
  const ui = new UI();
  ui.deleteBook(e.target);

  //Remove from Local Storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  ui.showAlert('Book deleted','success');
  e.preventDefault();
});