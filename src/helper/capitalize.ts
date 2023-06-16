export const capitalize = (text: string): string => {
   return text
      .trim()
      .split(' ')
      .map((word) => word[0].toLocaleUpperCase() + word.slice(1))
      .join(' ');
};
