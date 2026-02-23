// Resources Page - Dynamic Article Loading
// This file loads resource cards from resources-data.json

document.addEventListener('DOMContentLoaded', function() {
    loadResources();
});

async function loadResources() {
    try {
        const response = await fetch('../resources-data.json');
        const resources = await response.json();

        const resourceCardsContainer = document.getElementById('resourceCards');

        if (resources.length === 0) {
            resourceCardsContainer.innerHTML = '<p class="text-center">No resources available at this time. Check back soon!</p>';
            return;
        }

        resources.forEach(resource => {
            const card = createResourceCard(resource);
            resourceCardsContainer.appendChild(card);
        });

    } catch (error) {
        console.error('Error loading resources:', error);
        document.getElementById('resourceCards').innerHTML = '<p class="text-center">Error loading resources. Please try again later.</p>';
    }
}

function createResourceCard(resource) {
    const card = document.createElement('a');
    card.className = 'resource-card';
    card.href = resource.url;

    const imageDiv = document.createElement('div');
    imageDiv.className = 'resource-card-image';

    if (resource.imagePlaceholder) {
        imageDiv.innerHTML = '<span class="placeholder-text">Image Placeholder</span>';
    } else if (resource.imageUrl) {
        const img = document.createElement('img');
        img.src = resource.imageUrl;
        img.alt = resource.title;
        imageDiv.appendChild(img);
    }

    const contentDiv = document.createElement('div');
    contentDiv.className = 'resource-card-content';

    const title = document.createElement('h3');
    title.className = 'resource-card-title';
    title.textContent = resource.title;

    const meta = document.createElement('p');
    meta.className = 'resource-card-description';
    meta.innerHTML = 'Last updated: ' + resource.date + '<br>Author: ' + resource.author;

    contentDiv.appendChild(title);
    contentDiv.appendChild(meta);

    card.appendChild(imageDiv);
    card.appendChild(contentDiv);

    return card;
}
