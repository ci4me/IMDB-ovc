/**
 * @fileoverview Error dialog to be shown if something goes wrong with the search
 * @version 1.0.0
 * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
 */

import React from "react";
import {
  Dialog,
  DialogTitle,
  Button,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";

/**
 * Error dialog JSX
 * @version 1.0.0
 * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
 */
const DialogSearchError = ({ onClose }) => (
  <Dialog open={true} onClose={onClose}>

    <DialogTitle>Error trying to find the Movie</DialogTitle> {/* The dialog title */}

    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        An error has occurred. Try again. {/* The content of the dialog */}
      </DialogContentText>
    </DialogContent>

    <DialogActions>
      <Button onClick={onClose} color="primary" autoFocus>
        Ok {/* The text of button */}
      </Button>
    </DialogActions>
  </Dialog>
);

export default DialogSearchError;
