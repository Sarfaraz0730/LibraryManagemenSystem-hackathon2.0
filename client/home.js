

    const mainDiv = document.getElementById('main');

    function getAllTheBooks() {
        const URL = "http://localhost:8000/getBooks";
        fetch(URL)
            .then(response => response.json())
            .then(data => {
                console.log("data", data);
                mainDiv.innerHTML = ""; 

                const table = document.createElement('table');
                const headerRow = document.createElement('tr');

               
                ['Title', 'Author', 'Genre', 'Publication Year', 'Copies Available', 'Actions'].forEach(headerText => {
                    const header = document.createElement('th');
                    header.textContent = headerText;
                    headerRow.appendChild(header);
                });

                table.appendChild(headerRow);

             
                data.forEach(book => {
                    const row = document.createElement('tr');

                    ['title', 'author', 'genre', 'publication_year', 'copies_available'].forEach(columnKey => {
                        const cell = document.createElement('td');
                        cell.textContent = book[columnKey];
                        row.appendChild(cell);
                    });

                
                    const actionsCell = document.createElement('td');
                    const editButton = document.createElement('button');
                    const deleteButton = document.createElement('button');

                    editButton.classList.add('edit-btn');
                    editButton.textContent = 'Edit';
                    editButton.addEventListener('click', () => editBook(book._id));

                    deleteButton.classList.add('delete-btn');
                    deleteButton.textContent = 'Delete';
                    deleteButton.addEventListener('click', () => deleteBook(book._id));

                    actionsCell.appendChild(editButton);
                    actionsCell.appendChild(deleteButton);

                    row.appendChild(actionsCell);
                    table.appendChild(row);
                });

                mainDiv.appendChild(table);
            });
    }

    function editBook(bookId) {
       
        window.location.href = `./editBook.html?id${bookId}` ;
        const editUrl =`http://localhost:8000/updateBook/${bookId}`
        console.log('Edit book with ID:', bookId);
    }

    function deleteBook(bookId) {
  
        const deletURL = `http://localhost:8000/deleteBook/${bookId}`;

        fetch(deletURL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                console.log('Book deleted successfully with ID:', bookId);
               
                getAllTheBooks();
            })
            .catch(error => {
                console.error('Error deleting book:', error);
            });

      
        getAllTheBooks();
    }


