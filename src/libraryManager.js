const libraryManager = (() => {
  const myLibrary = [];

  class Book {
    constructor(bookName, authorName, isRead) {
      this.bookName = bookName;
      this.authorName = authorName;
      this.isRead = isRead;
    }
  }

  const standardiseAuthorName = (authorName) => {
    let splitName = authorName.replace(/\./g, " ").split(/\s+/);
    const surname =
      splitName[splitName.length - 1].charAt(0).toUpperCase() +
      splitName[splitName.length - 1].slice(1).toLowerCase();
    splitName.splice(-1, 1);

    if (splitName.length === 0) {
      return surname;
    }
    splitName = splitName.map((part) => `${part.charAt(0).toUpperCase()}.`);
    return `${splitName.join(" ")} ${surname}`;
  };

  const addBookToLibrary = (bookName, authorName, isRead) => {
    if (typeof isRead !== "boolean") {
      throw new Error("isRead must be a boolean value");
    }
    const standardisedAuthorName = standardiseAuthorName(authorName);
    if (
      myLibrary.some(
        (entry) =>
          entry.bookName === bookName &&
          entry.authorName === standardisedAuthorName
      )
    ) {
      throw new Error(
        `Book ${bookName}, ${standardisedAuthorName} already exists`
      );
    }
    const book = new Book(bookName, standardisedAuthorName, isRead);
    myLibrary.push(book);
  };

  const changeIsRead = (index, bool) => {
    myLibrary[index].isRead = bool;
  };

  const removeBookFromLibrary = (index) => {
    if (index < 0 || index >= myLibrary.length) {
      throw new Error("Invalid index");
    }
    myLibrary.splice(index, 1);
  };

  return {
    addBookToLibrary,
    changeIsRead,
    removeBookFromLibrary,
    myLibrary,
  };
})();

// Test:
// libraryManager.addBookToLibrary("Harry Potter", "J K Rowling");
// libraryManager.addBookToLibrary("Harry Potter", "J K Rowling");
// libraryManager.addBookToLibrary("Harry Potter", "J. K. Rowling");
libraryManager.addBookToLibrary("Harry Potter", "J.K. Rowling", false);
// libraryManager.addBookToLibrary("Harry Potter", "Joanne Kathleen Rowling");
libraryManager.addBookToLibrary("The Iliad", "Homer", true);
libraryManager.addBookToLibrary("1984", "George Orwell", true);
// console.table(libraryManager.myLibrary);
// console.log("Successfully got to this point");

export default libraryManager;
