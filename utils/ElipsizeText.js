
export const ElipsizeText = (text, n) => {
    return text.length > n
      ? `${text.substring(0, n)}...`
      : text;
}