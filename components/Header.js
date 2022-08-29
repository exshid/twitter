import { Col, PageHeader, Affix } from 'antd';
import React, { useState } from 'react';
import { useSession } from "next-auth/react"

const Header = () => {
    const { data: session, loading } = useSession();

    const [top, setTop] = useState(0);

    return <Col span={11} push={5} xs={17} md={17} sm={17} xl={11} lg={17} xxl={11}>
        <Affix offsetTop={top}>
            <PageHeader
                title={session ? "Welcome back!" : "Welcome"}
                className="site-page-header"
                subTitle={session ? `You are logged in as ${session.user.email}` : ''} />
        </Affix>
    </Col>
};

export default Header;