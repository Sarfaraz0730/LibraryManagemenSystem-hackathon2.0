
  const PostDataURL = `http://localhost:8000/insertbook`;
  const adding_books =document.getElementById("adding_books")

async function postData(url = '', data = {}) {

    const response = await fetch(url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'

        },
        body: JSON.stringify(data) 
    });

    return response.json(); 
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    console.log("form",form)

    form.addEventListener('submit', async function (event) {
        event.preventDefault();


        const formData = new FormData(form);
        const bookData = {};

        formData.forEach((value, key) => {
            bookData[key] = value;
        });

        try {

            const h2 = document.createElement('h2')
            const response = await postData(PostDataURL, bookData);

            console.log('Success:', response);
            h2.innerHTML="Book added successfully"
            adding_books.append(h2)



        } catch (error) {
            console.error('Error:', error);
            alert("Something went wrong")

        }
    });
});
