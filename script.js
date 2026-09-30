// Show all milestones or filter by commitments and reported progress.
const filterButtons = document.querySelectorAll(".filter-button");
const milestones = document.querySelectorAll(".milestone");
const milestoneCount = document.querySelector(".milestone-count");
const newsletterForm = document.querySelector(".newsletter-form");
const newsletterStatus = document.querySelector("#newsletter-status");
const bootstrapStylesheet = document.querySelector("#bootstrap-stylesheet");

// These language tags normally read from right to left.
const rtlLanguages = new Set(["ar", "arc", "ckb", "dv", "fa", "he", "khw", "ks", "ku", "nqo", "ps", "sd", "syr", "ug", "ur", "yi"]);
const rtlScripts = /-(Arab|Hebr|Thaa|Nkoo|Adlm|Syrc)(-|$)/i;

function isRtlLanguage(language) {
  const languageTag = language.trim();
  const languageCode = languageTag.split("-")[0].toLowerCase();

  return rtlLanguages.has(languageCode) || rtlScripts.test(languageTag);
}

function updatePageDirection() {
  const root = document.documentElement;
  const bodyClasses = document.body.classList;
  const rootClasses = root.classList;
  const translatedRtl = rootClasses.contains("translated-rtl") || bodyClasses.contains("translated-rtl");
  const translatedLtr = rootClasses.contains("translated-ltr") || bodyClasses.contains("translated-ltr");
  const pageLanguage = root.lang || document.body.lang || "en";
  const isRtl = translatedRtl || (!translatedLtr && isRtlLanguage(pageLanguage));
  const direction = isRtl ? "rtl" : "ltr";
  const bootstrapFile = isRtl ? "bootstrap.rtl.min.css" : "bootstrap.min.css";

  if (root.dir !== direction) {
    root.dir = direction;
  }

  if (!bootstrapStylesheet.href.endsWith(bootstrapFile)) {
    bootstrapStylesheet.href = `https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/${bootstrapFile}`;
  }
}

updatePageDirection();

const languageObserver = new MutationObserver(updatePageDirection);
languageObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "lang"] });
languageObserver.observe(document.body, { attributes: true, attributeFilter: ["class", "lang"] });
window.addEventListener("languagechange", updatePageDirection);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;
    let visibleCount = 0;

    filterButtons.forEach((filterButton) => {
      const isSelected = filterButton === button;
      filterButton.classList.toggle("is-active", isSelected);
      filterButton.setAttribute("aria-pressed", isSelected);
    });

    milestones.forEach((milestone) => {
      const shouldShow = selectedFilter === "all" || milestone.dataset.type === selectedFilter;
      milestone.hidden = !shouldShow;

      if (shouldShow) {
        visibleCount += 1;
      }
    });

    const milestoneWord = visibleCount === 1 ? "milestone" : "milestones";
    milestoneCount.textContent = `Showing ${visibleCount} ${milestoneWord}`;
  });
});

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  newsletterStatus.textContent = "Thanks for trying the preview. Your email address was not sent.";
});