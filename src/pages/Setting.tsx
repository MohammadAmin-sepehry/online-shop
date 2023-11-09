import React from 'react';
import { SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem('Setting', 'sub1', <SettingOutlined />, [
    getItem('Options', 'g1', null, [getItem('Change Profile', 'change-Profile'),
    getItem('Change Password', 'change-password'), getItem('Upload Avatar', 'upload-avatar')], 'group'),
  ]),

];

const Setting: React.FC = () => {
  const onClick: MenuProps['onClick'] = (e) => {
    navigate(`${e.key}`)
  };

  const navigate = useNavigate()

  const isDarkMode = useSelector((state:{ui:{isDarkMode:string}})=>state.ui.isDarkMode)

  return (
    <div className={`${isDarkMode?'dark':''}`}>
      <div className='dark:bg-slate-600 h-[100vh]
        md:h-[100vh] md:grid md:grid-cols-[200px_minmax(900px,_1fr)_100px]
        lg:h-[100vh] lg:grid lg:grid-cols-[200px_minmax(900px,_1fr)_100px]
    '>
        <Menu
          className='dark:bg-slate-300 
           bg-slate-200 grid-cols-1 grid-rows-1 rounded-xl'
          onClick={onClick}
          style={{ width: 256 }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          items={items}
        />
        <Outlet />
      </div>
    </div>
  );
};

export default Setting;
