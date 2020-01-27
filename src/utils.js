export function isValid(value) {
    return value.length >= 10
}

export function createModal(title, html) {
    const modalEl = document.createElement('div');
    modalEl.classList.add('modal')
    const content = `<h1>${title}</h1><div class="modal-content">${html}</div>`;
    modalEl.innerHTML = content
    mui.overlay('on', modalEl)
}