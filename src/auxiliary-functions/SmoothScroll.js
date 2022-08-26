export function smoothScroll(selector, topOffset) {
  const scrollTarget = document.querySelector(`${selector}`);
  if (scrollTarget !== null) {
    const elementPosition = scrollTarget.getBoundingClientRect().top;
    const offsetPosition = elementPosition - topOffset;

    window.scrollBy({
      top: offsetPosition,
      behavior: 'smooth',
    });
  } else return;
}
