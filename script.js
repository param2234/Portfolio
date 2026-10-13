const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

if (menuButton && navigation) {
  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    navigation.classList.remove("is-open");
  };

  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isExpanded));
    menuButton.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
    navigation.classList.toggle("is-open", !isExpanded);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuButton.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 521px)").matches) closeMenu();
  });
}

const landscape = document.querySelector(".landscape-art");
const mobileForest = document.querySelector(".mobile-forest");

const updateLandscapeViewBox = () => {
  if (!landscape || !mobileForest) return;
  const isCompact = window.matchMedia("(max-width: 760px)").matches;
  landscape.setAttribute("viewBox", isCompact ? "230 0 980 340" : "0 0 1440 340");
  mobileForest.setAttribute("visibility", isCompact ? "visible" : "hidden");
};

updateLandscapeViewBox();
window.addEventListener("resize", updateLandscapeViewBox);

// Force download for resume links
document.querySelectorAll('a[download]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const url = link.getAttribute('href');
    const filename = link.getAttribute('download');
    
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(blobUrl);
        document.body.removeChild(a);
      })
      .catch(() => {
        // Fallback: just open the link normally
        window.location.href = url;
      });
  });
});
