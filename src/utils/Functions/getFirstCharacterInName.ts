const getFirstCharacterInName = (name: string): string => {
  if (!name) return "";
  name = name.toUpperCase();
  const getLastSpaceIndex = name.lastIndexOf(" ");
  if (getLastSpaceIndex !== -1) {
    return name.charAt(0) + name.charAt(getLastSpaceIndex + 1);
  }
  return name.charAt(0);
};
export default getFirstCharacterInName;
