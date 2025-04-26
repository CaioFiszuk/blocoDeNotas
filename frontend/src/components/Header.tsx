interface handleSignOutProps {
  handleSignOut: () => void;
}

function Header({handleSignOut}: handleSignOutProps) {

    return (
      <header className="header">
        <h1 className="header__title">NOTES</h1>
        <button className="header__button" onClick={handleSignOut}>Sair</button>
      </header>
    )
  }
  
export default Header;