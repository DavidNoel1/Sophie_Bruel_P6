document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('#portfolio .gallery');

    function fetchCategoriesAndPopulateMenu() {
        fetch('http://localhost:5678/api/categories')
            .then(response => response.json())
            .then(categories => {
                const menu = document.createElement('ul');
                menu.classList.add('categories-menu');

                const allOption = document.createElement('li');
                allOption.textContent = 'Tous';
                allOption.addEventListener('click', () => {
                    showAllWorks();
                });
                menu.appendChild(allOption);

                categories.forEach(category => {
                    const option = document.createElement('li');
                    option.textContent = category.name;
                    option.addEventListener('click', () => {
                        filterWorksByCategory(category.id);
                    });
                    menu.appendChild(option);
                });

                const header = document.querySelector('header nav ul');
                header.appendChild(menu);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }
    function fetchAndDisplayWorks() {
        fetch('http://localhost:5678/api/works')
            .then(response => response.json())
            .then(works => {
                displayWorks(works);
            })
            .catch(error => {
                console.error('Error fetching works:', error);
            });
    }

    function displayWorks(works) {
        gallery.innerHTML = '';
        
        works.forEach(work => {
            const figure = document.createElement('figure');
            const img = document.createElement('img');
            img.src = work.imageUrl;
            img.alt = work.title;
            const figcaption = document.createElement('figcaption');
            figcaption.textContent = work.title;
            
            figure.appendChild(img);
            figure.appendChild(figcaption);
            gallery.appendChild(figure);
        });
    }

    function filterWorksByCategory(categoryId) {
        fetch(`http://localhost:5678/api/works?categoryId=${categoryId}`)
            .then(response => response.json())
            .then(works => {
                displayWorks(works);
            })
            .catch(error => {
                console.error('Error filtering works by category:', error);
            });
    }

    function showAllWorks() {
        fetchAndDisplayWorks();
    }

    fetchCategoriesAndPopulateMenu();
    fetchAndDisplayWorks();
});

