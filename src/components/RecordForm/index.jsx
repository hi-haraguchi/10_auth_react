import React, { useState } from 'react';
import Textfield from '../Textfield'; 
import { Box, Button, Typography } from '@mui/material'; 
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert'; 

// Snackbar用のAlertコンポーネント
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const RecordForm = () => {
  const [episodeNumber, setEpisodeNumber] = useState('');
  const [episodeTitle, setEpisodeTitle] = useState('');
  const [comments, setComments] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbarの開閉状態
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbarのメッセージ
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Snackbarの種類 (success, errorなど)

  const handleSubmit = async (event) => { // asyncキーワードを追加
    event.preventDefault();

    const formData = {
      episode_number: episodeNumber,
      episode_title: episodeTitle,
      comments: comments,
    };

    try {
      // PHPスクリプトへのURLを設定
      const response = await fetch('http://localhost/gs202506php/gs20250724auth_php/feelings_create.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // JSON形式で送信
        },
        body: JSON.stringify(formData), // フォームデータをJSON文字列に変換して送信
      });

      const result = await response.json(); // サーバーからの応答をJSONとしてパース

      if (response.ok) { // HTTPステータスコードが2xxの場合
        setSnackbarMessage(result.message || 'データが正常に保存されました！');
        setSnackbarSeverity('success');
        // フォームのリセット
        setEpisodeNumber('');
        setEpisodeTitle('');
        setComments('');
        // データ保存後、必要であればタイムラインデータを再フェッチする処理などをトリガー
        // 例: global state management (Context API, Redux) を使っている場合、更新を通知
        // または、親コンポーネントからデータ再フェッチ用のコールバック関数をpropsで受け取る
      } else {
        // エラーレスポンスの場合
        setSnackbarMessage(result.error || result.message || 'データの保存に失敗しました。');
        setSnackbarSeverity('error');
      }
    } catch (error) {
      console.error('通信エラー:', error);
      setSnackbarMessage('サーバーとの通信中にエラーが発生しました。');
      setSnackbarSeverity('error');
    } finally {
      setOpenSnackbar(true); // Snackbarを表示
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <> {/* Fragmentを使って複数の要素を返す */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 3,
          maxWidth: '600px',
          margin: 'auto',
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h5" component="legend" sx={{ mt: 8, mb: 4 }}> {/* マージンを調整 */}
          ヴィンランド・サガに関する感想入力画面
        </Typography>

        <Box sx={{ mb: 2 }}> {/* 各TextfieldをBoxで囲み、間隔を調整 */}
          <Textfield
            label="話数"
            name="episode_number"
            type="number"
            value={episodeNumber}
            onChange={(e) => setEpisodeNumber(e.target.value)}
            fullWidth // 親要素の幅いっぱいに広げる
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Textfield
            label="タイトル"
            name="episode_title"
            value={episodeTitle}
            onChange={(e) => setEpisodeTitle(e.target.value)}
            fullWidth
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Textfield
            label="感想"
            name="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            multiline // 複数行入力可能に
            rows={2} // 表示行数
            fullWidth
          />
        </Box>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" type="submit">
            送信します
          </Button>
        </Box>
      </Box>

      {/* Snackbarコンポーネント */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default RecordForm;