import React, { useState } from 'react';
import { FaQrcode } from "react-icons/fa6";
import { RxDownload } from "react-icons/rx";
import { QRCodeSVG } from 'qrcode.react';
import {
  FaThreads, FaXTwitter, FaTiktok, FaSnapchat, FaAmazon, FaAndroid,
  FaApple, FaDiscord, FaEtsy, FaGithub, FaLinkedin, FaMastodon,
  FaPatreon, FaPinterest, FaSoundcloud, FaSpotify, FaTelegram,
  FaTwitch, FaGlobe, FaYoutube, FaWhatsapp, FaFacebook, FaBandcamp
} from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

import { SiApplemusic, SiAppstore } from "react-icons/si";
import { SiBereal, SiBluesky, SiClubhouse, SiSignal, SiSubstack } from "react-icons/si";
import { BsPhoneFill, BsPaypal } from "react-icons/bs";
import { MdEmail, MdOutlineLocalPhone, MdOutlineMail, MdWork } from "react-icons/md";
import { RiGlobalLine } from "react-icons/ri";
import { LiaMapSolid } from "react-icons/lia";
import { IoCloseOutline } from "react-icons/io5";
import thumb from '../../assets/images/thumb.jpg';
import lav from '../../assets/images/12right.jpg';

const ProfileViewer = () => {
  const [showQrModal, setShowQrModal] = useState(false);

  // Social networks list from CreateManageCard.jsx
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
    { id: 'instagram', name: 'Instagram', icon: <FaInstagram />, placeholder: 'Votre nom d\'utilisateur Instagram', urlPrefix: 'https://instagram.com/' }
  ];

  // Sample profile data (from CreateManageCard.jsx)
  const profile = {
    fullName: 'Job Lodo Kyungu',
    occupation: 'CEO',
    company: 'Be-Smart',
    email: 'lodokyungu@gmail.com',
    phone: '+15144658570',
    website: 'www.job-kyungu.com',
    companyPhone: '+15148575023',
    companyAddress: '1065 Drummond St Montreal, Quebec',
    photo: lav,
    socialLinks: [
      { id: 'linkedin', name: 'LinkedIn', icon: <FaLinkedin />, url: 'https://linkedin.com/in/job-kyungu', active: true },
      { id: 'twitter', name: 'X (Twitter)', icon: <FaXTwitter />, url: 'https://twitter.com/jobkyungu', active: true },
      { id: 'instagram', name: 'Instagram', icon: <FaInstagram />, url: 'https://instagram.com/jobkyungu', active: true },
      { id: 'github', name: 'Github', icon: <FaGithub />, url: 'https://github.com/jobkyungu', active: true }
    ]
  };

  const generateQrData = () => {
    return `BEGIN:VCARD
VERSION:3.0
FN:${profile.fullName}
TITLE:${profile.occupation}
TEL:${profile.phone}
EMAIL:${profile.email}
URL:${profile.website}
END:VCARD`;
  };

  return (
    <div className="profileViewer">
      <div className="profileViewer__container container">
        <div className="profileViewer__top">
          <div className="profileViewer__top__background" style={{ backgroundImage: `url(${thumb})` }}></div>
          <div className="profileViewer__top__image">
            {profile.photo ? (
              <img src={profile.photo} alt="Profile" className="profileViewer__top__image__img" />
            ) : (
              <div className="avatar-placeholder">@</div>
            )}
          </div>
        </div>
        <div className="profileViewer__center">
          <h2 className="profileViewer__name">{profile.fullName}</h2>
          <div className="profileViewer__post">{profile.occupation}</div>
          <div className="profileViewer__center__btns">
            <button className="profileViewer__center__btn">
              <span>Enregistrez ce contact</span>
              <RxDownload className="profileViewer__center__btn__icon__donw" />
            </button>
            <button className="profileViewer__center__btn" onClick={() => setShowQrModal(true)}>
              <FaQrcode className="profileViewer__center__btn__icon" />
            </button>
          </div>
        </div>
        <div className="profileViewer__middle__about">
          <p className="profileViewer__middle__about__content">
            L'univers est un ensemble de programmation hautement tres eleve, et bien penser, depuis tout ce temps
          </p>
          <ul className="profileViewer__middle__about__list__network">
            {profile.socialLinks.filter(link => link.active).map((link, index) => (
              <li key={index} className="profileViewer__middle__about__network">
                <a href={link.url} className="social-icon">{link.icon}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="profileViewer__bottom">
          <div className="profileViewer__contact">
            <h3 className="profileViewer__contact__title">Coordonnées</h3>
            {profile.phone && (
              <div className="profileViewer__contact__infos">
                <div className="profileViewer__contact__icon">
                  <MdOutlineLocalPhone />
                </div>
                <span>{profile.phone}</span>
              </div>
            )}
            {profile.email && (
              <div className="profileViewer__contact__infos">
                <div className="profileViewer__contact__icon">
                  <MdOutlineMail />
                </div>
                <span>{profile.email}</span>
              </div>
            )}
            {profile.website && (
              <div className="profileViewer__contact__infos">
                <div className="profileViewer__contact__icon">
                  <RiGlobalLine />
                </div>
                <span>{profile.website}</span>
              </div>
            )}
          </div>
          {profile.company && (
            <div className="profileViewer__professionnel">
              <h3 className="profileViewer__professionnel__title">Compagnie</h3>
              <div className="profileViewer__professionnel__company">
                <div className="profileViewer__professionnel__icon">
                  <MdWork />
                </div>
                <span>{profile.company}</span>
              </div>
              {profile.companyPhone && (
                <div className="profileViewer__professionnel__tel">
                  <div className="profileViewer__professionnel__icon">
                    <MdOutlineLocalPhone />
                  </div>
                  <span>{profile.companyPhone}</span>
                </div>
              )}
              {profile.companyAddress && (
                <div className="profileViewer__professionnel__company">
                  <div className="profileViewer__professionnel__icon">
                    <LiaMapSolid />
                  </div>
                  <span>{profile.companyAddress}</span>
                </div>
              )}
            </div>
          )}
        </div>
        {showQrModal && (
          <div className="profileViewer__qrcode-modal">
            <div
              className="profileViewer__qrcode-modal__overlay"
              onClick={() => setShowQrModal(false)}
            ></div>
            <div className="profileViewer__qrcode-modal__content">
              <button
                className="profileViewer__qrcode-modal__close"
                onClick={() => setShowQrModal(false)}
              >
                <IoCloseOutline />
              </button>
              <div className="profileViewer__qrcode-modal__title">
                Scannez ce QR Code
              </div>
              <div className="profileViewer__qrcode-modal__preview">
                <QRCodeSVG
                  value={generateQrData()}
                  size={180}
                  level="H"
                  fgColor="#333333"
                  bgColor="#ffffff"
                />
              </div>
              <div className="profileViewer__qrcode-modal__name">
                {profile.fullName}
              </div>
              <div className="profileViewer__qrcode-modal__post">
                {profile.occupation}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileViewer;