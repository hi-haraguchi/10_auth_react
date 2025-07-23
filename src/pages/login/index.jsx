import React from 'react'
import { useForm } from 'react-hook-form';
import { Box, Button, Typography } from '@mui/material';
import Textfield from '../../components/Textfield';
import styles from "./style.module.scss";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const onSubmit = (data) => {
    console.log(data);
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
    </Box>
  );
};

export default Login;