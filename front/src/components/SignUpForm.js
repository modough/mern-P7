import React, { Fragment, useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const handleRegister = async () => {
    const pseudoError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const controlPasswordError = document.querySelector(
      ".controlPassword.error"
    );

    if (password !== controlPassword) {
      controlPasswordError.innerHTML =
        "Les mots de passe ne correspoondent pas";
    } else {
      await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          pseudo,
          email,
          password,
        },
      })
        .then((res) => {
          if (res) {
            console.log(res);
            setFormSubmit(true);
          }
        })
        .catch((err) => {
          if (err.response.data.errors) {
            emailError.innerHTML = err.response.data.errors.email;
            passwordError.innerHTML = err.response.data.errors.password;
            pseudoError.innerHTML = err.response.data.errors.pseudo;
          }
        });
    }
  };

  return (
    <Fragment>
      {formSubmit ? (
        <Fragment>
          <SignInForm />
          <span></span>
          <h4 className="success">
            Enregistrement réussi, veuillez-vous connecter
          </h4>
        </Fragment>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="pseudo">Pseudo</label>
          <br />
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            onChange={(e) => setPseudo(e.target.value)}
            value={pseudo}
          />
          <div className="pseudo error"></div>
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="email error"></div>
          <br />
          <label htmlFor="password">Mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="password error"></div>
          <br />
          <label htmlFor="controlPassword">Confirmer le mot de passe</label>
          <br />
          <input
            type="password"
            name="email"
            id="controlPassword"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
          />
          <div className="controlPassword error"></div>
          <br />

          <input type="button" onClick={handleRegister} value="S'inscrire" />
        </form>
      )}
    </Fragment>
  );
};

export default SignUpForm;
