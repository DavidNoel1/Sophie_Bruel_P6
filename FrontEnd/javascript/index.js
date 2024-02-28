document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.querySelector('#portfolio .gallery');
    const filters = document.querySelector('#portfolio .categories-menu');
    const openModalButton = document.getElementById('open-modal-button');
    const loginLink = document.querySelector('nav ul li.login-title a');





    function main() {

        fetchCategoriesAndPopulateMenu();
        fetchAndDisplayWorks();
        checkLoginStatus();
        attachEventListeners();
    }
    main();

    function checkLoginStatus() {
        const token = sessionStorage.getItem("token"); // Vérifier si un token est stocké en session
        if (token) {
            loginLink.style.display = 'none'; // Masquer le lien "Login"
        } else {
            openModalButton.style.display = 'none'; // Masquer le bouton "Modifier" s'il n'y a pas de token en session
            loginLink.style.display = 'block'; // Afficher le lien "Login"
        }
    }

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

    // Fonction pour ouvrir la modale
    function openModal() {
        modal.style.display = 'block';
    }

    // Fonction pour fermer la modale
    function closeModal() {
        modal.style.display = 'none';
    }

    // Événement pour ouvrir la modale lors du clic sur le bouton
    openModalButton.addEventListener('click', openModal);

    // Événement pour fermer la modale lors du clic sur le bouton de fermeture
    closeModalButton.addEventListener('click', closeModal);

    // Événement pour fermer la modale lors du clic en dehors de celle-ci
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });



    /*function showAllWorks() {
        fetchAndDisplayWorks();
    }*/
});
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('modal');
    const openModalButton = document.getElementById('open-modal-button');
    const closeModalButton = document.querySelector('.close');
    function openModal() {
        modal.style.display = 'block';
    }

    // Fonction pour fermer la modale
    function closeModal() {
        modal.style.display = 'none';
    }

    // Événement pour ouvrir la modale lors du clic sur le bouton
    openModalButton.addEventListener('click', openModal);

    // Événement pour fermer la modale lors du clic sur le bouton de fermeture
    closeModalButton.addEventListener('click', closeModal);

    // Événement pour fermer la modale lors du clic en dehors de celle-ci
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });
});









