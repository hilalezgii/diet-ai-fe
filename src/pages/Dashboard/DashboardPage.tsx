import React, {useEffect, useState} from 'react';
import {Button, Card, DatePicker, Form, Input, Layout, Modal, Typography} from 'antd';
import { useNavigate } from 'react-router';
import {toast} from "react-toastify";
import {useFetch} from "../../hooks/useFetch.tsx";
import {LogoutOutlined} from "@ant-design/icons";
import {Header} from "antd/es/layout/layout";

const { Title, Text } = Typography;

interface IChatbot  {
    name: string,
    description: string,
    id: number
}

interface Values {
    name: string;
    surname: string;
    birthdate:string;
}

const DashboardPage: React.FC = () => {
    const {_fetch} =useFetch();
    const [isActiveOnboarding, setIsActiveOnboarding] = useState(false);
    const [loading, setLoading] = useState(false);
    const [chatbots, setChatbots] = useState([]);
    const navigate = useNavigate();

    const handleChatbotSelect = (chatbot: IChatbot) => {
        navigate(`/chatbot`, { state: { chatbot } });
    };

    const onFinishOnboarding = async (values: Values) => {
        try {
            const fetchResponse =await _fetch({
                url:'user-detail',
                method:'POST',
                data:values
            })


            if (fetchResponse) {
                localStorage.setItem('user_detail',JSON.stringify(fetchResponse));
                setIsActiveOnboarding(false)
                toast.success('Verdiğiniz bilgiler için teşekkürler', { position: "top-right", autoClose: 5000 });
                setLoading(false);
            } else {
                toast.error(fetchResponse.message || 'Gönderdiğiniz bilgiler kayıt edilemedi. Lütfen tekrar deneyin', { position: "top-right", autoClose: 5000 });
                setLoading(false);
            }
        } catch (error) {
            toast.error('Bir hata oluştu, lütfen tekrar deneyin.', { position: "top-right", autoClose: 5000 });
            setLoading(false);
        }
    };

    const handleLogout = () => {
        // Çıkış işlemini burada yapabilirsiniz (örneğin, token'ı temizleme)
        localStorage.clear();
        navigate('/'); // Login ekranına yönlendirme
    };

    useEffect(() => {
        const checkUserOnboarding = async () => {
            const fetchResponse =await _fetch({
                url:'user-detail/user',
                method:'GET',
            })

            if (!fetchResponse?.id) {
                setIsActiveOnboarding(true);
            } else {
                localStorage.setItem('user_detail',JSON.stringify(fetchResponse));
            }
        }

        checkUserOnboarding();
    }, []);

    useEffect(() => {
        const getUserChatbots = async () => {
            const fetchResponse =await _fetch({
                url:'chatbots',
                method:'GET',
            })

            if (fetchResponse) {
                setChatbots(fetchResponse);
            }
        }

        getUserChatbots();
    }, []);

    return (
        <Layout
            style={{
                height: '100vh',
                background: '#001529',
                color: '#001529',
            }}

        >
            <Header style={{display:'flex' , justifyContent:'flex-end',  padding: '15px 50px 0'}}>
                <Button
                type="text"
                icon={<LogoutOutlined style={{ color: '#fff', fontSize: '18px' }} />}
                onClick={handleLogout}
                style={{ color: '#fff'  }}
            >
                Çıkış Yap
            </Button>
            </Header>

         <div style={{marginTop:'120px'}}>
             <Title style={{ color: '#dcdcdc', marginBottom: '30px' }}>AI Chatbot </Title>
             <Text style={{ color: '#dcdcdc', marginBottom: '15px', fontSize: '18px',display:'inline-block' }}>
                 Aşağıdaki chatbotlardan birini seçerek hemen başla!
                 Hedefine uygun kişisel asistanını bul ve ona merhaba de! 👋
             </Text>
             <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>

                 {chatbots?.map((chatbot: IChatbot) => {
                     return (
                         <Card
                             key={chatbot.id}
                             hoverable
                             style={{
                                 width: 300,
                                 background: '#dcdcdc',
                                 borderRadius: '15px',
                                 textAlign: 'center',
                                 boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                                 border: '1px solid #e0e0e0',
                             }}
                             onClick={() => handleChatbotSelect(chatbot)}
                         >
                             <Title level={4} style={{ color: '#001529', marginBottom: '10px' }}>
                                 {chatbot.name}
                             </Title>
                             <Text style={{ color: '#555', fontSize: '16px' }}>
                                 {chatbot.description}
                             </Text>
                         </Card>
                     )
                 })}


             </div>


         </div>

            <Modal
                title="Kullanıcı Bilgileri "
                open={isActiveOnboarding}
                closeIcon={false}
                footer={null}
            >
                <p>Merhaba, dietAI asistanına hoş geldin. Seni daha yakından tanıyabilmem için lütfen bilgilerini benimle paylaş. </p>

                <Form
                    name="onboarding"
                    initialValues={{ remember: true }}
                    onFinish={onFinishOnboarding}
                    autoComplete="off"
                >

                    <Form.Item
                        label="Ad"
                        name="name"
                        rules={[
                            { required: true, message: 'Lütfen adınızı girin!' },
                        ]}
                    >
                        <Input  placeholder="Adınız" style={styles.input} />
                    </Form.Item>

                    <Form.Item
                        label="Soyad"
                        name="surname"
                        rules={[{ required: true, message: 'Lütfen soyadınızı girin!' }]}
                    >
                        <Input placeholder="Soyadınız" style={styles.input} />
                    </Form.Item>

                    <Form.Item
                        label="Doğum Tarihi"
                        name="birthdate"
                        rules={[{ required: true, message: 'Lütfen doğum tarihinizi girin!' }]}
                    >
                        <DatePicker
                            placeholder="Doğum Tarihi Seçiniz"
                            style={styles.input}
                            format="DD/MM/YYYY"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit"  loading={loading} block style={styles.button}>
                            Gönder
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    );
};

const styles = {
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
    button: {
        backgroundColor: '#001529',
        borderColor: '#001529',
        color: '#fff',
        fontWeight: '600',
        borderRadius: '5px',
        padding: '12px',
    },
};

export default DashboardPage;
