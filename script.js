// Show all milestones or filter by commitments and reported progress.
const filterButtons = document.querySelectorAll(".filter-button");
const milestones = document.querySelectorAll(".milestone");
const milestoneCount = document.querySelector(".milestone-count");

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