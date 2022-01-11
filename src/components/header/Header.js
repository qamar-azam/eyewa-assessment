// logo image
import logo from './deezer_black.png';

// styling
import './Header.scss';

const Header = () => {
  return (
    <header className='app-header row p-3'>
      <div className='col'>
        <img src={logo} alt='Deezer' className='app-logo' />
      </div>
      <div className='col text-right'>
        <h4 className='tagline'>
          Most effortless audio entertainment for you.
        </h4>
      </div>
    </header>
  );
};

export default Header;
