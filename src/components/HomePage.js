import React from 'react';
import PokemonData from './PokemonData'
import backgroundImage from './img/homepagebackground.jpg';

const HomePage = () => {
    const sectionStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition:'center',
        minHeight:'100vh',

    }

    return(
        <div style={sectionStyle}><PokemonData></PokemonData></div>
    )
};


export default HomePage;