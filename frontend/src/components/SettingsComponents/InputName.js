import React from 'react'
import { TextField } from '@mui/material'

import { GetMode } from '../../GetThemeMode';
import '../../color-theming/style.css'

export default function InputName({ name, setName }) {

  const nameHandler = (e) => {
    setName(e.target.value);
  }

  return (
    <div className={`${GetMode()}-setting-name`}>
      <TextField
        value={name}
        onChange={nameHandler}
        id="outlined-read-only-input"
        label="Name"
        style={{ width: '40%' }}
      />
    </div>
  )
}
