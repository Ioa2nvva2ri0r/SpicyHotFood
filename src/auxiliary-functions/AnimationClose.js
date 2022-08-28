export function animationClose(elem, funClose, cssClass) {
  elem.classList.add(`${cssClass}`);
  setTimeout(() => {
    funClose(false);
    elem.classList.remove(`${cssClass}`);
  }, 395);
}

export function animationCloseCondition(
  event,
  elem,
  btn,
  closeElem,
  funClose,
  cssClass
) {
  if (
    !event.target.closest(btn) &&
    elem !== null &&
    !elem.contains(event.target)
  ) {
    animationClose(closeElem, funClose, cssClass);
  }
}
