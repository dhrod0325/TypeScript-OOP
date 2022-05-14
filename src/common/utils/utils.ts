export function getRandomRange(start: number, end: number) {
  return Math.floor(Math.random() * (end - start + 1) + start);
}

export function createElement(html: string): HTMLElement {
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content.firstElementChild as HTMLElement;
}

export function createCustomElement(name: string, clazz: any) {
  if (!customElements.get(name)) {
    customElements.define(name, clazz);
  }
}
