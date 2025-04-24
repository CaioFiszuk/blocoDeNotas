interface handleSignOutProps {
  handleSignOut: () => void;
}

function Header({handleSignOut}: handleSignOutProps) {

    return (
      <header>
        <button onClick={handleSignOut}>Sair</button>
      </header>
    )
  }
  
export default Header;