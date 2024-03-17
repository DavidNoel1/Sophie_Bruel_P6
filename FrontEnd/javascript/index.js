document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.querySelector('#portfolio .gallery');
    const filters = document.querySelector('#portfolio .categories-menu');

    const loginLink = document.querySelector('nav ul li.login-title a');

    const modal = document.getElementById('modal');
   
    const closeModalButton = document.querySelector('.close');

    let  openModalButton ;

    const MiniGallery = document.querySelector ('.mini-gallery');

    const modalContentGallery = document.querySelector('.modal-content-gallery');

    const modalContentFormAddWork = document.querySelector('.modal-content-formAddWork');
    
    const arrowSpan = document.createElement('span');
    arrowSpan.className = "fa-solid fa-arrow-left fa-lg";

    modalContentFormAddWork.prepend(arrowSpan);

    // Ajouter un gestionnaire d'événements à la flèche
    arrowSpan.addEventListener('click', function() {
        modalContentGallery.style.display = 'block';
        modalContentFormAddWork.style.display = 'none';
    });



    function main() {

        fetchCategoriesAndPopulateMenu();
        fetchAndDisplayWorks();
        modeAdmin();
        //attachEventListeners();
    }
    main();

    
    function modeAdmin() {
        const token = sessionStorage.getItem("token"); // Vérifier si un token est stocké en session
        if (token) {
           

            logout();
            adminDisplay()
            gestionModale();

        } 
    }

    function logout(){
        loginLink.innerHTML = 'logout'; // Masquer le lien "Login"
        loginLink.addEventListener("click", function (e) {
            e.preventDefault();
            sessionStorage.removeItem("token");
            window.location.href = "index.html";

        });
    }

    function adminDisplay() {
        // Création de la bannière noire
        const banner = document.getElementById('bannerEdit')
    
        banner.classList.add("blackBanner")
        banner.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>' + "Mode édition";
    
        // On masque les filtres
        const filters = document.querySelector(".categories-menu");
        filters.style.display = "none";
    
        // Modification de la margin sous le h2 'Mes Projets' 
        const portfolioTitle = document.querySelector(".project");
        portfolioTitle.style.marginBottom = "90px";
    
        // Ajout du bouton modifier
        const boutonEdit = document.createElement("a");
        boutonEdit.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>' + "modifier";
        boutonEdit.href = "#modal1";
       
        boutonEdit.setAttribute("id","open-modal-button");
        portfolioTitle.appendChild(boutonEdit)

        openModalButton = document.getElementById('open-modal-button');
        

        console.log("affichage openmodlae dans admindisplay")
        console.log(openModalButton)
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

    function openModal() {
        modal.style.display = 'block';
    modalContentGallery.style.display = 'block';
    modalContentFormAddWork.style.display = 'none';
    }

    // Fonction pour fermer la modale
    function closeModal() {
        modal.style.display = 'none';
    }

    function gestionModale() {

        console.log("affichage openmodlae dans gestionModale")
        console.log(openModalButton)

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

    }
    const buttonModal = document.querySelector('.button-modal');

    buttonModal.addEventListener('click', function() {
        modalContentGallery.style.display = 'none';
        modalContentFormAddWork.style.display = 'block';
    });




    /*function showAllWorks() {
        fetchAndDisplayWorks();
    }*/
});









