import Head from 'next/head'
import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import React, { useState } from 'react'
import axios from 'axios'

const Contact = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [body, setBody] = useState('')

    const handleSubmit = (e) => {
        const validateEmailFormat = (email) => {
            const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            return regex.test(email)
        }

        const validateRequiredInput = (...args) => {
            let isBlank = false
            for (let i = 0; i < args.length; i = (i + 1) | 0) {
                if (args[i] === '') {
                    isBlank = true
                }
            }
            return isBlank
        }

        const isBlank = validateRequiredInput(name, email, body)
        const isValidEmail = validateEmailFormat(email)

        if (isBlank) {
            alert('必須入力欄が空白です。')
            return false
        } else if (!isValidEmail) {
            alert('メールアドレスの書式が異なります。')
            return false
        }

        e.preventDefault()
        const data = {
            email: email,
            name: name,
            body: body,
        }
        axios({
            method: 'post',
            url: 'https://nextmyblogs.microcms.io/api/v1/contacts',
            data: data,
            headers: {
                'Content-Type': 'application/json',
                'X-WRITE-API-KEY': process.env.x_api_key,
            },
        })
            .then(() => {
                alert(
                    'お問い合わせの送信が完了いたしました。お返事差し上げるまで少々お待ちください。'
                )
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <Layout>
            <Head>
                <title>Contact</title>
            </Head>
            <div className={utilStyles.contactWrap}>
                <div>
                    Email：
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={utilStyles.textField}
                    />
                </div>
                <div className={utilStyles.mt8}>
                    氏名：
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={utilStyles.textField}
                    />
                </div>
                <div className={utilStyles.mt8}>
                    お問い合わせ内容：
                    <br />
                    <textarea
                        name="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className={utilStyles.textFieldBody}
                    />
                </div>
                <div className={utilStyles.submitButton}>
                    <button onClick={handleSubmit}>送信する</button>
                </div>
            </div>
        </Layout>
    )
}

export default Contact
