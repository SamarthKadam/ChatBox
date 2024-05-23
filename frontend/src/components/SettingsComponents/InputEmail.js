import React from 'react'
import { TextField } from '@mui/material'

import { GetMode } from '../../GetThemeMode';
import '../../color-theming/style.css'

export default function InputEmail({ email, setEmail }) {

  const emailHandler = (e) => {
    setEmail(e.target.value);
  }

  return (
    <div className={`${GetMode()}-setting-email`}>
      <TextField
        id="outlined-read-only-input"
        label="Email"
        onChange={emailHandler}
        value={email}
        style={{ width: '40%' }}
      />
    </div>
  )
}
