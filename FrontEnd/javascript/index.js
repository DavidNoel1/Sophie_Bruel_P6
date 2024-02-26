document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.querySelector('#portfolio .gallery');
    const filters = document.querySelector('#portfolio .categories-menu');





    function main() {

        fetchCategoriesAndPopulateMenu();
        fetchAndDisplayWorks();


    }
    main();


    function fetchCategoriesAndPopulateMenu() {
        fetch('http://localhost:5678/api/categories')
            .then(response => response.json())
            .then(categories => {
                

                categories.forEach(category => {
                    const buttonFilter = document.createElement('button');
                    buttonFilter.textContent = category.name;
                    buttonFilter.setAttribute("buttonId", category.id);
                    buttonFilter.classList.add("filterButton");
                    filters.appendChild(buttonFilter);
                });

                // Ajout d'un event au clic sur chaque bouton
                const buttonFilters = document.querySelectorAll(".categories-menu button");
                buttonFilters.forEach((buttonFilter) => {
                    buttonFilter.addEventListener("click", function () {
                        let categoryId = buttonFilter.getAttribute("buttonId");
                        filterWorksByCategory(categoryId);
                        toggleActiveButton(buttonFilter);

                    });
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
