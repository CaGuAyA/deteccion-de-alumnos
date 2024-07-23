import { React, useState } from "react";
import "./styles/formLogin.css";
import { FormRecoverAccount } from "./FormRecoverAccount";
import { Captcha } from "../security/Captcha";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const FormLogin = ({
    handleFormLogin,
    handleActiveForm,
    handlePageChange,
}) => {
    const [usuario, setUsuario] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [showPwd, setShowPwd] = useState(false);
    const [viewRecuperarCuenta, setViewRecuperarCuenta] = useState(false);
    const [captchaText, setCaptchaText] = useState("");
    const [userInput, setUserInput] = useState("");

    const handleActiveFormRec = () => {
        setViewRecuperarCuenta(!viewRecuperarCuenta);
    };

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
            const formData = {
                tabla: "Usuario",
                correo: usuario,
                contraseña: contraseña,
            };
            handleFormLogin(formData);
        } else {
            console.log("CAPTCHA verification failed");
        }
    };

    return (
        <>
            {!viewRecuperarCuenta && (
                <div className="margenLogin">
                    <h3>Bienvenido a NutriRed</h3>
                    <p className="frase">
                        Sembrando Solidaridad, Cosechando Bienestar
                    </p>
                    <form
                        id="formLogin"
                        className="formLog"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="text"
                            id="usuario"
                            placeholder="Usuario"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                        />
                        <div>
                            <input
                                type={showPwd ? "text" : "password"}
                                id="contraseña"
                                placeholder="Contraseña"
                                value={contraseña}
                                onChange={(e) => setContraseña(e.target.value)}
                            />
                            <button
                                type="button"
                                className="show-password-btn"
                                onClick={() => setShowPwd(!showPwd)}
                            >
                                {showPwd ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <Captcha
                            userInput={userInput}
                            setUserInput={setUserInput}
                            setCaptchaText={setCaptchaText}
                        />
                        <button className="btnLog" type="submit">
                            Ingresar
                        </button>
                        <a className="google" href="#">
                            <img
                                src="/src/components/forms/images/googleSimb.png"
                                className="imagenGoogle"
                            ></img>
                            Ingresa con tu cuenta Google
                        </a>
                    </form>
                    <p className="texto-olvidaste-contaseña">
                        ¿Olvidaste tu contraseña?
                    </p>
                    <a
                        href="#"
                        className="btnRecuperarCuenta"
                        onClick={() => handleActiveFormRec()}
                    >
                        Recuperar cuenta
                    </a>
                    <a
                        href="#"
                        className="btnRegister"
                        onClick={() => handleActiveForm("register")}
                    >
                        Crear cuenta
                    </a>
                </div>
            )}
            {viewRecuperarCuenta && (
                <FormRecoverAccount
                    handleActiveFormRec={handleActiveFormRec}
                    handlePageChange={handlePageChange}
                />
            )}
        </>
    );
};
