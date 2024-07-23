import { React, useState } from 'react';
import {Event} from '../components/subPages/Event'
import './styles/homePage.css';

export const HomePage = () => {
    return (
        <div className='home_page'>
            <Event/>
        </div>
    );
}
