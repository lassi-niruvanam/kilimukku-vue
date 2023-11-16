export const இதற்காக_காற்றிரு = (செ: () => boolean): Promise<void> => {
  return new Promise((résoudre) => {
    if (செ()) résoudre();
    const மறந்துவிடு = setInterval(() => {
      if (செ()) {
        clearInterval(மறந்துவிடு);
        résoudre();
      }
    }, 100);
  });
};
