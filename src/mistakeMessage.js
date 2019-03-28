export const loadingMessage = () => {
  const parent = document.querySelector(`.films-list__container`);
  const template = document
    .querySelector(`.loading-message`)
    .msGetRegionContent.querySelector(`h1`);
  parent.appendChild(template);
};
