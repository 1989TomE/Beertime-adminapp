const formatTimestamp = timestamp => {
  const d = new Date(timestamp.replace(" ", "T"));
  return d.toDateString().slice(4);
};

const stringSimplification = string => {
  return string
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

const searchForName = (fullName, searchString) => {
  if (typeof fullName === "object")
    fullName = fullName.Fname + " " + fullName.Lname;

  const fullNameSimple = stringSimplification(fullName);
  const searchStringSimple = stringSimplification(searchString);

  return fullNameSimple.includes(searchStringSimple) ? true : false;
};

const deepClone = object => {
  return JSON.parse(JSON.stringify(object));
};

export { formatTimestamp, stringSimplification, searchForName, deepClone };
