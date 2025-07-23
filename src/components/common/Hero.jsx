import React from 'react';
import backgroundImage from '../../assets/images/hero-img-card.jpg';

const Hero = () => {
  return (
    <section className="hero">
      <div
        className="hero__background"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
      <div className="hero__blur-stripes"></div>
      <div className="hero__orange-badge">
        <span>5 ans</span>
        <span>d'innovation</span>
      </div>
      <div className="hero__container container">
        <div className="hero__content">
          <h1 className="hero__title">
            Simplifiez vos interactions 
            avec
          </h1>
          <span className="hero__title-italic">Be-Smart</span>
          <p className="hero__description">
            Une plateforme innovante utilisant des cartes NFC et QR codes pour connecter particuliers, entreprises et restaurants.
            Profils dynamiques, commandes simplifiées et gestion sécurisée – tout en un seul scan.
          </p>
          <div className="hero__buttons">
            <button className="hero__button hero__button--primary">
              Découvrir Be-Smart
            </button>
            <button className="hero__button hero__button--secondary">
              Essayer gratuitement
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;