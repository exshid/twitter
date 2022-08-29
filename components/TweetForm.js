import { Button, Form, message, Input } from 'antd';
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router'
import React from 'react';
const success = () => {
    message.success('Your rweet was sent!');
};

const error = () => {
    message.error('Something went wrong! Try again.');
};


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

const TweetForm = (props) => {
    const [form] = Form.useForm();

    const { data: session, loading } = useSession();
    const router = useRouter()
    async function addTweetHandler(formData) {
        console.log(formData)
        formData.biography = `This user's name is ${session.user.name}`
        formData.username = session.user.name.replace(/ /g, '').toLowerCase()
        formData.name = session.user.name
        formData.date = new Date().toDateString();
        formData.avatar = session.user.image;

        const response = await fetch('/api/new-tweet', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(response, response.ok)
        router.replace(router.asPath)
        form.resetFields()
        if (!response.ok) {
            return error()
        }
        success()
    }

    return (
        <Form form={form} {...layout} name="nest-messages" className='tweet-form' onFinish={addTweetHandler} style={{
            width: '90%',
        }}
            validateMessages={validateMessages}>
            <Form.Item rules={[
                {
                    required: true,
                    message: 'Your rweet should be at least one charachter.',
                },
            ]} style={{
                width: '100%',
            }}
                name='tweet' label="Rweet" >
                <Input.TextArea maxLength={240} placeholder="What's happening?" />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};


export default TweetForm;
