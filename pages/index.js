import { useSession } from "next-auth/react"
import Head from 'next/head';
import TweetForm from '../components/TweetForm';
import GuestVisitor from '../components/GuestVisitor';
import Tweet from '../components/Tweet'
import { Divider } from 'antd';
import { MongoClient } from 'mongodb'

function Home(props) {
  const { data: session } = useSession();
  return (<>
    <Head><title>Rweeter</title>
      <meta name="description" content="A social medi similar to Twitter, made using Next.js" />
    </Head>
    {session && <TweetForm />}
    {!session && <GuestVisitor />}
    <Divider orientation="left" orientationMargin="0">
      <h3>Latest rweets</h3>
    </Divider>
    <Tweet rweet={props.loadedTweets} />
  </>
  )
}

export async function getStaticProps() {

  const client = await MongoClient.connect('mongodb+srv://ali:Ar7iy9BMcCLpXE4@cluster0.hi03pow.mongodb.net/tweets?retryWrites=true&w=majority')
  const db = client.db()
  const tweetsCollection = db.collection('rweets');
  const rweets = await tweetsCollection.find().toArray()
  client.close()
  return {
    props: {
      loadedTweets: [...rweets].reverse().map(rweet => ({
        name: rweet.name,
        username: rweet.username,
        tweet: rweet.tweet,
        biography: rweet.biography,
        date: rweet.date,
        id: rweet._id.toString(),
        avatar: rweet.avatar
      }))
    },
    revalidate: 1
  }
}
export default Home;