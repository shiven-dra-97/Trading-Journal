import { Link } from "react-router-dom";
import "./index.css"

const Header=()=>(
    <nav className="nav">
      <div className="nav-items container-fluid ">
      <h1 className="heading">Trading Journal</h1>
      <h1 className="heading-on-small">TJ</h1>
      <ul className="ul">
        <li className="options">
          <Link className="link" to="/">Dashboard</Link>
        </li>
        <li className="options">
          <Link className="link" to="/statistics">Statistics</Link>
        </li>
      </ul>
      </div>
    </nav>
)

export default Header