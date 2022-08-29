import { useState, useEffect } from 'react'
import MyHeader from './Header';
import Trends from './Trends';
import LeftMenu from './LeftMenu';
import { Layout, Col, Affix, Row } from 'antd';
const { Header, Footer, Content } = Layout;
export default function Wrpper(props) {

    const [matches, setMatches] = useState('')

    useEffect(() => {
        window
            .matchMedia("(min-width: 1200px)")
            .addEventListener('change', e => setMatches(e.matches
            ));
        setMatches(window.matchMedia("(min-width: 1200px)").matches)
    }, []);
    const [top, setTop] = useState(10);

    return <Layout>
        <Header><MyHeader /></Header>
        <Content>
            <Row>

                <Col span={11} push={5} xs={17} md={17} sm={17} xl={11} lg={17} xxl={11}>
                    {props.children}
                </Col>

                <Col span={5} pull={11} xs={{
                    span: 2,
                    pull: 17,
                }} md={{
                    span: 2,
                    pull: 17,
                }} sm={{
                    span: 2,
                    pull: 17,
                }}
                    xxl={{ span: 5, pull: 11 }}
                    xl={{ span: 5, pull: 11 }}
                    lg={{ span: 2, pull: 17 }}

                >
                    <Affix offsetTop={top}>
                        <LeftMenu />
                    </Affix>
                </Col>
                {matches && <Col span={6} push={1}>
                    <Affix offsetTop={top}>
                        <Trends />
                    </Affix>
                </Col>}
            </Row>
        </Content>
        <Footer><hr />
            By <a href='https://github.com/exshid/' className='footer-link'>Alan Parniyan</a></Footer>
    </Layout>

}
