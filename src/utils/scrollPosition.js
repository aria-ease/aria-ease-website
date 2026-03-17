export const getActiveScrollTarget = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return { type: 'window', element: null };
  }

  const isScrollableElement = (element) => {
    if (!element) {
      return false;
    }

    const { overflowY } = window.getComputedStyle(element);
    return /(auto|scroll)/.test(overflowY) && element.scrollHeight > element.clientHeight;
  };

  const sideBody = document.querySelector('.side-body-div');
  if (isScrollableElement(sideBody)) {
    return { type: 'element', element: sideBody };
  }

  const mainContent = document.getElementById('main-content');
  if (isScrollableElement(mainContent)) {
    return { type: 'element', element: mainContent };
  }

  return { type: 'window', element: window };
};

export const getActiveScrollPosition = () => {
  const target = getActiveScrollTarget();
  if (target.type === 'element') {
    return target.element.scrollTop;
  }

  return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
};
