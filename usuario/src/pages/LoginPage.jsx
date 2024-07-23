import { React, useState } from "react";
import { FormLogin } from "../components/forms/FormLogin";
import { FormRegister } from "../components/forms/FormRegister";
import { MessageCorrect } from "../components/messages/MessageCorrect";
import "./styles/loginPage.css";

export const LoginPage = ({ handleIdUsuario, idUsuario, handlePageChange }) => {
    const [activeForm, setActiveForm] = useState("login");

    const handleActiveForm = (event) => {
        setActiveForm(event);
    };

    const handleFormLogin = (formData) => {
        const queryString = Object.keys(formData)
            .map(
                (key) =>
                    `${encodeURIComponent(key)}=${encodeURIComponent(formData[key])}`,
            )
            .join("&");

        fetch(
            `https://ce229e31-c8fd-473e-aa93-03ba870ddd3d-00-uz6bc4qxcn55.spock.replit.dev/login?${queryString}`,
            {
                method: "GET",
            },
        )
            .then((response) => response.json())
            .then((data) => {
                console.log("Respuesta del servidor:", data);
                console.log(data.idUsuario);
                if (data.comparacion) {
                    handleIdUsuario(data.idUsuario);
                    console.log(idUsuario);
                }
            })
            .catch((error) => {
                console.error("Error al enviar datos al servidor:", error);
            });
    };

    const handleFormSubmit = (
        formData,
        formDataDonador,
        formDataBeneficiario,
        formDataVoluntario,
    ) => {
        fetch(
            "https://ce229e31-c8fd-473e-aa93-03ba870ddd3d-00-uz6bc4qxcn55.spock.replit.dev/api/registrar",
            {
                method: "POST",
                body: JSON.stringify(formData),
            },
        )
            .then((response) => response.json())
            .then((data) => {
                console.log("Respuesta del servidor:", data);

                if (Object.keys(formDataDonador).length > 0) {
                    fetch(
                        "https://ce229e31-c8fd-473e-aa93-03ba870ddd3d-00-uz6bc4qxcn55.spock.replit.dev/api/registrar",
                        {
                            method: "POST",
                            body: JSON.stringify(formDataDonador),
                        },
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            console.log("Respuesta del servidor:", data);
                        })
                        .catch((error) => {
                            console.error(
                                "Error al enviar datos al servidor:",
                                error,
                            );
                        });
                }

                if (Object.keys(formDataBeneficiario).length > 0) {
                    fetch(
                        "https://ce229e31-c8fd-473e-aa93-03ba870ddd3d-00-uz6bc4qxcn55.spock.replit.dev/api/registrar",
                        {
                            method: "POST",
                            body: JSON.stringify(formDataBeneficiario),
                        },
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            console.log("Respuesta del servidor:", data);
                        })
                        .catch((error) => {
                            console.error(
                                "Error al enviar datos al servidor:",
                                error,
                            );
                        });
                }

                if (Object.keys(formDataVoluntario).length > 0) {
                    fetch(
                        "https://ce229e31-c8fd-473e-aa93-03ba870ddd3d-00-uz6bc4qxcn55.spock.replit.dev/api/registrar",
                        {
                            method: "POST",
                            body: JSON.stringify(formDataVoluntario),
                        },
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            console.log("Respuesta del servidor:", data);
                        })
                        .catch((error) => {
                            console.error(
                                "Error al enviar datos al servidor:",
                                error,
                            );
                        });
                }
            })
            .catch((error) => {
                console.error("Error al enviar datos al servidor:", error);
            });
    };

    return (
        <div className="contFormularios">
            {activeForm === "login" && (
                <>
                    <FormLogin
                        handleFormLogin={handleFormLogin}
                        handleActiveForm={handleActiveForm}
                        handlePageChange={handlePageChange}
                    ></FormLogin>
                    {idUsuario != "" && (
                        <MessageCorrect
                            clase={"contenedor_acept"}
                            mensaje={"Bienvenido al sistema de NutriRed"}
                            handlePageChange={handlePageChange}
                            page={"inicio"}
                        />
                    )}
                </>
            )}
            {activeForm === "register" && (
                <>
                    <FormRegister
                        handleFormSubmit={handleFormSubmit}
                        handleActiveForm={handleActiveForm}
                    ></FormRegister>
                    {idUsuario != "" && <MessageCorrect />}
                </>
            )}
        </div>
    );
};
