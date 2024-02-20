document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.querySelector('#portfolio .gallery');
    const filters = document.querySelector('#portfolio .categories-menu');





    function main() {

        fetchCategoriesAndPopulateMenu();
        fetchAndDisplayWorks();
        toggleActiveButton();

    }
    main();


    function fetchCategoriesAndPopulateMenu() {
        fetch('http://localhost:5678/api/categories')
            .then(response => response.json())
            .then(categories => {
                filters.innerHTML = '';
    
                const allOption = document.createElement('button');
                allOption.textContent = 'Tous';
                allOption.classList.add("filterButton");
                allOption.setAttribute("buttonId", ""); 
                allOption.addEventListener('click', function() {
                    fetchAndDisplayWorks();
                    toggleActiveButton(allOption);
                });
                filters.appendChild(allOption);

                categories.forEach(category => {
                    const option = document.createElement('button');
                    option.textContent = category.name;
                    option.setAttribute("buttonId", category.id);
                    option.classList.add("filterButton");
                    option.addEventListener('click', function () {
                        let categoryId = option.getAttribute("buttonId");
                        filterWorksByCategory(categoryId);
                        toggleActiveButton(option);
                    });
                    filters.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }
    
    function toggleActiveButton(clickedButton) {
        const buttons = document.querySelectorAll(".categories-menu button");
        buttons.forEach(button => {
            if (button === clickedButton) {
                button.classList.add("filterButtonActive");
            } else {
                button.classList.remove("filterButtonActive");
            }
        });
    }


    function filterWorksByCategory(categoryId) {
        fetch(`http://localhost:5678/api/works`)
            .then(response => response.json())
            .then(works => {

                displayWorks(works, categoryId);
            })
            .catch(error => {
                console.error('Error filtering works by category:', error);
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

    function displayWorks(works, categoryId) {
        gallery.innerHTML = '';



        works.forEach(work => {
            if (categoryId == work.category.id || categoryId == null) {

                const figure = document.createElement('figure');
                const img = document.createElement('img');
                img.src = work.imageUrl;
                img.alt = work.title;
                const figcaption = document.createElement('figcaption');
                figcaption.textContent = work.title;

                figure.appendChild(img);
                figure.appendChild(figcaption);
                gallery.appendChild(figure);
            }
        });

    }



    /*function showAllWorks() {
        fetchAndDisplayWorks();
    }*/


});

