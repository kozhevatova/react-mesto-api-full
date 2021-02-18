import { NavLink } from "react-router-dom"

const HamburgerInfo = ({ email, handleLogout }) => {
  return (
    <div className="info">
      <p className="info__email">{email}</p>
      <NavLink className="info__link" to="/sign-in" onClick={handleLogout}>Выйти</NavLink>
    </div>
  );
}

export default HamburgerInfo;