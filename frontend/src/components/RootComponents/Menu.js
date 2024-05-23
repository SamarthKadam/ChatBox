import * as React from 'react';
import { useState, useEffect } from 'react';
import Item from './Item';

import { ThemeModeProvider, useThemeMode } from '../../SetThemeMode';
import { GetMode } from '../../GetThemeMode';
import '../../color-theming/style.css'

export default function Menu() {

  const { thememode, toggleThemeMode } = useThemeMode();
  const mode = GetMode() === 'dark' ? 'light' : 'dark';

  return (
    <ThemeModeProvider>
      <div className={` flex flex-col items-center`}>
        <div className={`${GetMode()}-sidebar w-[80%]`}>
          <Item val={1} to='search' text='Search'></Item>
          <Item val={0} to='message' text='Messages'></Item>
          <Item val={3} to='settings' text='Settings'></Item>
          <Item val={2} to='dashboard' text='About'></Item>
          <div className="form-check form-switch text-light">
            <input className="form-check-input" onClick={toggleThemeMode} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
          </div>
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{mode} Mode</label>
        </div>

      </div>
    </ThemeModeProvider>
  );
}
