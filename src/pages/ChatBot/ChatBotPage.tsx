import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Input, Layout, Typography } from 'antd';
import { RobotOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router';
import { useFetch } from "../../hooks/useFetch.tsx";

const { Header, Content } = Layout;
const { Title } = Typography;

interface Message {
    sender: 'user' | 'assistant';
    text: string;
}

interface IAiResult {
    aiResult: string,
    status: number,
}

const ChatbotPage: React.FC = () => {
    const { state } = useLocation();
    const navigate = useNavigate(); // Kullanıcıyı yönlendirmek için
    const { _fetch, isLoading } = useFetch();

    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>('');
    const [userDetails, setUserDetails] = useState<{ name: string; surname: string }>({ name: '', surname: '' });

    const lastMessageRef = useRef<HTMLDivElement>(null);

    const handleSendMessage = async () => {
        if (input?.trim() && !isLoading) {
            const userMessage: Message = { sender: 'user', text: input };
            setMessages([...messages, userMessage]);
            setInput('');

            const requestData = {
                chatbot_id: state?.chatbot?.id,
                content: input
            };

            const fetchResponse: IAiResult = await _fetch({
                url: 'messages',
                method: 'POST',
                data: requestData
            });

            if (fetchResponse?.aiResult) {
                const botMessage: Message = { sender: 'assistant', text: fetchResponse?.aiResult };
                setMessages((prevMessages) => [...prevMessages, botMessage]);
            }
        }
    };

    const handleLogout = () => {
        // Çıkış işlemini burada yapabilirsiniz (örneğin, token'ı temizleme)
        localStorage.clear();
        navigate('/'); // Login ekranına yönlendirme
    };
    useEffect(() => {
        const storedUserDetails = JSON.parse(localStorage.getItem('user_detail') || '{}');
        setUserDetails(storedUserDetails);
    }, []);

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [messages]);

    useEffect(() => {
        const checkUserMessages = async () => {
            const fetchResponse = await _fetch({
                url: `messages/user-messages/${state?.chatbot?.id}`,
                method: 'GET'
            });

            if (fetchResponse?.length) {
                const userMessages = fetchResponse?.map((message: any) => ({
                    sender: message?.sender,
                    text: message?.content
                }));
                setMessages(userMessages);
            }
        };

        checkUserMessages();
    }, []);

    return (
        <Layout style={{ height: '100vh', backgroundColor: '#f0f2f5' }}>
            {/* Header */}
            <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#001529' }}>
                {/* Sol Kısım: Logo ve Chatbot Adı */}
                <Link style={{ display: 'flex', alignItems: 'center' }} to="/dashboard">
                    <RobotOutlined style={{ fontSize: '32px', color: '#fff', marginRight: '10px' }} />
                    <Title level={3} style={{ color: '#fff', margin: 0 }}>Diet AI - {state?.chatbot?.name}</Title>
                </Link>

                {/* Sağ Kısım: Kullanıcı Bilgisi ve Çıkış Yap */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Typography.Text style={{ color: '#fff' }}>
                        Merhaba, {userDetails.name} {userDetails.surname}
                    </Typography.Text>
                    <Button
                        type="text"
                        icon={<LogoutOutlined style={{ color: '#fff', fontSize: '18px' }} />}
                        onClick={handleLogout}
                        style={{ color: '#fff' }}
                    >
                        Çıkış Yap
                    </Button>
                </div>

            </Header>

            {/* Content */}
            <Layout style={{ padding: '12px', backgroundColor: '#001529' }}>
                <Content>
                    <Card
                        style={{ height: '80vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', backgroundColor: '#fff', borderRadius: '8px' }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    ref={index === messages.length - 1 ? lastMessageRef : null}
                                    style={{
                                        display: 'flex',
                                        justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                                    }}
                                >
                                    <div
                                        style={{
                                            background: message.sender === 'user' ? '#001529' : '#f0f2f5',
                                            color: message.sender === 'user' ? '#fff' : '#001529',
                                            padding: '4px 8px',
                                            borderRadius: '12px',
                                            wordBreak: 'break-word',
                                            textAlign: 'start'
                                        }}
                                    >
                                        <p style={{ margin: 0, padding: '4px 8px' }}>{message.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Input Alanı */}
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '12px' }}>
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onPressEnter={handleSendMessage}
                            placeholder="Bir mesaj yaz..."
                            style={{ flex: 1, marginRight: '10px', borderRadius: '8px' }}
                        />
                        <Button type="primary" disabled={isLoading} onClick={handleSendMessage} style={{ backgroundColor: '#fff', borderColor: '#fff', color: '#001529', fontWeight: 500 }}>
                            Gönder
                        </Button>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default ChatbotPage;
