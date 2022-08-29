import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"
import 'dotenv/config'
const options = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        })
    ], adapter: MongoDBAdapter(clientPromise),


}
export default (req, res) => NextAuth(req, res, options);