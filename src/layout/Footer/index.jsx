import React, { useState, useEffect } from 'react'; 
import { useNavigate, useLocation } from 'react-router-dom'; 
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import InputIcon from '@mui/icons-material/Input';


const Footer = () => {
  const [value, setValue] = useState(0); // 現在選択されているボタンのインデックス
  const navigate = useNavigate(); // ページ遷移用
  const location = useLocation(); // 現在のURL情報を取得

  // 各ボタンに対応するルート情報とパスを定義
  const routes = [
    { label: "ホーム", icon: <InputIcon />, path: "/" },
    { label: "入力", icon: <EditNoteIcon />, path: "/record" },
    { label: "感想の一覧", icon: <CollectionsBookmarkIcon />, path: "/feelingstimeline" },
  ];

  // URLのパス名が変更されたときに、BottomNavigationのvalueを更新
  useEffect(() => {
    // 現在のパス名（例: '/', '/record'）を取得
    const currentPath = location.pathname;
    // routes配列の中から、現在のパス名に一致する項目のインデックスを探す
    const matchedIndex = routes.findIndex(route => route.path === currentPath);
    // 一致するものがあればvalueを更新、なければデフォルト値（例: 0）を設定
    if (matchedIndex !== -1) {
      setValue(matchedIndex);
    } else {
      // どのルートにも一致しない場合のデフォルト値（例として0=ホーム）
      setValue(0);
    }
  }, [location.pathname, routes]); // location.pathname または routes が変更されたときに実行

  const handleChange = (event, newValue) => {
    setValue(newValue); // 選択されたボタンのインデックスを更新
    navigate(routes[newValue].path); // 対応するパスへ遷移
  };

  return (
    <div>
      <Box sx={{ width: '100%', position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }}> {/* フッターとして固定するCSSを追加 */}
        <BottomNavigation
          showLabels
          value={value}
          onChange={handleChange}
        >
          {routes.map((route, index) => (
            <BottomNavigationAction
              key={route.label}
              label={route.label}
              icon={route.icon}
            />
          ))}
        </BottomNavigation>
      </Box>
    </div>
  );
};

export default Footer;