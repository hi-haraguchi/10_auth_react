import React from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
const Sidebar = ({ open, onClose }) => {

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem key="まだ項目考え中" disablePadding>
          <ListItemButton>
            <ListItemText primary="まだ項目考え中" />
          </ListItemButton>
        </ListItem>

        <ListItem key="ログアウト" disablePadding>
          <ListItemButton>
            <ListItemText primary="ログアウト" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      {/* <Button onClick={toggleDrawer(true)}>メニューを押したら開く</Button> */}

      {/* DrawerのopenとonCloseに親から渡されたpropsをそのまま渡す */}
      <Drawer open={open} onClose={onClose}>
        {DrawerList}
      </Drawer>

    </div>
  )
}

export default Sidebar