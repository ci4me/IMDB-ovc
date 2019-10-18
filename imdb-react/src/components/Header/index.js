
/**
 * @fileoverview Main Page Header Component
 * @version 1.0.0
 * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
 */

import React from 'react';
import { AppBar, Typography, Toolbar } from '@material-ui/core';
import './index.scss';


/**
 * Main Page Header
 * @version 1.0.0
 * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
 */
const Header = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6">I<span>rish</span>MDB</Typography> {/* The title displayed on the main header */}
    </Toolbar>
  </AppBar>
);

export default Header;