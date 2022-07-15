// Créer les codes erreurs du login, signup et image

module.exports.signUpErrors = (err) => {
  let errors = { pseudo: "", email: "", password: "" };
  if (err.message.includes("pseudo")) errors.pseudo = "pseudo déjà utilisé";
  if (err.message.includes("email")) errors.email = "Email incorrect";
  if (err.message.includes("password"))
    errors.password = " Le mot de passe doit faire 6 caractéres minimum";
  if ((err.code = 11000)) errors.message = "Email déjà enregistré";

  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { email: "", password: "" };
  if (err.message.includes("email")) errors.email = "Email inconnu";
  if (err.message.includes("password"))
    errors.password = " Le mot de passe ne correspond pas";

  return errors;
};

module.exports.uploadErrors = (err) => {
  let errors = { format: "", maxSize: "" };
  if (err.message.includes("invalid file")) errors.format = "invalid file";
  if (err.message.includes("max size")) errors.maxSize = "max size";
  console.log(err)
  return errors;
};
