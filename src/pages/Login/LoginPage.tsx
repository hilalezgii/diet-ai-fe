import React, { useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LockOutlined, MailOutlined, OpenAIOutlined } from '@ant-design/icons';
import {useFetch} from "../../hooks/useFetch.tsx";

const LoginPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { _fetch } = useFetch()

    interface Values {
        email: string;
        password: string;
    }

    const onFinish = async (values: Values) => {
        setLoading(true);
        const { email, password } = values;

        const requestData = {
            email,
            password,
        };

        try {
            const fetchResponse = await _fetch({
                url:'auth/login',
                method:'POST',
                data:requestData
            })

            if (fetchResponse) {
                localStorage.setItem('token', fetchResponse?.access_token || '');
                toast.success('Giriş başarılı!');
                setLoading(false);
                navigate('/dashboard');
            } else {
                toast.error(fetchResponse.message || 'Giriş başarısız, tekrar deneyin.');
                setLoading(false);
            }
        } catch (error) {
            toast.error('Bir hata oluştu, lütfen tekrar deneyin.');
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <Card title={<div style={styles.cardTitle}><OpenAIOutlined /> Giriş Yap  </div>} style={styles.card}>
                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="E-posta"
                        name="email"
                        rules={[
                            { required: true, message: 'Lütfen e-posta adresinizi girin!' },
                            { type: 'email', message: 'Geçerli bir e-posta adresi girin!' },
                        ]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="E-posta adresi" style={styles.input} />
                    </Form.Item>

                    <Form.Item
                        label="Şifre"
                        name="password"
                        rules={[{ required: true, message: 'Lütfen şifrenizi girin!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Şifre" style={styles.input} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={loading} style={styles.loginButton}>
                            Giriş Yap
                        </Button>
                    </Form.Item>
                </Form>

                <div style={styles.registerLink}>
                    Hesabınız yok mu?{' '}
                    <span
                        onClick={() => navigate('/register')}
                        style={styles.registerText}
                    >
                        Kayıt Ol!
                    </span>
                </div>
            </Card>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#001529',
    },
    card: {
        width: 400,
        height: 'auto',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: 10,
        background: '#ffffff',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    cardTitle: {
        fontSize: '28px',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px',
    },
    form: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    input: {
        height: '40px',
        width: '100%',

    },
    loginButton: {
        backgroundColor: '#001529',
        borderColor: '#001529',
        color: '#fff',
        fontWeight: '600',
        borderRadius: '5px',
        padding: '12px',
    },
    registerLink: {
        textAlign: 'center',
        marginTop: '20px',
        fontSize: '16px',
    },
    registerText: {
        color: '#001529',
        cursor: 'pointer',
        fontWeight: 'bold',
        textDecoration: 'underline',
        fontSize: '16px',
    },
};

export default LoginPage;
