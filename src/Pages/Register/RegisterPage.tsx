import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import {LockOutlined, MailOutlined, OpenAIOutlined} from '@ant-design/icons';

interface Values {
    email: string;
    password: string;
}

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();

    const onFinish = async (values: Values) => {
        const { email, password } = values;

        const requestData = {
            email,
            password,
        };

        try {
            const serviceUrl = import.meta.env.VITE_SERVICE_URL!;

            const response = await fetch(`${serviceUrl}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Başarıyla kayıt olundu. Lütfen giriş yapınız');
                navigate('/');
            } else {
                toast.error('Lütfen bilgileri yeniden giriniz');
            }
        } catch (error) {
            toast.error('Bir hata oluştu, lütfen tekrar deneyin.');
        }
    };

    return (
        <div style={styles.container}>
            <Card title={<div style={styles.cardTitle}><OpenAIOutlined /> Kayıt Ol</div>} style={styles.card}>
                <Form
                    name="register"
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

                    {/* Register Button */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={false} style={styles.loginButton}>
                            Kayıt Ol
                        </Button>
                    </Form.Item>
                </Form>

                {/* Login Link */}
                <div style={styles.registerLink}>
                    Zaten bir hesabınız var mı?{' '}
                    <span
                        onClick={() => navigate('/')}
                        style={styles.registerText}
                    >
                        Giriş Yap!
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
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px',
    },
    form: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',  // Form öğeleri arasındaki boşluğu artırır
    },
    input: {
        height: '40px',
        width: '100%',
        // Her input arasına boşluk ekledik
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

export default RegisterPage;
