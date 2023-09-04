import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import styles from './Menu.module.css';

export default function Menu() {


  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem >
            <ListItemButton className={styles.btn} sx={{borderRadius:3,backgroundColor:"ButtonHighlight"}} selected={true}>
              <ListItemIcon>
                <GridViewOutlinedIcon color="action" />
              </ListItemIcon>
              <ListItemText  primaryTypographyProps={{fontSize: '18px',fontFamily:"sans-serif"}}  primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton sx={{borderRadius:3}}>
              <ListItemIcon>
                <ForumOutlinedIcon color="action" />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{fontSize: '18px',fontFamily:"sans-serif"}} primary="Messages" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton sx={{borderRadius:3}}>
              <ListItemIcon>
                <SettingsOutlinedIcon color="action"/>
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{fontSize: '18px',fontFamily:"sans-serif"}} primary="Settings" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}
