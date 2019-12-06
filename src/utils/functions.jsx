import Joi from "@hapi/joi";
import { toast } from "react-toastify";

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

const validate = (value, name) => {
  const schema = Joi.object({
    default: Joi.string().pattern(
      /^[a-zA-Z0-9áčďéěíňóřšťůúýžÁČĎÉĚÍŇÓŘŠŤŮÚÝŽ ]*$/
    ),
    rowsToDisplay: Joi.number()
      .allow("")
      .max(100),
    searchInput: Joi.string()
      .allow("")
      .pattern(/^[a-zA-Z0-9áčďéěíňóřšťůúýžÁČĎÉĚÍŇÓŘŠŤŮÚÝŽ ]*$/),
    drink_count: Joi.number()
      .allow("")
      .min(0)
      .max(9),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "cz", "eu"] }
    }),
    password: Joi.string().min(1)
  });

  // set default or named validation
  const getSchemaHelper = name => {
    if (
      name === "rowsToDisplay" ||
      name === "searchInput" ||
      name === "email" ||
      name === "password"
    ) {
      return name;
    } else {
      return "default";
    }
  };

  const getSchema = getSchemaHelper(name);
  var result = schema.validate({ [getSchema]: value });

  if (result.error) {
    // dont show error message again if it has been shown already
    if (name === "searchInput")
      return "Pole vyhledávání může obsahovat pouze písmena a čísla.";
    else if (name === "rowsToDisplay")
      return "Pole může obsahovat pouze čísla menší nebo rovna 100.";
    else if (name === "email") return "Email není ve správném formátu";
    else if (name === "password") return "Pole Heslo musí být vyplněno";
    else return "Pole může obsahovat pouze písmena a čísla";
  }
  return null;
};

const saveAndDisplayInputErrors = (error, name, errors) => {
  // show and save error or delete it if error has been fixed
  if (error !== null) {
    // only if error is not present yet
    if (!errors[name]) {
      toast.error(error);
    }
  }
};

export {
  formatTimestamp,
  stringSimplification,
  searchForName,
  deepClone,
  validate,
  saveAndDisplayInputErrors
};
