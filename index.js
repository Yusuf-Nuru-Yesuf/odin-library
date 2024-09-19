const addBook = document.querySelector('#add-book');
const books = document.querySelector('.books');

addBook.addEventListener('click', openForm )

function openForm() {
    const dialogOpen = document.createElement('dialog');
    dialogOpen.className = "dialog";
    dialogOpen.open = true;

    const form = document.createElement('form');
    form.className = "form-container";

    const formTitle = document.createElement('h2');
    formTitle.textContent = "Add a Book";
    form.appendChild(formTitle);

    const formElements = createFormInput(inputData);
    formElements.forEach(container => {
        if (container instanceof Node) {
            form.appendChild(container);
        } else {
            console.error('Invalid container:', container);
        }
    });

    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = "btn";

    const submitButton = document.createElement('button');
    submitButton.type = "submit";
    submitButton.textContent = "Add Book";

    const closeButton = document.createElement('button');
    closeButton.className = "close-button";
    closeButton.textContent = "Close";

    buttonsContainer.appendChild(submitButton);
    buttonsContainer.appendChild(closeButton);

    form.appendChild(buttonsContainer);
    dialogOpen.appendChild(form);
    document.body.appendChild(dialogOpen);

    books.classList.add('blur');

    form.addEventListener('submit', submitForm, false);
    closeButton.addEventListener('click',  close);

    function submitForm(e) {
        e.preventDefault();

        const trimmedTitle = document.querySelector("#title").value.trim();
        const trimmedAuthor = document.querySelector("#author").value.trim();
        const pages = parseInt(document.querySelector("#pages").value.trim());
        const readStatus = document.querySelector("#read");

        if (myLibrary.some( book => book.title === trimmedTitle && book.author === trimmedAuthor)) {
            alert("This book is already in your library.");
            return;
        }

        if (trimmedTitle === "" || trimmedAuthor === "" || !Number.isInteger(pages) || pages < 0  ) {
                alert("Please fill out all fields.");
                return;
            }

        const newBook = new Book(trimmedTitle, trimmedAuthor, pages, readStatus.checked);

            myLibrary.push(newBook);
            addBookToLibrary(newBook);
            close();
    }

    function close() {
        books.classList.remove('blur');
        dialogOpen.close();
        form.reset();
    }

}

function createFormInput(inputData) {
    return inputData.map(data => {
        const container = document.createElement("div")
        container.className = data.containerClass;

        const label = document.createElement("label");
        label.textContent = data.labelText;
        label.htmlFor = data.inputAttributes.id;

        const input = document.createElement("input")
        Object.keys(data.inputAttributes).forEach(attr => {
            input[attr] = data.inputAttributes[attr];
        });

        container.appendChild(label);
        container.appendChild(input);

        return container;
    });
}

const inputData = [
    {
        containerClass: "form-input", labelText: "Title",
        inputAttributes: {type: "text", id: "title", className: "title", placeholder: "Never Finished", required: true}
    },
    {
        containerClass: "form-input", labelText: "Author",
        inputAttributes: {type: "text", id: "author", className: "author", placeholder: "David Goggins", required: true}
    },
    {
        containerClass: "form-input", labelText: "Pages",
        inputAttributes: {type: "number", id: "pages", className: "pages", placeholder: "220", required: true}
    },
    {
        containerClass: "form-input read-container", labelText: "Have you read this book?",
        inputAttributes: {type: 'checkbox', id: 'read', className: 'read-status', checked: false}
    }
]

const myLibrary = [
    { title: 'The Hobbit', author: 'J.R.R. Tolkien', pages: 295, readStatus: true },
    { title: 'The Catcher in the Rye', author: 'J.D. Salinger', pages: 214, readStatus: false },
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', pages: 180, readStatus: true },
    { title: 'The Hobbit', author: 'J.R.R. Tolkien', pages: 295, readStatus: true },
];

class Book {
    constructor (title, author, pages, readStatus) {
        this.title = title;
        this.author = author;
        this.pages = Number(pages) || 0;
        this.readStatus = Boolean(readStatus);
    }
}

function addBookToLibrary(book) {
        const bookCard = document.createElement('div');
        bookCard.className = "book";

        const title = document.createElement('h3');
        title.className = "title";
        title.textContent = `Title: ${book.title}`;

        const author = document.createElement('p');
        author.className = "author";
        author.textContent = `Author: ${book.author}`;

        const pages = document.createElement('p');
        pages.className = "pages";
        pages.textContent = `Pages: ${book.pages}`;

        const status = document.createElement('p');
        status.className = "status";
        status.textContent = "Status: ";

        const readStatus = document.createElement('button');
        readStatus.textContent = book.readStatus ? "Read" : "Not Read";


        readStatus.addEventListener('click', () => {
            book.status = !book.status;
            readStatus.textContent = book.status ? "Read" : "Not Read";

        });

        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(pages);
        status.appendChild(readStatus);
        bookCard.appendChild(status);
        books.appendChild(bookCard);
}

myLibrary.forEach(book => {
    addBookToLibrary(book);
});