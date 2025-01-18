const myLibrary = [];

function Book(name, auth, page, read) {
    this.name = name;
    this.auth = auth;
    this.page = page;
    this.read = read;
    this.readStatus=function(){
    this.read=!this.read;
    };

    this.info = function() {
        return `${this.name} by ${this.auth}, ${this.page} pages, ${this.read ? 'read' : 'not read yet'}`;
    };
}

function addBookToLibrary(title, auth, page, read) {
    let addbook = new Book(title, auth, page, read);
    myLibrary.push(addbook);
}

function displayBooks() {
    const container = document.getElementById("library-container");
    container.innerHTML = "";  // Clear existing content

    myLibrary.forEach((book,index) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        const name = document.createElement("h3");
        name.textContent = book.name;
        bookCard.appendChild(name);

        const auth = document.createElement("p");
        auth.textContent = `Author: ${book.auth}`;
        bookCard.appendChild(auth);

        const page= document.createElement("p");
        page.textContent = `${book.page} pages`;
        bookCard.appendChild(page);

        const isRead = document.createElement("p");
        isRead.textContent = book.read ? "Read" : "Unread";
        bookCard.appendChild(isRead);

        const readStatus=document.createElement("button");
        readStatus.textContent=book.read?"Mark as Unread":"Mark as Read";
        readStatus.addEventListener("click",()=>{book.readStatus();
            displayBooks();});
        bookCard.appendChild(readStatus);
        
        const deleteButton=document.createElement("button");
        deleteButton.textContent="Remove";
        deleteButton.addEventListener("click",()=>{removeBook(index);});
        bookCard.appendChild(deleteButton);

        container.appendChild(bookCard);

    });
}

function submitBook() {
    const title = document.getElementById("book-name").value;
    const author = document.getElementById("book-author").value;
    const pages = document.getElementById("book-pages").value;
    const read = document.getElementById("book-read").checked;

    if (title && author && pages) {
        addBookToLibrary(title, author, parseInt(pages), read);
        displayBooks();  // Refresh the display with the newly added book
    } else {
        alert("Please fill in all fields.");
    }

    // Clear form fields
    document.getElementById("book-name").value = '';
    document.getElementById("book-author").value = '';
    document.getElementById("book-pages").value = '';
    document.getElementById("book-read").checked = false;
}
function removeBook(index)
{
    myLibrary.splice(index,1);
    displayBooks();
}