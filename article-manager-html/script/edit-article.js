document.addEventListener("DOMContentLoaded", async function () {
    const editArticleForm = document.getElementById("editArticleForm");
    const titleInput = document.getElementById("title");
    const bodyTextarea = document.getElementById("body");
    const publishedCheckbox = document.getElementById("published");
    const cancelButton = document.getElementById("cancelButton");

    // Get the article ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    // Fetch the article details
    try {
        const response = await fetch(`http://127.0.0.1:3000/api/v1/articles/${id}`);
        if (response.ok) {
            const article = await response.json();
            // Fill the form with article details
            titleInput.value = article.title;
            bodyTextarea.value = article.body;
            publishedCheckbox.checked = article.published;
        } else {
            console.error('Error fetching article:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching article:', error);
    }

    // Handle form submission
    editArticleForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = {
            title: titleInput.value,
            body: bodyTextarea.value,
            published: publishedCheckbox.checked
        };

        // Submit form data
        try {
            const response = await fetch(`http://127.0.0.1:3000/api/v1/articles/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                window.location.href = `/articles?id=${id}`;
            } else {
                console.error('Error editing article:', response.statusText);
            }
        } catch (error) {
            console.error('Error editing article:', error);
        }
    });

    // Handle cancel button click
    cancelButton.addEventListener("click", function () {
        window.location.href = `/articles?id=${id}`;
    });
});
