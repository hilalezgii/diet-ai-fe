import React, { useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RobotOutlined, LockOutlined, MailOutlined, OpenAIOutlined } from '@ant-design/icons'; // Iconlar

// Vite environment variable ile servis URL'sine erişim
const serviceUrl = import.meta.env.VITE_SERVICE_URL;

const LoginPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
            const response = await fetch(`${serviceUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data?.access_token || '');
                toast.success('Giriş başarılı!', { position: "top-right", autoClose: 5000 });
                setLoading(false);
                navigate('/dashboard');
            } else {
                toast.error(data.message || 'Giriş başarısız, tekrar deneyin.', { position: "top-right", autoClose: 5000 });
                setLoading(false);
            }
        } catch (error) {
            toast.error('Bir hata oluştu, lütfen tekrar deneyin.', { position: "top-right", autoClose: 5000 });
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
                    style={styles.form}
                >
                    {/* Email */}
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

                    {/* Password */}
                    <Form.Item
                        label="Şifre"
                        name="password"
                        rules={[{ required: true, message: 'Lütfen şifrenizi girin!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Şifre" style={styles.input} />
                    </Form.Item>

                    {/* Login Button */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={loading} style={styles.loginButton}>
                            Giriş Yap
                        </Button>
                    </Form.Item>
                </Form>

                {/* Kayıt Ol Linki */}
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
        backgroundColor: '#dcdcdc',
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
        justifyContent: 'space-between',  // İçeriği en alta itiyor
    },
    cardTitle: {
        fontSize: '28px',
        fontWeight: 'bold',
        textAlign: 'center',  // Burada 'center' tipi belirleniyor
        color: '#333',
        marginBottom: '20px',
    },
    form: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // Form öğeleri arasındaki boşluğu artırır
    },
    input: {
        height: '40px',
        width: '100%',
        // Input'ları daha yüksek yapmak için height artırdık
        //marginBottom: '15px',  // Her input arasına boşluk ekledik
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
        textAlign: 'center',  // Burada 'center' tipi belirleniyor
        marginTop: '20px',  // Daha fazla boşluk eklemek için marginTop
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
