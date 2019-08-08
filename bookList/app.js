// e5 - Adding books to the list ( using local storage )

// Book Constructor - the object what we manipulate in our app

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}



// UI Constructor - the methods used to manipulate the object
function UI() {} //Created prototype from which we can re use all methods
// 1. Add book to List
UI.prototype.addBookToList = function(book){
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

// 4. Delete book
UI.prototype.deleteBook = function(target) {
  if(target.className === 'delete'){
    target.parentElement.parentElement.remove();
  }

}



// 2. Clear input fields after submit clicked
UI.prototype.clearFields = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

// 3. Alert message display
UI.prototype.showAlert = function(message, className) {
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

// Event listeners (anything interactive that would happen in interface)

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
    // 2. Clear fields after submit clicked
    ui.clearFields();
  }

  e.preventDefault();
});

// 2. When delete button is clicked
document.getElementById('book-list').addEventListener('click',(e) => {
  const ui = new UI();
  ui.deleteBook(e.target);
  ui.showAlert('Book deleted','success');
  e.preventDefault();
});
