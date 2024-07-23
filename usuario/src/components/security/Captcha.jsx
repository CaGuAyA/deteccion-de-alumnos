import { React, useState, useEffect } from "react";
import "./styles/captcha.css";

export const Captcha = ({ setUserInput, userInput, setCaptchaText }) => {
    const [captchaImage, setCaptchaImage] = useState("");

    const fetchCaptcha = async () => {
        try {
            const response = await fetch(
                "https://ce229e31-c8fd-473e-aa93-03ba870ddd3d-00-uz6bc4qxcn55.spock.replit.dev/api/captcha",
            );
            if (!response.ok) {
                throw new Error("Error al obtener el CAPTCHA");
            }
            const data = await response.json();
            setCaptchaText(data.captchaText);
            setCaptchaImage(data.captchaImage);
        } catch (error) {
            console.error("Error fetching captcha:", error);
        }
    };

    useEffect(() => {
        fetchCaptcha();
    }, []);

    return (
        <div className="contenedor_captcha">
            <div
                className="img_captcha"
                dangerouslySetInnerHTML={{ __html: captchaImage }}
            />
            <div className="cont_input_captcha">
                <input
                    type="text"
                    value={userInput}
                    onChange={(event) => setUserInput(event.target.value)}
                    placeholder="Introduzca el CAPTCHA"
                />
                <button type="button" onClick={fetchCaptcha}>
                    Nuevo
                </button>
            </div>
        </div>
    );
};
