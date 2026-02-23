// Article Page - Loads and renders a resource article from resources-data.json

document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));

    if (!id) {
        showError('No article specified.');
        return;
    }

    loadArticle(id);
});

async function loadArticle(id) {
    try {
        const response = await fetch('../resources-data.json');
        const resources = await response.json();
        const resource = resources.find(r => r.id === id);

        if (!resource) {
            showError('Article not found.');
            return;
        }

        // Set page title
        document.title = resource.title + ' - Rice MSA';

        // Populate header fields
        document.getElementById('articleTitle').textContent = resource.title;
        document.getElementById('articleAuthor').textContent = 'By ' + resource.author;
        document.getElementById('articleDate').textContent = resource.date;

        // Populate image
        const imageDiv = document.getElementById('articleImage');
        if (resource.imagePlaceholder) {
            imageDiv.innerHTML = '<div class="article-img-placeholder"><span>Image coming soon</span></div>';
        } else if (resource.imageUrl) {
            imageDiv.innerHTML = '<img src="' + resource.imageUrl + '" alt="' + resource.title + '" class="article-img">';
        }

        // Fetch and render markdown content
        const mdResponse = await fetch(resource.contentFile);
        if (!mdResponse.ok) {
            throw new Error('Could not load article content.');
        }
        const mdText = await mdResponse.text();
        document.getElementById('articleBody').innerHTML = marked.parse(mdText);

    } catch (error) {
        console.error('Error loading article:', error);
        showError('Failed to load article. Please try again later.');
    }
}

function showError(message) {
    document.getElementById('articleBody').innerHTML = '<p class="article-error">' + message + '</p>';
}
