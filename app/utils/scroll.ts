// utils/scroll.ts
export const smoothScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const header = document.querySelector('header');
      const headerOffset = header?.getBoundingClientRect().height ?? 0;
      const targetTop = element.getBoundingClientRect().top + window.scrollY - headerOffset - 12;

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: 'smooth',
      });
    }
};