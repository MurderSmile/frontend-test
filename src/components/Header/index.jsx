/* eslint-disable jsx-a11y/img-redundant-alt */
import OriginalLogo from '../../assets/icon-left-font-monochrome-black.png';
import DefaultPicture from '../../assets/profile.png';
import AdminImage from '../../assets/1200px-OOjs_UI_icon_eye.svg.png'

////  Génération de l'en-tête de la page  //
function Header() {

  const profil = JSON.parse(sessionStorage.getItem('profil'))

  ////  Déconnection du profil  //
  const deconnect = () =>{
    sessionStorage.clear();
    window.location.href = '../';
  }


  ////  Génération du profil Utilisateur  //
  return (
    <nav>
      <img id="logo" src={OriginalLogo} alt="Groupania" />
      <div id="profil">

        <img src={profil && profil.admin ? AdminImage : DefaultPicture} alt="image de profil"/>
        <span>{profil ? profil.name : 'Déconnecté'}</span>
        {profil && profil.admin ? <span>----- Mode Admin -----</span> : null}
        {profil && <button onClick={deconnect}>se déconnecter</button>}
        
      </div>
    </nav>
  );
}

export default Header;