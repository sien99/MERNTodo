import React from "react";

import WbIncandescentIcon from '@mui/icons-material/WbIncandescent';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from "react-router-dom"

function Header() {
  return (
    <header>
      <h1>
        <WbIncandescentIcon fontSize="large" />
        Keeper
      </h1>
      <Link to="/" 
        className="btn btn-primary w-10">
        <ArrowBackIcon />
      </Link>
      {/* <Button variant="dark">
        <Link to="/">
          <ArrowBackIcon />
        </Link>
      </Button> */}
    </header>
  );
}

export default Header;
