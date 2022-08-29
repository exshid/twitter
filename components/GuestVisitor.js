import classes from './GuestVisitor.module.scss'
import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from 'antd';
import React from 'react';
const GuestVisitor = () => {
    const { data: session, loading } = useSession();


    return <>
        {!session && <div className={classes.guestvisitorcontainer}>
            <Button type="primary" onClick={signIn}>Sign in</Button>
        </div>}

    </>
};

export default GuestVisitor;
