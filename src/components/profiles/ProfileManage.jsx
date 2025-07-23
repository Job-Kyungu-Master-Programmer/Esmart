import React, { useState, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import { QRCodeSVG } from 'qrcode.react';
import 'react-image-crop/dist/ReactCrop.css';
import { PiInstagramLogoLight } from "react-icons/pi";
import { IoLogoWhatsapp } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import { CgMenuGridO } from "react-icons/cg";
import { RiImageAddLine } from "react-icons/ri";
import { IoArrowBackOutline, IoCloseOutline, IoSearchOutline, IoChevronForwardOutline, IoChevronDownOutline } from "react-icons/io5";
import { FiEdit2 } from "react-icons/fi";
import { BiToggleLeft, BiToggleRight } from "react-icons/bi";
import thumb from '../../assets/images/thumb.jpg';
import { IoQrCode } from "react-icons/io5";
import { MdSaveAlt } from "react-icons/md";
import { MdOutlineLocalPhone } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { RiGlobalLine } from "react-icons/ri";
import { MdWork } from "react-icons/md";
import { LiaMapSolid } from "react-icons/lia";
import { GoShare } from "react-icons/go";

import {
  FaThreads, FaXTwitter, FaTiktok, FaSnapchat, FaAmazon, FaAndroid,
  FaApple, FaDiscord, FaEtsy, FaGithub, FaLinkedin, FaMastodon,
  FaPatreon, FaPinterest, FaSoundcloud, FaSpotify, FaTelegram,
  FaTwitch, FaGlobe, FaYoutube, FaWhatsapp, FaFacebook, FaBandcamp
} from "react-icons/fa6";
import { SiApplemusic, SiAppstore } from "react-icons/si";
import { SiBereal, SiBluesky, SiClubhouse, SiSignal, SiSubstack } from "react-icons/si";
import { BsPhoneFill, BsPaypal } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import transparent from '../../assets/images/transparent.jpg';

const CreateManageCard = () => {
  // États pour gérer les profils multiples
  const [profiles, setProfiles] = useState({
    public: {
      fullName: 'Job Lodo Kyungu',
      occupation: 'Étudiant',
      company: '',
      email: 'job.public@gmail.com',
      phone: '+15144658570',
      website: 'www.job-kyungu.com',
      companyPhone: '',
      companyAddress: '',
      photo: null,
      socialLinks: [],
      active: true
    },
    pro: {
      fullName: 'Job Lodo Kyungu',
      occupation: 'CEO',
      company: 'Be-Smart',
      email: 'lodokyungu@gmail.com',
      phone: '+15144658570',
      website: 'www.job-kyungu.com',
      companyPhone: '+15148575023',
      companyAddress: '1065 Drummond St Montreal, Quebec',
      photo: null,
      socialLinks: [],
      active: false
    },
    private: {
      fullName: 'Job Lodo Kyungu',
      occupation: 'Ami',
      company: '',
      email: 'job.prive@gmail.com',
      phone: '+15144658570',
      website: '',
      companyPhone: '',
      companyAddress: '',
      photo: null,
      socialLinks: [],
      active: false
    }
  });

  const [activeProfile, setActiveProfile] = useState('public');
  
  // États pour l'expiration des liens
  const [expiration, setExpiration] = useState({
    duration: '24h', // Options : '5m', '30m', '1h', '24h', '7d', 'never'
    expiresAt: null,
    isExpired: false
  });

  // États existants pour les modales
  const [showBioModal, setShowBioModal] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [showAddSocialModal, setShowAddSocialModal] = useState(false);
  const [showSocialInputModal, setShowSocialInputModal] = useState(false);
  const [selectedSocial, setSelectedSocial] = useState(null);
  const [socialSearch, setSocialSearch] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [fileName, setFileName] = useState("Editer l'avatar");
  const [crop, setCrop] = useState({ unit: '%', width: 50, aspect: 1 / 1 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);

  // États pour les couleurs
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [buttonColor, setButtonColor] = useState('#ff6200');

  // Références
  const fileInputRef = useRef(null);
  const imgRef = useRef(null);

  // Calculer l'expiration
  useEffect(() => {
    const calculateExpiration = () => {
      const now = new Date();
      let expiresAt = null;

      switch (expiration.duration) {
        case '5m':
          expiresAt = new Date(now.getTime() + 5 * 60 * 1000);
          break;
        case '30m':
          expiresAt = new Date(now.getTime() + 30 * 60 * 1000);
          break;
        case '1h':
          expiresAt = new Date(now.getTime() + 60 * 60 * 1000);
          break;
        case '24h':
          expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);
          break;
        case '7d':
          expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
          break;
        default:
          expiresAt = null;
      }

      setExpiration(prev => ({ ...prev, expiresAt }));
    };

    calculateExpiration();
  }, [expiration.duration]);

  // Vérifier si le lien est expiré
  useEffect(() => {
    const checkExpiration = () => {
      if (!expiration.expiresAt) return;

      const now = new Date();
      const isExpired = now >= new Date(expiration.expiresAt);

      setExpiration(prev => ({ ...prev, isExpired }));
    };

    const interval = setInterval(checkExpiration, 1000);
    return () => clearInterval(interval);
  }, [expiration.expiresAt]);

  // Obtenir le profil actuel
  const currentProfile = profiles[activeProfile];

  // Liste complète des réseaux sociaux
  const socialNetworks = [
    { id: 'threads', name: 'Threads', icon: <FaThreads />, placeholder: 'Votre nom d\'utilisateur Threads', urlPrefix: 'https://threads.net/' },
    { id: 'email', name: 'Email', icon: <MdEmail />, placeholder: 'Votre adresse email', urlPrefix: 'mailto:' },
    { id: 'facebook', name: 'Facebook', icon: <FaFacebook />, placeholder: 'Votre nom d\'utilisateur Facebook', urlPrefix: 'https://facebook.com/' },
    { id: 'youtube', name: 'YouTube', icon: <FaYoutube />, placeholder: 'Votre chaîne YouTube', urlPrefix: 'https://youtube.com/c/' },
    { id: 'twitter', name: 'X (Twitter)', icon: <FaXTwitter />, placeholder: 'Votre nom d\'utilisateur X', urlPrefix: 'https://twitter.com/' },
    { id: 'tiktok', name: 'TikTok', icon: <FaTiktok />, placeholder: 'Votre nom d\'utilisateur TikTok', urlPrefix: 'https://tiktok.com/@' },
    { id: 'whatsapp', name: 'WhatsApp', icon: <FaWhatsapp />, placeholder: 'Votre numéro WhatsApp', urlPrefix: 'https://wa.me/' },
    { id: 'whatsappChannel', name: 'WhatsApp Channel', icon: <FaWhatsapp />, placeholder: 'Lien de votre Canal WhatsApp', urlPrefix: '' },
    { id: 'snapchat', name: 'Snapchat', icon: <FaSnapchat />, placeholder: 'Votre nom d\'utilisateur Snapchat', urlPrefix: 'https://snapchat.com/add/' },
    { id: 'amazon', name: 'Amazon', icon: <FaAmazon />, placeholder: 'Lien de votre page Amazon', urlPrefix: '' },
    { id: 'playstore', name: 'Android Play Store', icon: <FaAndroid />, placeholder: 'Lien de votre application', urlPrefix: '' },
    { id: 'appstore', name: 'Apple App Store', icon: <SiAppstore />, placeholder: 'Lien de votre application', urlPrefix: '' },
    { id: 'applemusic', name: 'Apple Music', icon: <SiApplemusic />, placeholder: 'Lien de votre profil Apple Music', urlPrefix: '' },
    { id: 'bandcamp', name: 'Bandcamp', icon: <FaBandcamp />, placeholder: 'Votre page Bandcamp', urlPrefix: 'https://' },
    { id: 'bereal', name: 'BeReal', icon: <SiBereal />, placeholder: 'Votre nom d\'utilisateur BeReal', urlPrefix: '' },
    { id: 'bluesky', name: 'Bluesky', icon: <SiBluesky />, placeholder: 'Votre identifiant Bluesky', urlPrefix: '' },
    { id: 'clubhouse', name: 'Clubhouse', icon: <SiClubhouse />, placeholder: 'Votre nom d\'utilisateur Clubhouse', urlPrefix: '' },
    { id: 'discord', name: 'Discord', icon: <FaDiscord />, placeholder: 'Votre nom d\'utilisateur Discord', urlPrefix: '' },
    { id: 'etsy', name: 'Etsy', icon: <FaEtsy />, placeholder: 'Votre boutique Etsy', urlPrefix: 'https://etsy.com/shop/' },
    { id: 'github', name: 'Github', icon: <FaGithub />, placeholder: 'Votre nom d\'utilisateur Github', urlPrefix: 'https://github.com/' },
    { id: 'linkedin', name: 'LinkedIn', icon: <FaLinkedin />, placeholder: 'Votre profil LinkedIn', urlPrefix: 'https://linkedin.com/in/' },
    { id: 'mastodon', name: 'Mastodon', icon: <FaMastodon />, placeholder: 'Votre identifiant Mastodon complet', urlPrefix: '' },
    { id: 'patreon', name: 'Patreon', icon: <FaPatreon />, placeholder: 'Votre page Patreon', urlPrefix: 'https://patreon.com/' },
    { id: 'payment', name: 'Payment', icon: <BsPaypal />, placeholder: 'Votre lien de paiement', urlPrefix: '' },
    { id: 'phone', name: 'Phone', icon: <BsPhoneFill />, placeholder: 'Votre numéro de téléphone', urlPrefix: 'tel:' },
    { id: 'pinterest', name: 'Pinterest', icon: <FaPinterest />, placeholder: 'Votre nom d\'utilisateur Pinterest', urlPrefix: 'https://pinterest.com/' },
    { id: 'signal', name: 'Signal', icon: <SiSignal />, placeholder: 'Votre numéro Signal', urlPrefix: '' },
    { id: 'soundcloud', name: 'Soundcloud', icon: <FaSoundcloud />, placeholder: 'Votre profil Soundcloud', urlPrefix: 'https://soundcloud.com/' },
    { id: 'spotify', name: 'Spotify', icon: <FaSpotify />, placeholder: 'Votre profil Spotify', urlPrefix: 'https://open.spotify.com/user/' },
    { id: 'substack', name: 'Substack', icon: <SiSubstack />, placeholder: 'Votre Substack', urlPrefix: 'https://' },
    { id: 'telegram', name: 'Telegram', icon: <FaTelegram />, placeholder: 'Votre nom d\'utilisateur Telegram', urlPrefix: 'https://t.me/' },
    { id: 'twitch', name: 'Twitch', icon: <FaTwitch />, placeholder: 'Votre chaîne Twitch', urlPrefix: 'https://twitch.tv/' },
    { id: 'website', name: 'Personal Website', icon: <FaGlobe />, placeholder: 'Votre site web personnel', urlPrefix: 'https://' },
    { id: 'instagram', name: 'Instagram', icon: <PiInstagramLogoLight />, placeholder: 'Votre nom d\'utilisateur Instagram', urlPrefix: 'https://instagram.com/' }
  ];

  // Fonctions pour la gestion des profils
  const handleProfileChange = (profileKey) => {
    setActiveProfile(profileKey);
    setProfiles(prev => {
      const updatedProfiles = {};
      Object.keys(prev).forEach(key => {
        updatedProfiles[key] = { ...prev[key], active: key === profileKey };
      });
      return updatedProfiles;
    });
  };

  // Changer la durée d'expiration
  const handleExpirationChange = (duration) => {
    setExpiration(prev => ({ ...prev, duration }));
  };

  // Mettre à jour les données du profil actuel
  const updateCurrentProfile = (field, value) => {
    setProfiles(prev => ({
      ...prev,
      [activeProfile]: {
        ...prev[activeProfile],
        [field]: value
      }
    }));
  };

  const generateQrData = () => {
    const profile = currentProfile;
    return `BEGIN:VCARD
VERSION:3.0
FN:${profile.fullName}
TITLE:${profile.occupation}
TEL:${profile.phone}
EMAIL:${profile.email}
URL:${profile.website}
END:VCARD`;
  };

  // Fonctions de gestion des modales
  const toggleBioModal = () => {
    setShowBioModal(!showBioModal);
    if (showBioModal) {
      setShowCropModal(false);
    }
  };

  const toggleSocialModal = () => {
    setShowSocialModal(!showSocialModal);
    setShowAddSocialModal(false);
    setShowSocialInputModal(false);
  };

  const openAddSocialModal = () => {
    setShowAddSocialModal(true);
    setShowSocialModal(false);
  };

  const backToSocialModal = () => {
    setShowSocialModal(true);
    setShowAddSocialModal(false);
    setShowSocialInputModal(false);
  };

  const openSocialInputModal = (social) => {
    setSelectedSocial(social);
    setShowAddSocialModal(false);
    setShowSocialInputModal(true);
  };

  const addSocialNetwork = (url) => {
    if (selectedSocial && url) {
      const existingIndex = currentProfile.socialLinks.findIndex(link => link.id === selectedSocial.id);
      const updatedLinks = [...currentProfile.socialLinks];

      if (existingIndex !== -1) {
        updatedLinks[existingIndex] = {
          ...selectedSocial,
          url: url,
          active: true
        };
      } else {
        updatedLinks.push({
          ...selectedSocial,
          url: url,
          active: true
        });
      }

      updateCurrentProfile('socialLinks', updatedLinks);
      setShowSocialInputModal(false);
      setShowSocialModal(true);
    }
  };

  const toggleSocialActive = (id) => {
    const updatedLinks = currentProfile.socialLinks.map(link => {
      if (link.id === id) {
        return { ...link, active: !link.active };
      }
      return link;
    });

    updateCurrentProfile('socialLinks', updatedLinks);
  };

  const editSocialNetwork = (social) => {
    setSelectedSocial(social);
    setShowSocialModal(false);
    setShowSocialInputModal(true);
  };

  // Fonctions pour la gestion de l'avatar
  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);

      const imageURL = URL.createObjectURL(file);
      setAvatar(imageURL);
      setShowCropModal(true);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const onImageLoad = (e) => {
    imgRef.current = e.currentTarget;
  };

  const saveCroppedImage = () => {
    if (imgRef.current && completedCrop) {
      const canvas = document.createElement('canvas');
      const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
      const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

      canvas.width = completedCrop.width;
      canvas.height = completedCrop.height;
      const ctx = canvas.getContext('2d');

      ctx.drawImage(
        imgRef.current,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width,
        completedCrop.height
      );

      const croppedImageUrl = canvas.toDataURL('image/jpeg');
      setAvatar(croppedImageUrl);
      updateCurrentProfile('photo', croppedImageUrl);
      setShowCropModal(false);
    }
  };

  const setCropShape = (shape) => {
    switch (shape) {
      case 'circle':
        setCrop({ unit: '%', width: 50, aspect: 1 / 1 });
        break;
      case 'rectangle':
        setCrop({ unit: '%', width: 60, aspect: 4 / 3 });
        break;
      default:
        setCrop({ unit: '%', width: 50, aspect: 1 / 1 });
    }
  };

  const filteredSocialNetworks = socialNetworks.filter(
    social => social.name.toLowerCase().includes(socialSearch.toLowerCase())
  );

  // Couleurs prédéfinies
  const colorOptions = [
    { name: 'Blanc', value: '#ffffff' },
    { name: 'Noir', value: '#000000' },
    { name: 'Bleu', value: '#008cff' },
    { name: 'Orange', value: '#ff6200' },
    { name: 'Rose', value: '#ff4081' },
    { name: 'Vert', value: '#00c853' },
  ];

  return (
    <div className="createCard">
      <div className="createCard__container container">
        <h2 className="createCard__title">Créer ma carte</h2>
        <main className="createCard__main">
          <section className="createCard__section createCard__dev">
            {/* Section de gestion des profils */}
            <div className="createCard__profile__management">
              <div className="createCard__profile__selector">
                <h3>Profil actif</h3>
                <div className="createCard__dropdown">
                  <select
                    value={activeProfile}
                    onChange={(e) => handleProfileChange(e.target.value)}
                  >
                    <option value="public">Profil Public</option>
                    <option value="pro">Profil Professionnel</option>
                    <option value="private">Profil Privé</option>
                  </select>
                  <IoChevronDownOutline className="dropdown-icon" />
                </div>
              </div>

              <div className="createCard__expiration__selector">
                <h3>Expiration du lien</h3>
                <div className="createCard__dropdown">
                  <select
                    value={expiration.duration}
                    onChange={(e) => handleExpirationChange(e.target.value)}
                  >
                    <option value="5m">5 minutes</option>
                    <option value="30m">30 minutes</option>
                    <option value="1h">1 heure</option>
                    <option value="24h">24 heures</option>
                    <option value="7d">7 jours</option>
                    <option value="never">Jamais</option>
                  </select>
                  <IoChevronDownOutline className="dropdown-icon" />
                </div>
                {expiration.expiresAt && (
                  <p className="expiration-info">
                    Expire le{' '}
                    {new Date(expiration.expiresAt).toLocaleString('fr-FR', {
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    })}
                  </p>
                )}
              </div>
            </div>

            <form action="" className="createCard__form">
              <div className="createCard__form__card createCard__label__image">
                <div className="createCard__image">
                  {!avatar && !currentProfile.photo ? (
                    <span>@</span>
                  ) : (
                    <img src={avatar || currentProfile.photo} alt="Avatar" className="createCard__img" />
                  )}
                </div>
                <div className="createCard__mini__menu" onClick={toggleBioModal}>
                  <CgMenuGridO />
                </div>

                {showBioModal && (
                  <div className="createCard__modal__menu__img__and__bio">
                    <div className="createCard__modal__menu__img__and__bio__closing" onClick={toggleBioModal}></div>
                    <div className="createCard__modal__menu__img__and__bio__card">
                      <div className="createCard__modal__menu__img__and__bio__edit__img" onClick={triggerFileInput}>
                        <RiImageAddLine /> <span>{fileName}</span>
                        <input
                          type="file"
                          ref={fileInputRef}
                          style={{ display: 'none' }}
                          accept="image/*"
                          onChange={handleFileSelect}
                        />
                      </div>
                      <textarea
                        placeholder='Décrivez votre bio.'
                        maxLength='150'
                        className="createCard__modal__menu__img__and__bio__textarea"
                      ></textarea>
                      <button className="createCard__modal__menu__img__and__bio__save" onClick={toggleBioModal}>
                        Sauvegarder
                      </button>
                    </div>
                  </div>
                )}

                {showCropModal && (
                  <div className="createCard__img__crop">
                    <h3 className="createCard__img__crop__title">Ajuster l'image</h3>
                    <div className="createCard__img__crop__models">
                      <div
                        className="createCard__img__crop__models__item"
                        onClick={() => setCropShape('circle')}
                      >
                        <div className="crop-shape circle"></div>
                        <span>Cercle</span>
                      </div>
                      <div
                        className="createCard__img__crop__models__item"
                        onClick={() => setCropShape('rectangle')}
                      >
                        <div className="crop-shape rectangle"></div>
                        <span>Rectangle</span>
                      </div>
                    </div>
                    <div
                      style={{ backgroundImage: `url(${transparent})` }}
                      className="createCard__img__crop__preview"
                    >
                      {avatar && (
                        <ReactCrop
                          crop={crop}
                          onChange={(_, percentCrop) => setCrop(percentCrop)}
                          onComplete={(c) => setCompletedCrop(c)}
                          aspect={crop.aspect}
                          circularCrop={crop.aspect === 1 / 1}
                        >
                          <img
                            src={avatar}
                            onLoad={onImageLoad}
                            alt="Crop preview"
                          />
                        </ReactCrop>
                      )}
                    </div>
                    <div className="createCard__img__crop__btns">
                      <button onClick={() => setShowCropModal(false)}>Annuler</button>
                      <button onClick={saveCroppedImage}>Sauvegarder</button>
                    </div>
                  </div>
                )}
              </div>

              <div className="createCard__form__card">
                <div className="createCard__top">
                  <div className="createCard__inputs">
                    <input 
                      type="text" 
                      placeholder='+ Mettez votre nom' 
                      className="createCard__input"
                      value={currentProfile.fullName}
                      onChange={(e) => updateCurrentProfile('fullName', e.target.value)}
                    />
                    <input 
                      type="text" 
                      placeholder='+ Mettez votre occupation' 
                      className="createCard__input"
                      value={currentProfile.occupation}
                      onChange={(e) => updateCurrentProfile('occupation', e.target.value)}
                    />
                    <input 
                      type="text" 
                      placeholder='+ Mettez votre email' 
                      className="createCard__input"
                      value={currentProfile.email}
                      onChange={(e) => updateCurrentProfile('email', e.target.value)}
                    />
                  </div>
                  <div className="createCard__inputs">
                    <input 
                      type="text" 
                      placeholder='+ Mettez votre téléphone' 
                      className="createCard__input"
                      value={currentProfile.phone}
                      onChange={(e) => updateCurrentProfile('phone', e.target.value)}
                    />
                    <input 
                      type="text" 
                      placeholder='+ Mettez votre compagnie' 
                      className="createCard__input"
                      value={currentProfile.company}
                      onChange={(e) => updateCurrentProfile('company', e.target.value)}
                    />
                    <input 
                      type="text" 
                      placeholder='+ Téléphone professionnel' 
                      className="createCard__input"
                      value={currentProfile.companyPhone}
                      onChange={(e) => updateCurrentProfile('companyPhone', e.target.value)}
                    />
                  </div>
                  <div className="createCard__inputs">
                    <input 
                      type="text" 
                      placeholder='+ Mettez votre site web' 
                      className="createCard__input"
                      value={currentProfile.website}
                      onChange={(e) => updateCurrentProfile('website', e.target.value)}
                    />
                    <input 
                      type="text" 
                      placeholder='+ Adresse professionnelle' 
                      className="createCard__input"
                      value={currentProfile.companyAddress}
                      onChange={(e) => updateCurrentProfile('companyAddress', e.target.value)}
                    />
                  </div>
                </div>
                <div className="createCard__bottom">
                  <div className="createCard__icons__pin">
                    {currentProfile.socialLinks
                      .filter(link => link.active)
                      .map((link, index) => (
                        <a href={link.url} key={index} className="createCard__icons__pin__ico">
                          {link.icon}
                        </a>
                      ))}
                  </div>
                  <span className="createCard__icons__pin__icon__add" onClick={toggleSocialModal}>
                    <CiCirclePlus />
                  </span>

                  {showSocialModal && (
                    <div className="createCard__modal__icons">
                      <div className="createCard__modal__icons__modal__closing" onClick={toggleSocialModal}></div>
                      <div className="createCard__modal__icons__settings">
                        <h4 className="createCard__modal__icons__title">Vos Socials icons</h4>
                        <p className="createCard__modal__icons__content">
                          Ajoutez vos profils sociaux, bien plus encore sous forme d'icônes liées sur votre Be-Smart.
                        </p>
                        <div className="createCard__modal__icons__list">
                          {currentProfile.socialLinks.length > 0 ? (
                            currentProfile.socialLinks.map((link, index) => (
                              <div className="createCard__modal__icons__item" key={index}>
                                <div className="createCard__modal__icons__icon">
                                  {link.icon}
                                </div>
                                <div className="createCard__modal__icons__edit" onClick={() => editSocialNetwork(link)}>
                                  <FiEdit2 />
                                </div>
                                <div
                                  className="createCard__modal__icons__btn__actif__and__inactif"
                                  onClick={() => toggleSocialActive(link.id)}
                                >
                                  {link.active ? <BiToggleRight /> : <BiToggleLeft />}
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="createCard__modal__icons__empty">
                              Aucun réseau social ajouté. Cliquez sur "Ajouter des icons" pour commencer.
                            </p>
                          )}
                        </div>
                        <div className="createCard__modal__icons__btns">
                          <button
                            className="createCard__modal__icons__btn close"
                            onClick={toggleSocialModal}
                          >
                            Fermer
                          </button>
                          <button
                            className="createCard__modal__icons__btn add"
                            onClick={openAddSocialModal}
                          >
                            Ajouter des icons
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {showAddSocialModal && (
                    <div className="createCard__modal__adding__icons">
                      <div className="createCard__modal__adding__icons__modal__closing" onClick={toggleSocialModal}></div>
                      <div className="createCard__modal__adding__icons__container">
                        <div className="createCard__modal__adding__icons__top">
                          <div className="createCard__modal__adding__icons__return" onClick={backToSocialModal}>
                            <IoArrowBackOutline />
                          </div>
                          <h4 className="createCard__modal__adding__icons__title">
                            Ajouter plus des réseaux sociaux
                          </h4>
                          <div className="createCard__modal__adding__icons__closing" onClick={toggleSocialModal}>
                            <IoCloseOutline />
                          </div>
                        </div>
                        <div className="createCard__modal__adding__icons__bottom">
                          <div className="createCard__modal__adding__icons__search">
                            <IoSearchOutline />
                            <input
                              type="text"
                              placeholder='Rechercher un réseau social'
                              className="createCard__modal__adding__icons__search__input"
                              value={socialSearch}
                              onChange={(e) => setSocialSearch(e.target.value)}
                            />
                          </div>
                          <div className="createCard__modal__adding__icons__list">
                            {filteredSocialNetworks.map((social, index) => (
                              <div
                                className="createCard__modal__adding__icons__item"
                                key={index}
                                onClick={() => openSocialInputModal(social)}
                              >
                                <div className="createCard__modal__adding__icons__icon">
                                  {social.icon}
                                </div>
                                <div className="createCard__modal__adding__icons__name">
                                  {social.name}
                                </div>
                                <div className="createCard__modal__adding__icons__icon__adding">
                                  <IoChevronForwardOutline />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {showSocialInputModal && selectedSocial && (
                    <div className="createCard__modal__inputs__netword__select">
                      <div className="createCard__modal__inputs__netword__select__modal__closing" onClick={toggleSocialModal}></div>
                      <div className="createCard__modal__inputs__netword__select__container">
                        <div className="createCard__modal__inputs__netword__select__top">
                          <div
                            className="createCard__modal__inputs__netword__select__return"
                            onClick={() => setShowSocialInputModal(false) || setShowAddSocialModal(true)}
                          >
                            <IoArrowBackOutline />
                          </div>
                          <h4 className="createCard__modal__inputs__netword__select__title">
                            {selectedSocial.name}
                          </h4>
                          <div
                            className="createCard__modal__inputs__netword__select__closing"
                            onClick={toggleSocialModal}
                          >
                            <IoCloseOutline />
                          </div>
                        </div>
                        <div className="createCard__modal__inputs__netword__select__bottom">
                          <div className="createCard__modal__inputs__netword__select__icon">
                            {selectedSocial.icon}
                          </div>
                          <input
                            type="text"
                            className="createCard__modal__inputs__netword__select__input"
                            placeholder={selectedSocial.placeholder}
                            defaultValue={currentProfile.socialLinks.find(link => link.id === selectedSocial.id)?.url || ''}
                            id="socialUrlInput"
                          />
                          <span className="createCard__modal__inputs__netword__select__example">
                            Exemple : {selectedSocial.urlPrefix}votre_identifiant
                          </span>
                          <button
                            className="createCard__modal__inputs__netword__select__btn"
                            onClick={() => addSocialNetwork(document.getElementById('socialUrlInput').value)}
                          >
                            Ajouter cette icône
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="createCard__dev__colors">
                <h3 className="createCard__dev__colors__title">Changer des couleurs</h3>
                <div className="createCard__dev__colors__color__for__btns">
                  <h4>Couleur des boutons</h4>
                  <div className="color-picker">
                    {colorOptions.map((color) => (
                      <div
                        key={color.value}
                        className="color-option"
                        style={{ backgroundColor: color.value }}
                        onClick={() => setButtonColor(color.value)}
                        title={color.name}
                      />
                    ))}
                    <input
                      type="color"
                      value={buttonColor}
                      onChange={(e) => setButtonColor(e.target.value)}
                      className="custom-color-input"
                    />
                  </div>
                </div>
                <div className="createCard__dev__colors__color__fond">
                  <h4>Couleur du fond</h4>
                  <div className="color-picker">
                    {colorOptions.map((color) => (
                      <div
                        key={color.value}
                        className="color-option"
                        style={{ backgroundColor: color.value }}
                        onClick={() => setBackgroundColor(color.value)}
                        title={color.name}
                      />
                    ))}
                    <input
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="custom-color-input"
                    />
                  </div>
                </div>
              </div>
            </form>
          </section>
          <section className="createCard__section createCard__visualization">
            <div className="createCard__visualization__card">
              <div className="iphone-container">
                <div className="iphone">
                  <div className="iphone-screen">
                    <div className="dynamic-island"></div>
                    {expiration.isExpired ? (
                      <div className="card-expired">
                        <h3>Lien expiré</h3>
                        <p>Ce profil n'est plus accessible.</p>
                      </div>
                    ) : (
                      <div className="card-preview" style={{ backgroundColor }}>
                        <div className="card-preview__top">
                          <div
                            style={{ backgroundImage: `url(${thumb})` }}
                            className="card-preview__background"
                          >
                            <div className="badge-pro">PRO</div>
                            <div className="card-preview__share">
                              <GoShare />
                            </div>
                          </div>
                          <div className="card-preview-avatar">
                            {avatar || currentProfile.photo ? (
                              <img src={avatar || currentProfile.photo} alt="Avatar" />
                            ) : (
                              <div className="avatar-placeholder">@</div>
                            )}
                            <div className="card-preview__verified"></div>
                          </div>
                        </div>
                        <div className="card-preview-info">
                          <div className="card-preview-name">
                            {currentProfile.fullName}
                          </div>
                          <div className="card-preview-post">
                            {currentProfile.occupation}
                          </div>
                          <div className="card-preview__btns">
                            <button
                              className="card-preview__btns__btn"
                              style={{ backgroundColor: buttonColor }}
                            >
                              <MdSaveAlt className="card-preview__btns__ico" />
                              <span>Enregistrez ce contact</span>
                            </button>
                            <button
                              className="card-preview__btns__btn"
                              onClick={() => setShowQrModal(true)}
                            >
                              <IoQrCode className="card-preview__btns__ico" />
                            </button>
                          </div>

                          {showQrModal && (
                            <div className="card-preview__qrcode-modal">
                              <div
                                className="card-preview__qrcode-modal__overlay"
                                onClick={() => setShowQrModal(false)}
                              ></div>
                              <div className="card-preview__qrcode-modal__content">
                                <button
                                  className="card-preview__qrcode-modal__close"
                                  onClick={() => setShowQrModal(false)}
                                >
                                  <IoCloseOutline />
                                </button>
                                <div className="card-preview__qrcode-modal__title">
                                  Scannez ce QR Code
                                </div>
                                <div className="card-preview__qrcode-modal__preview">
                                  <QRCodeSVG
                                    value={generateQrData()}
                                    size={180}
                                    level="H"
                                    fgColor="#333333"
                                    bgColor="#ffffff"
                                  />
                                </div>
                                <div className="card-preview__qrcode-modal__name">
                                  {currentProfile.fullName}
                                </div>
                                <div className="card-preview__qrcode-modal__post">
                                  {currentProfile.occupation}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="card-preview-social-empty">
                          L'univers est un ensemble de programmation hautement tres eleve, et bien penser,
                          depuis tout ce temps
                        </div>
                        <div className="card-preview-socials">
                          {currentProfile.socialLinks?.filter(link => link.active).map((link, index) => (
                            <div key={index} className="card-preview-social-icon">
                              {link.icon}
                            </div>
                          ))}
                          {currentProfile.socialLinks?.filter(link => link.active).length === 0 && (
                            <div className="card-preview-social-empty">
                              Aucun réseau social actif
                            </div>
                          )}
                        </div>
                        <div className="card-preview__bottom">
                          <div className="card-preview__contact">
                            <h3 className="card-preview__contact__title">Coordonnées</h3>
                            {currentProfile.phone && (
                              <div className="card-preview__contact__infos">
                                <div className="card-preview__contact__icon">
                                  <MdOutlineLocalPhone />
                                </div>
                                <span>{currentProfile.phone}</span>
                              </div>
                            )}
                            {currentProfile.email && (
                              <div className="card-preview__contact__infos">
                                <div className="card-preview__contact__icon">
                                  <MdOutlineMail />
                                </div>
                                <span>{currentProfile.email}</span>
                              </div>
                            )}
                            {currentProfile.website && (
                              <div className="card-preview__contact__infos">
                                <div className="card-preview__contact__icon">
                                  <RiGlobalLine />
                                </div>
                                <span>{currentProfile.website}</span>
                              </div>
                            )}
                          </div>
                          {currentProfile.company && (
                            <div className="card-preview__professionnel">
                              <h3 className="card-preview__professionnel__title">Compagnie</h3>
                              <div className="card-preview__professionnel__company">
                                <div className="card-preview__professionnel__icon">
                                  <MdWork />
                                </div>
                                <span>{currentProfile.company}</span>
                              </div>
                              {currentProfile.companyPhone && (
                                <div className="card-preview__professionnel__tel">
                                  <div className="card-preview__professionnel__icon">
                                    <MdOutlineLocalPhone />
                                  </div>
                                  <span>{currentProfile.companyPhone}</span>
                                </div>
                              )}
                              {currentProfile.companyAddress && (
                                <div className="card-preview__professionnel__company">
                                  <div className="card-preview__professionnel__icon">
                                    <LiaMapSolid />
                                  </div>
                                  <span>{currentProfile.companyAddress}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default CreateManageCard;