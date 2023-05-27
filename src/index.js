import './styles.css';
import libraryManager from './libraryManager';

const main = document.getElementById('main');
const table = document.createElement('table');

const createTable = () => {
  table.innerHTML = '';
  const row = document.createElement('tr');
  const bookNameHeading = document.createElement('th');
  const bookAuthorHeading = document.createElement('th');

  table.classList.add('library-book-table');
  bookNameHeading.textContent = 'Title';
  bookAuthorHeading.textContent = 'Author';
  row.appendChild(bookNameHeading);
  row.appendChild(bookAuthorHeading);
  table.appendChild(row);

  const { myLibrary } = libraryManager;

  const sortedLibrary = myLibrary.slice().sort((a, b) => {
    const titleA = a.bookName.toUpperCase();
    const titleB = b.bookName.toUpperCase();
    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }
    return 0;
  });

  sortedLibrary.forEach((book) => {
    const bookRow = document.createElement('tr');
    const bookNameCell = document.createElement('td');
    const bookAuthorCell = document.createElement('td');

    bookNameCell.textContent = book.bookName;
    bookAuthorCell.textContent = book.authorName;

    bookRow.appendChild(bookNameCell);
    bookRow.appendChild(bookAuthorCell);
    table.appendChild(bookRow);
  });

  main.appendChild(table);
};

const createButton = () => {
  const newBookButton = document.createElement('button');
  newBookButton.textContent = 'NEW BOOK';
  newBookButton.id = 'new-book-button';
  newBookButton.addEventListener('click', createForm);
  main.appendChild(newBookButton);
};

const createForm = () => {
  document.getElementById('new-book-button').remove();

  const form = document.createElement('form');
  form.id = 'new-book-form';

  const bookTitleInput = document.createElement('input');
  bookTitleInput.type = 'text';
  bookTitleInput.id = 'book-title';
  bookTitleInput.name = 'bookTitle';
  bookTitleInput.placeholder = 'Enter Book Title';

  const bookAuthorInput = document.createElement('input');
  bookAuthorInput.type = 'text';
  bookAuthorInput.id = 'book-author';
  bookAuthorInput.name = 'bookAuthor';
  bookAuthorInput.placeholder = 'Enter Book Author';

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.innerText = 'Submit';

  form.appendChild(bookTitleInput);
  form.appendChild(bookAuthorInput);
  form.appendChild(submitButton);

  document.body.appendChild(form);

  form.addEventListener('submit', handleFormSubmission);
};

const handleFormSubmission = (event) => {
  event.preventDefault();

  const form = event.target;
  const bookTitleInput = form.elements.bookTitle;
  const bookAuthorInput = form.elements.bookAuthor;

  const bookTitle = bookTitleInput.value;
  const bookAuthor = bookAuthorInput.value;

  if (bookTitle && bookAuthor) {
    libraryManager.addBookToLibrary(bookTitle, bookAuthor);
    form.reset();
    form.remove();
    createTable();
    createButton();
  }
};

createTable();
createButton();
