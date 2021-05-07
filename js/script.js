// ui elements 
let form = document.querySelector('#book-form');
let BookList = document.querySelector('#book-list');
// let  = document.querySelector('#');


// book class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
//Ui class
class UI {
    static addToBookList(book) {
        let list = document.querySelector('#book-list');
        let row = document.createElement('tr');
        row.innerHTML =`
         <td> ${book.title} </td>
         <td> ${book.author} </td>
         <td> ${book.isbn} </td>
         <td> <a href="#" class="delete"> X </a> </td>`;
        //   console.log(book);
        // console.log(row);
        list.appendChild(row);
    }
    
    static clearFields(){
        document.querySelector('#title').value = ''; 
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
    static showAlert(message, className){
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector('.container');
        let form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }
    static deleteFromBook(target) {
        if(target.hasAttribute('href')) {
            target.parentElement.parentElement.remove();

            Store.removeBook(target.parentElement.previousElementSibling.textContent.trim());
            
            UI.showAlert("Book Removed!", "warning");
        }
    }
}



// local storage
class Store {
    static getBooks() {
        let books;
        if( localStorage.getItem('books') === null ) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBooks(book) {
        let books = Store.getBooks();
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }
    
    // local storage items display 
    static displayBooks() {
        let books = Store.getBooks();

        books.forEach(book => {
            UI.addToBookList(book);
        });
    }

    // removing books from local storage
    static removeBook(isbn) {
        let books = Store.getBooks();
        
        books.forEach((book, index)=> {    
        if(book.isbn === isbn) {
            books.splice(index, 1);
        }
        })

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// event listner
form.addEventListener('submit', newBook);
BookList.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded', Store.displayBooks());


// defining newBook
function newBook(e) {
let title = document.querySelector('#title').value, 
    author = document.querySelector('#author').value,
    isbn = document.querySelector('#isbn').value;


    if(title === '' || author === '' || isbn === ''){
        UI.showAlert("Please fill all the fields", "error");
    } else {
    let book = new Book(title, author, isbn);
    
    UI.addToBookList(book);

    UI.clearFields();
    e.preventDefault();

    UI.showAlert("Successfully Added", "success");

    Store.addBooks(book);
    }
}

function removeBook(e) {
    
    UI.deleteFromBook(e.target);
    e.preventDefault();
}

