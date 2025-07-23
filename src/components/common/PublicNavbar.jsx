import React, { useState } from 'react';
import {
  MdSettings,
  MdPayment,
  MdMenu,
  MdMoney,
  MdMessage, // Remplace MdTelegram (icône générique pour messagerie)
  MdChat,
  MdEmail,
  MdHelpOutline,
  MdExpandMore,
} from 'react-icons/md';
import logo from '../../assets/images/logo-dark.png'

const PublicNavbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleMouseEnter = (dropdown) => {
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  return (
    <header className="header">
      <div className="header__container">
        <nav className="header__left">
          {/* Entrée */}
          <div
            className="header__dropdown"
            onMouseEnter={() => handleMouseEnter('entree')}
            onMouseLeave={handleMouseLeave}
          >
            {/* <button className="header__button">Entrée</button> */}
          </div>

          {/* Produits */}
          <div
            className="header__dropdown"
            onMouseEnter={() => handleMouseEnter('produits')}
            onMouseLeave={handleMouseLeave}
          >
            <button className="header__button header__button--with-icon">
              Produits
              <MdExpandMore className="header__icon-chevron" />
            </button>
            <div
              className={`header__dropdown-content ${
                activeDropdown === 'produits' ? 'header__dropdown-content--active' : ''
              }`}
            >
              <div className="header__dropdown-item">
                <MdSettings className="header__dropdown-icon" />
                <span className="header__dropdown-text">Conseils et avis</span>
              </div>
              <div className="header__dropdown-item">
                <MdPayment className="header__dropdown-icon" />
                <span className="header__dropdown-text">Payer la facture</span>
              </div>
              <div className="header__dropdown-item">
                <MdMenu className="header__dropdown-icon" />
                <span className="header__dropdown-text">Menu</span>
              </div>
              <div className="header__dropdown-item">
                <MdMoney className="header__dropdown-icon" />
                <span className="header__dropdown-text">Prépaiements</span>
              </div>
            </div>
          </div>

          {/* Support technique */}
          <div
            className="header__dropdown"
            onMouseEnter={() => handleMouseEnter('support')}
            onMouseLeave={handleMouseLeave}
          >
            <button className="header__button header__button--with-icon">
              Support technique
              <MdExpandMore className="header__icon-chevron" />
            </button>
            <div
              className={`header__dropdown-content ${
                activeDropdown === 'support' ? 'header__dropdown-content--active' : ''
              }`}
            >
              <div className="header__dropdown-item">
                <MdMessage className="header__dropdown-icon" />
                <span className="header__dropdown-text">Écrivez à Telegram</span>
              </div>
              <div className="header__dropdown-item">
                <MdChat className="header__dropdown-icon" />
                <span className="header__dropdown-text">Écrire sur WhatsApp</span>
              </div>
              <div className="header__dropdown-item">
                <MdEmail className="header__dropdown-icon" />
                <span className="header__dropdown-text">support@netmonet.co</span>
              </div>
              <div className="header__dropdown-item">
                <MdHelpOutline className="header__dropdown-icon" />
                <span className="header__dropdown-text">FAQ</span>
              </div>
            </div>
          </div>
        </nav>

        <div className="header__center">
          <div className="header__logo">
            <div className="header__logo">
                <img src={logo} alt="logo de Be-Smart" className="header__logo__img" />
            </div>
          </div>
        </div>

        <div className="header__right">
          <div className="header__phone">
            <a href="tel:+78005501442" className="header__phone-number">
              +1 514 465-85-70
            </a>
            <span className="header__phone-text">pour la connexion</span>
          </div>
          <button className="header__button header__button--primary">Connecter</button>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;