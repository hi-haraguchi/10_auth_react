import React from 'react'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import InputIcon from '@mui/icons-material/Input';


const Footer = () => {

  const [value, setValue] = React.useState(0);

  return (
    <div>
    <Box sx={{ width: 500 }}>
    <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
        setValue(newValue);
        }}
    >
        <BottomNavigationAction label="ホーム" icon={<InputIcon />} />
        <BottomNavigationAction label="入力" icon={<EditNoteIcon />} />
        <BottomNavigationAction label="感想の一覧" icon={<CollectionsBookmarkIcon />} />
    </BottomNavigation>
    </Box>


    </div>
  )
}

export default Footer