import React, { useState } from 'react';

const Register = () => {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="register">
      <div className="register__container container">
        <h2 className="register__title">Créer un compte</h2>
        
       <div className="register__banner">
       <div className="register__photo-upload">
          <input 
            type="file" 
            id="profile-image" 
            accept="image/*" 
            onChange={handleImageUpload}
            className="register__file-input"
          />
          <label htmlFor="profile-image" className="register__photo-label">
            {profileImage ? (
              <img 
                src={profileImage} 
                alt="Profile" 
                className="register__preview-image" 
              />
            ) : (
              <div className="register__photo-placeholder">
                Télécharger une photo
              </div>
            )}
          </label>
        </div>

        <form className="register__form">
         <div className="register__form__inputs">
         <input 
            type="text" 
            placeholder="Nom" 
            className="register__input" 
          />
          <input 
            type="text" 
            placeholder="Prénom" 
            className="register__input" 
          />
         </div>
          <input 
            type="email" 
            placeholder="E-mail" 
            className="register__input" 
          />
          <input 
            type="password" 
            placeholder="Mot de passe" 
            className="register__input" 
          />
          <button type="submit" className="register__submit-btn">
            S'inscrire
          </button>
        </form>
       </div>
      </div>
    </div>
  );
};

export default Register;