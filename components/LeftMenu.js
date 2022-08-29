import Link from 'next/link';
import { useSession, signOut } from "next-auth/react"

import {
    LogoutOutlined,
    ContainerOutlined,
    LockOutlined,
    HomeOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useState, useEffect } from 'react';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}


const LeftMenu = () => {
    const { data: session } = useSession();
    const [collapsed, setCollapsed] = useState(false);

    const [matches, setMatches] = useState('')

    useEffect(() => {
        window
            .matchMedia("(min-width: 1266px)")
            .addEventListener('change', e => setMatches(e.matches));
        setMatches(window.matchMedia("(min-width: 1266px)").matches)
    }, []);
    let items;
    if (session) {
        items = [
            getItem(<Link href='/'>Home</Link>, 'home', <HomeOutlined />),
            getItem(<Link href='/privacy-policy' >Privacy Policy</Link>, 'privacy-policy', <ContainerOutlined />),
            getItem(<Link href='/tos' >Terms of Service</Link>, 'tos', <LockOutlined />),
            getItem(<div onClick={() => signOut()}>Logout</div>, 'logout', <LogoutOutlined />),
        ];
    } else {
        items = [
            getItem(<Link href='/'>Home</Link>, 'home', <HomeOutlined />),
            getItem(<Link href='/privacy-policy' >Privacy Policy</Link>, 'privacy-policy', <ContainerOutlined />),
            getItem(<Link href='/tos' >Terms of Service</Link>, 'tos', <LockOutlined />),
        ]
    }
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div
            style={{
                width: 256,
            }}
        >
            <Menu
                defaultSelectedKeys={['home']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={matches ? collapsed : !collapsed}
                items={items}
                style={{
                    backgroundColor: '#111',

                }}

            />
        </div>
    );
};

export default LeftMenu;