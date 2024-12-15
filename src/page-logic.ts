import { gsap } from "gsap";

// Configuration Constants
const PAGE_WIDTH = 918;
const PAGE_HEIGHT = 960;
const PAGE_MARGIN_TOP = 120;
const PAGE_MARGIN_SIDE = 80;
const VIEWPORT_WIDTH = window.innerWidth;

// Page Management State
let pages: HTMLElement[] = []; // List of all opened pages
let zIndexCounter = 10; // To manage z-index

// Function to open a new page
export function openPage(contentId: string) {
  // Create a new page element
  const page = document.createElement("div");
  page.classList.add("page");
  page.style.width = `${PAGE_WIDTH}px`;
  page.style.height = `${PAGE_HEIGHT}px`;
  page.style.position = "fixed";
  page.style.top = `${PAGE_MARGIN_TOP}px`;
  page.style.overflow = "auto"; // To make content scrollable
  page.dataset.contentId = contentId;
  page.style.zIndex = `${zIndexCounter++}`; // Assign a higher z-index
  document.body.appendChild(page);

  // Set initial position (off-screen, bottom)
  gsap.set(page, {
    x: (VIEWPORT_WIDTH - PAGE_WIDTH) / 2,
    y: "100%",
  });

  // Animate into view
  gsap.to(page, {
    y: PAGE_MARGIN_TOP,
    duration: 0.5,
    ease: "power2.out",
  });

  // Add page to the array
  pages.push(page);

  // Recalculate positions
  recalculatePagePositions();

  // Add hover effect to bring focus
  page.addEventListener("mouseenter", () => focusPage(page));
}

// Function to close a page
export function closePage(contentId: string) {
  const pageIndex = pages.findIndex(
    (p) => p.dataset.contentId === contentId
  );

  if (pageIndex !== -1) {
    const page = pages[pageIndex];

    // Animate out and remove
    gsap.to(page, {
      y: "100%",
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        page.remove();
        pages.splice(pageIndex, 1);
        recalculatePagePositions();
      },
    });
  }
}

// Function to recalculate positions
function recalculatePagePositions() {
  const totalWidth = pages.length * PAGE_WIDTH;
  const overlapWidth = totalWidth - VIEWPORT_WIDTH + 2 * PAGE_MARGIN_SIDE;

  // Calculate starting X position
  let leftX = overlapWidth > 0 ? PAGE_MARGIN_SIDE : (VIEWPORT_WIDTH - totalWidth) / 2;

  // Update each page's position
  pages.forEach((page, index) => {
    gsap.to(page, {
      x: leftX + index * PAGE_WIDTH,
      duration: 0.5,
      ease: "power2.out",
    });
  });
}

// Function to focus a page (bring to front)
function focusPage(page: HTMLElement) {
  pages.forEach((p) => {
    if (p === page) {
      p.style.zIndex = `${zIndexCounter++}`;
    }
  });
}

// Attach event listeners to grid items for opening pages
const gridItems = document.querySelectorAll(".grid-item");
gridItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    const contentId = (event.currentTarget as HTMLElement).dataset.contentId;
    if (contentId) openPage(contentId);
  });
});
