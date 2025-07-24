import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom'; // navigateをインポート

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate(); // useNavigateフックを初期化

  // toggleDrawerは親からopenとonCloseが渡されているので、Sidebar内ではsetOpenを直接使わない
  // 親のコンポーネントがDrawerのopen状態を管理します。
  // ここではonCloseをそのまま利用します。

  const handleLogout = async () => {
    try {
      // PHPのログアウトスクリプトへのURL
      const response = await fetch('https://hh1000yvoyage.sakura.ne.jp/gs20250724auth_php_sakura/logout.php', {
        method: 'GET', // セッション破棄なのでGETでも良いですが、POSTでも可
        credentials: 'include', // セッションクッキーを送信するために必要
      });

      if (response.ok) {
        // ログアウト成功
        const data = await response.json();
        console.log(data.message); // "ログアウトしました。"
        // ログアウト成功後、ログインページに遷移
        navigate('/'); // あなたのログインページのパスに合わせる
        onClose(); // サイドバーを閉じる
      } else {
        // ログアウト失敗（サーバー側で何か問題があった場合）
        const errorData = await response.json();
        console.error('ログアウト失敗:', errorData.message);
        alert('ログアウト中にエラーが発生しました。'); // ユーザーに通知
      }
    } catch (error) {
      console.error('ログアウトリクエストエラー:', error);
      alert('ネットワークエラーによりログアウトできませんでした。'); // ユーザーに通知
    }
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={onClose}> {/* Drawerを閉じる処理はonCloseを直接使う */}
      <List>
        <ListItem key="まだ項目考え中" disablePadding>
          <ListItemButton>
            <ListItemText primary="まだ項目考え中" />
          </ListItemButton>
        </ListItem>

        <ListItem key="ログアウト" disablePadding>
          <ListItemButton onClick={handleLogout}> {/* ログアウトボタンにクリックイベントを追加 */}
            <ListItemText primary="ログアウト" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <Drawer open={open} onClose={onClose}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default Sidebar;