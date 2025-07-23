import React from 'react'
import { useNavigate } from 'react-router-dom'; 
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import InputIcon from '@mui/icons-material/Input';


const Footer = () => {

  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const routes = [
    { label: "ホーム", icon: <InputIcon />, path: "/" },
    { label: "入力", icon: <EditNoteIcon />, path: "/record" },
    { label: "感想の一覧", icon: <CollectionsBookmarkIcon />, path: "/feelingstimeline" },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue); // 選択されたボタンのインデックスを更新
    navigate(routes[newValue].path); // 対応するパスへ遷移
  };

  return (
    <div>
    <Box sx={{ width: 500 }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={handleChange} // 変更されたハンドラを適用
        >
          {routes.map((route, index) => (
            <BottomNavigationAction
              key={route.label} // 各ボタンにユニークなkeyを設定
              label={route.label}
              icon={route.icon}
            />
          ))}
        </BottomNavigation>
      </Box>


    </div>
  )
}

export default Footer