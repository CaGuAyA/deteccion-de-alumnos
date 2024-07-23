import { React, useState } from "react";
import "./styles/menu.css";

export const Menu = ({ currentPage, handlePageChange, idUsuario }) => {
    const [isOpen, setIsOpen] = useState("inicio");
    const [isPhone, setIsPhone] = useState(false);

    const toggleMenu = (page_name) => {
        setIsOpen(page_name);
    };

    const generaPDF = (tabla1, tabla2, tabla3, tabla4, x) => {
        const queryString = `tabla1=${tabla1}&tabla2=${tabla2}&idUsuario=${idUsuario}&tabla3=${tabla3}&tabla4=${tabla4}&idDonante=${x}`;

        fetch(
            `https://ce229e31-c8fd-473e-aa93-03ba870ddd3d-00-uz6bc4qxcn55.spock.replit.dev/api/join?${queryString}`,
            {
                method: "GET",
            },
        )
            .then((response) => response.blob())
            .then((blob) => {
                const url = URL.createObjectURL(blob);
                window.open(url, "_blank");
            })
            .catch((error) => console.error("Error:", error));
    };

    return (
        <nav>
            <a
                className={`inicio ${isOpen === "inicio" ? "active" : ""}`}
                href="#"
                onClick={() => {
                    handlePageChange("inicio");
                    toggleMenu("inicio");
                }}
            >
                Inicio
            </a>
            <div
                className={`nav_toggle ${isPhone ? "open" : ""}`}
                onClick={() => setIsPhone(!isPhone)}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul>
                <li>
                    <a
                        className={`${isOpen === "generar_pdf" ? "active" : ""}`}
                        href="#"
                        onClick={() => {
                            generaPDF(
                                "Usuario",
                                "Donante",
                                "lleva_acabo",
                                "Donacion",
                                1,
                            );
                            toggleMenu("generar_pdf");
                        }}
                    >
                        Generar PDF
                    </a>
                </li>
                {/*
                <li><a
                    className={`${isOpen === 'notificaciones' ? 'active' : ''}`}
                    href="#"
                    onClick={() => { handlePageChange('Notificaciones'); toggleMenu('notificaciones') }}
                >
                    Notificaciones
                </a></li>
                */}
                <li>
                    <select
                        className={`${isOpen === "seg_y_ras" ? "active" : ""}`}
                        value={currentPage}
                        onChange={(event) => {
                            handlePageChange(event.target.value);
                            toggleMenu("seg_y_ras");
                        }}
                    >
                        <option value="">Seguimiento y Rastreo</option>
                        <option value="Solicitante">Solicitante</option>
                        <option value="Donante">Donante</option>
                    </select>
                </li>
                <li>
                    <a
                        className={`${isOpen === "norma" ? "active" : ""}`}
                        href="#"
                        onClick={() => {
                            handlePageChange("Normatividad");
                            toggleMenu("norma");
                        }}
                    >
                        Normatividad
                    </a>
                </li>
                <li>
                    <a
                        className={`${isOpen === "solicitar" ? "active" : ""}`}
                        href="#"
                        onClick={() => {
                            handlePageChange("Solicitar");
                            toggleMenu("solicitar");
                        }}
                    >
                        Solicitar
                    </a>
                </li>
                <li>
                    <a
                        className={`${isOpen === "donar" ? "active" : ""}`}
                        href="#"
                        onClick={() => {
                            handlePageChange("Donar");
                            toggleMenu("donar");
                        }}
                    >
                        Donar
                    </a>
                </li>
                <li>
                    <a
                        className={`${isOpen === "ingresar" ? "active" : ""}`}
                        href="#"
                        onClick={() => {
                            handlePageChange("Ingresar");
                            toggleMenu("ingresar");
                        }}
                    >
                        Ingresar
                    </a>
                </li>
            </ul>
        </nav>
    );
};
