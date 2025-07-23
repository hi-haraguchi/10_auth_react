import React, { useState } from 'react';
import Textfield from '../Textfield'; 
import { Box, Button, Typography } from '@mui/material'; 

const RecordForm = () => {
  // 各入力フィールドの値を管理するためのstateを定義
  const [episodeNumber, setEpisodeNumber] = useState('');
  const [episodeTitle, setEpisodeTitle] = useState('');
  const [comments, setComments] = useState('');

  // フォーム送信時の処理
  const handleSubmit = (event) => {
    event.preventDefault(); // デフォルトのフォーム送信（ページリロード）を防ぐ

    // ここでフォームの値を処理します
    const formData = {
      episode_number: episodeNumber,
      episode_title: episodeTitle,
      comments: comments,
    };
    console.log('送信データ:', formData);

    // 例: サーバーへのPOSTリクエスト
    // fetch('feelings_create.php', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json', // JSON形式で送信する場合
    //   },
    //   body: JSON.stringify(formData),
    // })
    // .then(response => response.json())
    // .then(data => console.log('サーバーからの応答:', data))
    // .catch(error => console.error('エラー:', error));

    // フォームをリセットする場合
    setEpisodeNumber('');
    setEpisodeTitle('');
    setComments('');
  };

  return (
    <Box
      component="form" // Boxをform要素として扱う
      onSubmit={handleSubmit}
      sx={{
        p: 3,
        // border: '1px solid #ccc',
        // borderRadius: '8px',
        maxWidth: '600px',
        margin: 'auto',
      }}
      noValidate
      autoComplete="off"
    >
      {/* <Typography variant="h5" component="legend" sx={{ mb: 2 }}>
        ヴィンランド・サガに関する感想入力画面
      </Typography> */}

      <div>
        <Textfield
          label="話数"
          name="episode_number"
          type="number" // 数字入力に限定
          value={episodeNumber}
          onChange={(e) => setEpisodeNumber(e.target.value)}
        />
      </div>
      <div>
        <Textfield
          label="タイトル"
          name="episode_title"
          value={episodeTitle}
          onChange={(e) => setEpisodeTitle(e.target.value)}
        />
      </div>
      <div>
        <Textfield
          label="感想"
          name="comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          // multiline={true}
          // rows={4}
        />
      </div>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" type="submit">
          送信します
        </Button>
      </Box>
    </Box>
  );
};

export default RecordForm;