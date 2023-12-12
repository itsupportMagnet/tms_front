export const formatColumnName = (columnName) => {
  return columnName.replace(/([a-z])(?=[A-Z])|(?<=[a-z])([A-Z])/g, (match, lower, upper) => {
    return lower ? `${lower} ` : upper;
  }).replace(/(?:^|\b)([a-zA-Z])/g, (match, firstLetter) => {
    return firstLetter.toUpperCase();
  });
};