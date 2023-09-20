console.log('Hello Worlds');

//Book Library
let myLibrary = [];
let counter= 0;

function Book(Title, Author, Pages, Read, Change_Read, Delete, Count) {
  this.Title = Title;
  this.Author = Author;
  this.Pages = Pages;
  this.Read = Read;
  this.Change_Read = null;
  this.Delete = null;
  this.Count = counter;
  counter += 1;  
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

    //Skip Count Column
    if (key == "Count") {
      continue;
    }

    const headerCell = document.createElement('th');
    headerCell.textContent = key;
    headerRow.appendChild(headerCell);

  }
  table.appendChild(headerRow);

  // Create table data rows
  for (const obj of data) {
    const dataRow = document.createElement('tr');
    for (const key of keys) {

      //Skip Count Column
      if (key == "Count") {
        continue;
      }

      const dataCell = document.createElement('td');
      dataCell.textContent = obj[key];
      dataRow.appendChild(dataCell);

      //Add Buttons
      if (key == "Change_Read") {
        let button = document.createElement('button');
        let tB = document.createElement('tB');
        button.className = "btn_read";
        button.textContent = 'STATUS';
        button.addEventListener("click", SomeEditRowFunction )
        tB.append(button);
        dataRow.cells[4].append(tB);
      }

      if (key == "Delete") {
        let button = document.createElement('button');
        let tB = document.createElement('tB');
        button.className = "btn_delete";
        button.textContent = 'X';
        button.addEventListener("click", SomeDeleteRowFunction )
        tB.append(button);
        dataRow.cells[5].append(tB);
      }
    }
    table.appendChild(dataRow);
  }
  return table;
}

//// Button Functions
//Change Read from no to yes or vice versa.
function SomeEditRowFunction() {
  // console.log("me", this);
  // console.log("my parent",this.parentNode);
  // console.log("my GGparent",this.parentNode.parentNode.parentNode);
  var r = this.parentNode.parentNode.parentNode;
  rowTitle = r.cells[0].innerHTML;

  const result = myLibrary.findIndex(({ Title }) => Title === rowTitle);
  currentRead = myLibrary[result].Read;

  if (currentRead == "Yes") {
    myLibrary[result].Read = "No";
  }
  else {
    myLibrary[result].Read = "Yes";
  }

  makeTable(myLibrary);
}

//Delete this row
//May need add a check if there are 2 Titles with same name. Or not allow same Title names. 
function SomeDeleteRowFunction() {
  var p=this.parentNode.parentNode.parentNode;
  rowTitle = p.cells[0].innerHTML;

  myLibrary = myLibrary.filter((Book) => Book.Title != rowTitle);

  if (myLibrary.length === 0) {
    makeEmptyTable();
    return;
    
  }
  else {
  makeTable(myLibrary);
  }
}

//Example books\

addBookToLibrary('Example book', 'Example Author', '0', 'N/A');

// addBookToLibrary('Sapiens: A Brief History of Humankind', 
// 'Yuval Noah Harari', '464', 'no');

// addBookToLibrary('Antifragile: Things That Gain from Disorder', 
// 'Nassim Nicholas Taleb', '545','no');


let mytable = createTableFromObjects(myLibrary);
const tableContainer = document.getElementById('table-container');
mytable.deleteRow(-1);
tableContainer.appendChild(mytable);
myLibrary = [];

function makeEmptyTable() {
  mytable.remove();

  addBookToLibrary('Example book', 'Example Author', '0', 'N/A');

  mytable = createTableFromObjects(myLibrary);
  const tableContainer = document.getElementById('table-container');
  mytable.deleteRow(-1);
  tableContainer.appendChild(mytable);
  myLibrary = [];
}

function makeTable(aLibrary) {
  mytable.remove();
  mytable = createTableFromObjects(aLibrary);
  createTableFromObjects(aLibrary);
  tableContainer.appendChild(mytable);

}

// Form
const showButton = document.getElementById("buttonAdd");
const favDialog = document.getElementById("favDialog");
const outputBox = document.querySelector("output");
let currentStatus = '';
function myFunction(statusButton) {
  document.getElementsByName("status").value = statusButton;
  currentStatus = statusButton;
}

const confirmBtn = favDialog.querySelector("#confirmBtn");
const bookTitle = document.querySelector('#fTitle');

// "Show the dialog" button opens the <dialog> modally
showButton.addEventListener("click", () => {
  favDialog.showModal();
});

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
