console.log('Hello Worlds');

//Library
let myLibrary = [];

function Book(Title, Author, Pages, Read) {
  this.Title = Title;
  this.Author = Author;
  this.Pages = Pages;
  this.Read = Read;
  
}

function addBookToLibrary(Title, Author, Pages, Read) {
  const aBook = new Book(Title, Author, Pages, Read);
  myLibrary.push(aBook);
}

/////// Create Table
function createTableFromObjects(data) {
  const table = document.createElement('table');
  const headerRow = document.createElement('tr');
  
  // Create table header row
  const keys = Object.keys(data[0]);
  for (const key of keys) {
    const headerCell = document.createElement('th');
    headerCell.textContent = key;
    headerRow.appendChild(headerCell);
  }
  table.appendChild(headerRow);

  // Create table data rows
  for (const obj of data) {
    const dataRow = document.createElement('tr');
    for (const key of keys) {
      const dataCell = document.createElement('td');
      dataCell.textContent = obj[key];
      dataRow.appendChild(dataCell);
    }
    table.appendChild(dataRow);
  }

  return table;
}

//Example books

addBookToLibrary('Example book', 
'Example Author', '0', 'N/A');

// addBookToLibrary('Sapiens: A Brief History of Humankind', 
// 'Yuval Noah Harari', '464', 'no');

// addBookToLibrary('Antifragile: Things That Gain from Disorder', 
// 'Nassim Nicholas Taleb', '545','no');


let mytable = createTableFromObjects(myLibrary);
const tableContainer = document.getElementById('table-container');
mytable.deleteRow(-1);
tableContainer.appendChild(mytable);
myLibrary = [];




// Form
const showButton = document.getElementById("buttonAdd");
const favDialog = document.getElementById("favDialog");
const outputBox = document.querySelector("output");
let currentStatus = '';
function myFunction(statusButton) {
  document.getElementsByName("status").value = statusButton;
  currentStatus = statusButton;
  // console.log(currentStatus);
}
const confirmBtn = favDialog.querySelector("#confirmBtn");
const bookTitle = document.querySelector('#fTitle');

// "Show the dialog" button opens the <dialog> modally
showButton.addEventListener("click", () => {
  favDialog.showModal();
});

// // "Cancel" button closes the dialog without submitting because of [formmethod="dialog"], triggering a close event.
// favDialog.addEventListener("close", (e) => {
//   currentStatus = '';
//   // outputBox.value =
//   //   favDialog.returnValue === "default"
//   //     ? "No return value."
//   //     : `ReturnValue: ${favDialog.returnValue}.`; // Have to check for "default" rather than empty string
// });

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener("click", (event) => {
  event.preventDefault(); // We don't want to submit this fake form
  favDialog.close();
  addBookToLibrary(document.getElementById("fTitle").value, document.getElementById("fauthor").value, document.getElementById("fpages").value, currentStatus);
  mytable.remove();
  mytable = createTableFromObjects(myLibrary);
  createTableFromObjects(myLibrary);
  tableContainer.appendChild(mytable);

});
