import React, { useState }  from 'react'
import Header from '../Header';
import Sidebar from '../Sidebar';


const HeadDrawer = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebarの開閉状態

  const toggleSidebar = (newOpen) => () => {
    setIsSidebarOpen(newOpen);
  };

  return (
    <div>

      <Header onMenuClick={toggleSidebar(true)} />

      {/* Sidebarに開閉状態と閉じる関数を渡す */}
      <Sidebar open={isSidebarOpen} onClose={toggleSidebar(false)} />


    </div>
  )
}

export default HeadDrawer