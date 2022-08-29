import { useSession, signIn } from "next-auth/react"

export default function Log() {
    const { data: session } = useSession()
    if (!session) {
        return (
            <>
                Not signed in <br />
                <button onClick={() => signIn()}>Sign in</button>
            </>
        )
    }
}