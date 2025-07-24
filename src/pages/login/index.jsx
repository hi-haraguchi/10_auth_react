import React from 'react'
import { useForm } from 'react-hook-form';
import { Box, Button, Typography } from '@mui/material';
import Textfield from '../../components/Textfield';
import { useNavigate } from 'react-router-dom';
import styles from "./style.module.scss";
import Snackbar from '@mui/material/Snackbar'; 
import Alert from '@mui/material/Alert'; 

const Login = () => {
   const navigate = useNavigate(); // useNavigateフックを初期化

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('error'); // ログインフォームなのでデフォルトはerror

  const onSubmit = async (data) => { // asyncキーワードを追加
    console.log("送信データ:", data);

    try {
      // PHPのログイン処理スクリプトへのURL
      const response = await fetch('http://localhost/gs202506php/gs20250724auth_php/login_act.php', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json', // JSON形式で送信
        },
        body: JSON.stringify(data), // フォームデータをJSON文字列に変換
      });

      // レスポンスがJSONでない可能性もあるため、text()でまず受け取る
      const responseText = await response.text();
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (jsonError) {
        console.error('JSONパースエラー:', jsonError);
        setSnackbarMessage('サーバーからの応答が不正です。');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
        return;
      }

      if (response.ok && result.success) {
        // ログイン成功
        setSnackbarMessage(result.message || 'ログインに成功しました！');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);

        // PHP側で設定されたリダイレクトURLがあればそこに遷移
        // 例: navigate('/feelings-timeline'); // React Routerのパスに合わせる
        // もしPHP側でfeelings_read.phpにリダイレクトする設計であれば、
        // そのままリダイレクトするのではなく、React側でそのページに遷移させるのが良い
        navigate('/'); // 例: タイムライン表示ページのパス
      } else {
        // ログイン失敗
        setSnackbarMessage(result.message || 'ログインに失敗しました。ユーザー名またはパスワードが正しくありません。');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('通信エラー:', error);
      setSnackbarMessage('サーバーとの通信中にエラーが発生しました。');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box
    component="form"
    onSubmit={handleSubmit(onSubmit)}
      sx={{
        p: 3,
        // border: '1px solid #ccc',
        // borderRadius: '8px',
        // maxWidth: '600px',
        // margin: 'auto',
      }}
    >
      <Typography variant="h6" component="legend" sx={{ mb: 2 }}>
        祝！　『ヴィンランド・サガ』完結
      </Typography>

      <Typography variant="h4" component="legend" sx={{ mb: 2 }}>
        感想投稿ページ　ログイン画面
      </Typography>

      <div className={styles.loginContainer}>
        {/* <Typography variant="body1" sx={{ mb: 1 }}>巻数を入力してください。</Typography> */}
        <Textfield
          label="巻数を入力してください。" // ラベルを設定
          type="number" // typeプロパティを渡す
          inputProps={{ // registerから返されるプロパティをinputPropsとして渡す
            ...register("volume", {
              required: "この項目は必須です。",
              min: { value: 1, message: "1以上の数字を入力してください。" },
              pattern: { value: /^[0-9]+$/, message: "整数を入力してください。" }
            })
          }}
        />
        <p className="error-message" >{errors.volume?.message}</p>
      </div>

      <div className={styles.loginContainer}>
        {/* <Typography variant="body1" sx={{ mb: 1 }}>その巻の最初の話のタイトルを入力してください。</Typography> */}
        <Textfield
          label="その巻の最初の話のタイトルを入力してください。" // ラベルを設定
          type="text" // typeプロパティを渡す
          inputProps={{ // registerから返されるプロパティをinputPropsとして渡す
            ...register("title", {
              required: "この項目は必須です。",
              maxLength: { value: 12, message: "12文字以内で入力してください" } 
            })
          }}
        />
        <p className="error-message">{errors.title?.message}</p>
      </div>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'start' }}>
        <Button variant="contained" type='submit'>送信</Button>
      </Box>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>


    </Box>

    
  );
};

export default Login;