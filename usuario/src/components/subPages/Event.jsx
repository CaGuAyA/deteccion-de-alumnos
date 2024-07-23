import { React, useState, useEffect } from 'react'
import { dataList } from './scripts/data.js';
import './styles/event.css'

export const Event = () => {
    const [index, setIndex] = useState(0);
    const [showMore, setShowMore] = useState(false);
    const hasNext = index < dataList.length - 1;

    useEffect(() => {
        const interval = setInterval(() => {
            handleNextClick();
        }, 5000); // 5000 milliseconds = 5 seconds

        return () => clearInterval(interval);

    }, [index]);

    function handleNextClick() {
        if (hasNext) {
            setIndex(index + 1);
        } else {
            setIndex(0);
        }
    }

    function handleMoreClick() {
        setShowMore(!showMore);
    }

    let data = dataList[index];
    return (
        <div className='contenedor_ventos' style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${data.url})` }} >
            <h2>{data.name}</h2>
            {!showMore && <p>{data.alt}</p>}
            {showMore && <p>{data.description}</p>}
            <button onClick={handleMoreClick}>
                {showMore ? 'Ocultar' : 'Mostrar'} detalles
            </button>
            <button onClick={handleNextClick}>
                Siguiente
            </button>
        </div>
    )
}
