import React, { useState, useEffect } from "react";
import "./styles/formRecoverAccount.css";
import { Captcha } from "../security/Captcha";
import { MessageCorrect } from "../messages/MessageCorrect";

export const FormRecoverAccount = ({
  handleActiveFormRec,
  handlePageChange,
}) => {
  const [correoEnviado, setCorreoEnviado] = useState(false);
  const [captchaText, setCaptchaText] = useState("");
  const [userInput, setUserInput] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(
      "https://ce229e31-c8fd-473e-aa93-03ba870ddd3d-00-uz6bc4qxcn55.spock.replit.dev/api/verify-captcha",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          captcha: userInput,
          captchaText: captchaText,
        }),
      },
    );

    const result = await response.json();
    if (result.success) {
      console.log("Form submitted successfully!");
      const correo = event.target.email.value;

      const response = await fetch(
        "https://ce229e31-c8fd-473e-aa93-03ba870ddd3d-00-uz6bc4qxcn55.spock.replit.dev/recuperar-contrasenia",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tabla: "Usuario",
            correo: correo,
          }),
        },
      );

      const result = await response.json();
      console.log(result);
      setCorreoEnviado(result.success);
    } else {
      console.log("CAPTCHA verification failed");
    }
  };

  return (
    <>
      <div className="margenLogin">
        <h2>Recuperar Cuenta</h2>
        <p className="recu_frase">
          No recuerda sus credenciaes, no hay problema
        </p>
        <form className="form_recu" onSubmit={handleSubmit}>
          <label className="ing_correo">Ingrese su correo electrónico</label>
          <input id="email" name="email" type="email" required />
          <Captcha
            userInput={userInput}
            setUserInput={setUserInput}
            setCaptchaText={setCaptchaText}
          />
          <button type="submit">Enviar nueva contraseña</button>
        </form>
        <a
          href="#"
          className="btnRegister"
          onClick={() => handleActiveFormRec(false)}
        >
          Ir a ingresar
        </a>
      </div>
      {correoEnviado && (
        <MessageCorrect
          clase={"contenedor_acept"}
          mensaje={
            "Se envio una nueva contraseña al correo electrónico proporcionado"
          }
          handlePageChange={handlePageChange}
          page={"inicio"}
        />
      )}
    </>
  );
};
