import React, { useState } from 'react';
import background from '../../assets/images/12right.jpg'
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login">
      <div className="login__container container">
        <div className="login__content">
          <div className="login__left">
            <div className="login__brand">
              <div className="login__logo">
                <div className="login__logo-dot"></div>
                <span>Be-Smart</span>
              </div>
            </div>
            
            <div className="login__welcome">
              <h1 className="login__title">Bonjour,</h1>
              <h2 className="login__subtitle">Bienvenu(e) dans le portail Smart</h2>
              <p className="login__description">Votre endroit spécial & smart</p>
            </div>
            
            <form className="login__form">
              <div className="login__input-group">
                <input type="email" className="login__input" placeholder="stanley@gmail.com" />
              </div>
              
              <div className="login__input-group login__input-group--password">
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="login__input" 
                  placeholder="••••••••••••" 
                />
                <button 
                  type="button" 
                  className="login__password-toggle" 
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <svg className="login__icon" viewBox="0 0 24 24" width="24" height="24">
                      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                    </svg>
                  ) : (
                    <svg className="login__icon" viewBox="0 0 24 24" width="24" height="24">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                  )}
                </button>
              </div>
              
              <div className="login__options">
                <div className="login__remember">
                  <input type="checkbox" id="remember" className="login__checkbox" />
                  <label htmlFor="remember" className="login__checkbox-label">Se souvenir de moi</label>
                </div>
                <a href="#" className="login__forgot">Forgot Password?</a>
              </div>
                <a href='/register' className="login__register">Vous n'avez pas de compte ? inscrivez-vous <span>ici</span></a>
              <button type="submit" className="login__button">Se connecter</button>
            </form>
          </div>
          
          <div className="login__right">
            <div className="login__illustration" 
             style={{
               backgroundImage: `url(${background})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
             }}
            >
              <div className="login__character">
                <div className="login__phone-wrapper">
                  {/* <div className="login__phone">
                    <div className="login__fingerprint"></div>
                    <div className="login__check-bubble"></div>
                    <div className="login__lock"></div>
                    <div className="login__cloud login__cloud--1"></div>
                    <div className="login__cloud login__cloud--2"></div>
                    <div className="login__cloud login__cloud--3"></div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;