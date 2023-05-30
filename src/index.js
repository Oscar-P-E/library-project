import "./styles.css";
import libraryManager from "./libraryManager";

const main = document.getElementById("main");
const table = document.createElement("table");

const createTable = () => {
  table.innerHTML = "";
  const row = document.createElement("tr");
  const bookNameHeading = document.createElement("th");
  const bookAuthorHeading = document.createElement("th");
  const readStatusHeading = document.createElement("th");
  const deleteButtonHeading = document.createElement("th");

  table.classList.add("library-book-table");

  bookNameHeading.textContent = "Title";
  bookAuthorHeading.textContent = "Author";
  readStatusHeading.textContent = "Read";
  deleteButtonHeading.textContent = "Delete";

  row.appendChild(bookNameHeading);
  row.appendChild(bookAuthorHeading);
  row.appendChild(readStatusHeading);
  row.appendChild(deleteButtonHeading);
  table.appendChild(row);

  const { myLibrary } = libraryManager;

  const sortLibrary = (library) => {
    library.sort((a, b) => {
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
    library.forEach((book, index) => {
      book.id = index;
    });

    return library;
  };

  const sortedLibrary = sortLibrary(myLibrary);

  sortedLibrary.forEach((book) => {
    const bookRow = document.createElement("tr");
    const bookNameCell = document.createElement("td");
    const bookAuthorCell = document.createElement("td");
    const readStatusCell = document.createElement("td");
    const readStatusCheckbox = document.createElement("input");
    readStatusCheckbox.type = "checkbox";
    const deleteButtonCell = document.createElement("td");
    const deleteButton = document.createElement("button");

    bookRow.id = book.id;

    readStatusCheckbox.addEventListener("change", () => {
      if (readStatusCheckbox.checked) {
        libraryManager.changeIsRead(bookRow.id, 1);
      } else {
        libraryManager.changeIsRead(bookRow.id, 0);
      }
    });

    deleteButton.addEventListener("click", () => {
      libraryManager.removeBookFromLibrary(bookRow.id);
      document.getElementById("new-book-button").remove();
      createTable();
      createButton();
    });

    bookNameCell.textContent = book.bookName;
    bookAuthorCell.textContent = book.authorName;
    readStatusCheckbox.checked = book.isRead;
    deleteButton.textContent = "x";

    readStatusCell.appendChild(readStatusCheckbox);
    deleteButtonCell.appendChild(deleteButton);

    bookRow.appendChild(bookNameCell);
    bookRow.appendChild(bookAuthorCell);
    bookRow.appendChild(readStatusCell);
    bookRow.appendChild(deleteButtonCell);

    table.appendChild(bookRow);
  });

  main.appendChild(table);
};

const createButton = () => {
  const newBookButton = document.createElement("button");
  newBookButton.textContent = "NEW BOOK";
  newBookButton.id = "new-book-button";
  newBookButton.addEventListener("click", createForm);
  main.appendChild(newBookButton);
};

const createForm = () => {
  document.getElementById("new-book-button").remove();

  const form = document.createElement("form");
  form.id = "new-book-form";

  const bookTitleInput = document.createElement("input");
  bookTitleInput.type = "text";
  bookTitleInput.id = "book-title";
  bookTitleInput.name = "bookTitle";
  bookTitleInput.placeholder = "Enter Book Title";

  const bookAuthorInput = document.createElement("input");
  bookAuthorInput.type = "text";
  bookAuthorInput.id = "book-author";
  bookAuthorInput.name = "bookAuthor";
  bookAuthorInput.placeholder = "Enter Book Author";

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.innerText = "Submit";

  form.appendChild(bookTitleInput);
  form.appendChild(bookAuthorInput);
  form.appendChild(submitButton);

  document.body.appendChild(form);

  form.addEventListener("submit", handleFormSubmission);
};

const handleFormSubmission = (event) => {
  event.preventDefault();

  const form = event.target;
  const bookTitle = form.elements.bookTitle.value;
  const bookAuthor = form.elements.bookAuthor.value;

  if (bookTitle && bookAuthor) {
    libraryManager.addBookToLibrary(bookTitle, bookAuthor, false);
    form.reset();
    form.remove();
    createTable();
    createButton();
  }
};

createTable();
createButton();
