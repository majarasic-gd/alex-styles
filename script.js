const projectModal = document.querySelector(".project-modal");

if (projectModal instanceof HTMLDialogElement) {
  const modalCategory = projectModal.querySelector(".modal-category");
  const modalTitle = projectModal.querySelector("#modal-title");
  const modalDescription = projectModal.querySelector("#modal-description");
  const closeButton = projectModal.querySelector(".modal-close");
  let modalTrigger = null;
  let isClosing = false;

  if (
    modalCategory instanceof HTMLElement &&
    modalTitle instanceof HTMLElement &&
    modalDescription instanceof HTMLElement &&
    closeButton instanceof HTMLButtonElement
  ) {
    document.querySelectorAll(".project-art").forEach((projectLink) => {
      projectLink.addEventListener("click", (event) => {
        const projectId = projectLink.getAttribute("href")?.slice(1);
        const projectDetail = projectId ? document.getElementById(projectId) : null;
        const projectCard = projectLink.closest(".project-card");
        const projectName = projectCard?.querySelector("h3");
        const projectCategory = projectCard?.querySelector(".project-meta p");
        const projectDescription = projectDetail?.querySelector("p:last-child");

        if (
          !(projectName instanceof HTMLElement) ||
          !(projectCategory instanceof HTMLElement) ||
          !(projectDescription instanceof HTMLElement)
        ) {
          return;
        }

        event.preventDefault();
        modalTrigger = projectLink;
        modalCategory.textContent = projectCategory.textContent;
        modalTitle.textContent = projectName.textContent;
        modalDescription.textContent = projectDescription.textContent;
        isClosing = false;
        projectModal.classList.remove("is-closing");
        projectModal.showModal();
      });
    });

    const closeProjectModal = () => {
      if (projectModal.open && !isClosing) {
        isClosing = true;
        projectModal.classList.add("is-closing");
      }
    };

    closeButton.addEventListener("click", closeProjectModal);

    projectModal.addEventListener("cancel", (event) => {
      event.preventDefault();
      closeProjectModal();
    });

    projectModal.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeProjectModal();
      }
    });

    projectModal.addEventListener("animationend", (event) => {
      if (
        event.target === projectModal &&
        event.animationName === "modal-out" &&
        isClosing
      ) {
        projectModal.close();
      }
    });

    projectModal.addEventListener("close", () => {
      projectModal.classList.remove("is-closing");
      isClosing = false;
      modalTrigger?.focus();
      modalTrigger = null;
    });

    projectModal.addEventListener("click", (event) => {
      if (event.target === projectModal) {
        closeProjectModal();
      }
    });

    projectModal.querySelector(".modal-contact")?.addEventListener("click", closeProjectModal);
  }
}
