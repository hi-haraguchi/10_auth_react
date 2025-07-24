import React from 'react'
import Footer from '../../layout/Footer'
import HeadDrawer from '../../layout/HeadDrawer'
import FeelingsTimelineList from '../../components/FeelingsTimelineList'
import Box from '@mui/material/Box';

const FeelingsTimeline = () => {
  return (
    <div>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column', // 縦方向に要素を並べる
        minHeight: '100vh', // ビューポートの高さ全体を使用
      }}
    >


          <HeadDrawer />


          <Box
            sx={{
              flexGrow: 1, // 利用可能なスペースを全て占有
              overflowY: 'auto', // 縦方向にコンテンツが溢れた場合にスクロール
              p: 8, // 必要に応じてパディングを追加
              display: 'flex',          
              justifyContent: 'flex-start', // 子要素を左端に寄せる
            }}
          >
            <FeelingsTimelineList />
          </Box>
          
          
          <Footer/>


      </Box>



    </div>
  )
}

export default FeelingsTimeline