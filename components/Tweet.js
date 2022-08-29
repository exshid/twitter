import Link from 'next/link';
import React from 'react';
import classes from './Tweet.module.scss'
import { Avatar, Spin, Card, Popover } from 'antd';

const { Meta } = Card;


function Tweet(props) {
    return <>{props.rweet.map((tweet) => (
        <Link key={tweet.id} href={`/${tweet.id}`}><Card key={tweet.id}
            size="small"
            style={{
                width: '100%',
            }}>

            <Popover content={tweet.biography} title="Biography" trigger="hover">
                <Meta
                    avatar={<Avatar src={tweet.avatar} />}
                    title={tweet.name}
                    description={<p >@{tweet.username}, {tweet.date}</p>}
                />
            </Popover>

            <p className={classes.tweettext}>{tweet.tweet}</p>
        </Card></Link>
    )
    )}
    </>
}

export default Tweet;
