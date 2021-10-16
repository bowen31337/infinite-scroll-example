// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

global.IntersectionObserver = class IntersectionObserver {
  constructor(private func, private options) {}

  observe(element: HTMLElement) {
    this.func([{ isIntersecting: true, target: element }]);
  }

  disconnect() {
    return null;
  }

  unobserve() {
    return null;
  }
};
