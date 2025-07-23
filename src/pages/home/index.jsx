import React from 'react'
import Footer from '../../layout/Footer'
import HeadDrawer from '../../layout/HeadDrawer'
import { Typography } from '@mui/material';

const Home
 = () => {
  return (
    <div>

      <HeadDrawer />


      <Typography variant="h6" component="legend" sx={{ mb: 2, textAlign: 'center', mt: 8  }}>
        とうとう、ヴィンランド・サガが完結してしまいました。
      </Typography>   

      <Typography variant="h6" component="legend" sx={{ mb: 2, textAlign: 'center' , mt: 4 }}>
        嬉しいような、まだまだ続きが気になって寂しいような…
      </Typography>

      <Typography variant="h6" component="legend" sx={{ mb: 2, textAlign: 'center', mt: 4  }}>
        感想を入力すると、一覧表示の画面にも表示されるので、入力してください。
      </Typography>        

      <Footer/>
      
    </div>
  )
}

export default Home
