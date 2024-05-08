document.getElementById('add-article-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const published = document.getElementById('published').checked;

    try {
        const response = await fetch('http://34.248.117.130:3000/api/v1/articles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, body, published })
        }).then(resp => {
            if (resp.status == 201) {
                resp.json().then((result => window.location.href = `/articles?id=${result}`))
            }
            else throw new Error("Unexpected response status.")
        });
    } catch (error) {
        console.error('Error adding article:', error);
    }
});