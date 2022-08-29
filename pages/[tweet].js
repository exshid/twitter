import Head from 'next/head'
import { MongoClient, ObjectId } from 'mongodb'
import { Avatar, Card, Popover } from 'antd';
const { Meta } = Card;


function Tweet(props) {

    return <>
        <Head><title>{`Rweet by ${props.rweetData.name}`}</title>
            <meta name="description" content={props.rweetData.tweet} />
        </Head>
        <Card id={props.rweetData.id}
            size="small"
            style={{
                width: '100%',
            }}
        >
            <Popover content={props.rweetData.biography} title="Biography" trigger="hover">
                <Meta
                    avatar={<Avatar src={props.rweetData.avatar} />}
                    title={props.rweetData.name}
                    description={<><p >@{props.rweetData.username}, {props.rweetData.date}</p></>}
                />
            </Popover>

            <p className='tweet-text'>{props.rweetData.tweet}</p>
        </Card></>
}

export async function getStaticPaths() {

    const client = await MongoClient.connect('mongodb+srv://ali:Ar7iy9BMcCLpXE4@cluster0.hi03pow.mongodb.net/tweets?retryWrites=true&w=majority')
    const db = client.db()
    const tweetsCollection = db.collection('rweets');

    const rweets = await tweetsCollection.find({}, {
        _id: 1,
    }).toArray()
    client.close()
    return {
        fallback: 'blocking',
        paths: rweets.map(rweet => ({
            params: {
                tweet: rweet._id.toString()
            },
        }))
    }
}

export async function getStaticProps(context) {

    const tweetId = context.params.tweet;

    const client = await MongoClient.connect('mongodb+srv://ali:Ar7iy9BMcCLpXE4@cluster0.hi03pow.mongodb.net/tweets?retryWrites=true&w=majority')

    const db = client.db()

    const tweetsCollection = db.collection('rweets');

    const rweet = await tweetsCollection.findOne({ _id: ObjectId(tweetId) })

    client.close()
    return {
        props: {
            rweetData: {
                id: rweet._id.toString(),
                biography: rweet.biography,
                name: rweet.name,
                tweet: rweet.tweet,
                username: rweet.username,
                date: rweet.date,
                avatar: rweet.avatar
            }
        }
    }

}

export default Tweet