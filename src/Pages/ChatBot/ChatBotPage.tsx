import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Input, Layout, Menu } from 'antd';
import { LaptopOutlined, NotificationOutlined, OpenAIOutlined, UserOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

interface Message {
    sender: 'user' | 'bot';
    text: string;
}

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
        const key = String(index + 1);

        return {
            key: `sub${key}`,
            icon: React.createElement(icon),
            label: `subnav ${key}`,
        };
    },
);

const ChatbotPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>('');
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const handleSendMessage = () => {
        if (input.trim()) {
            const userMessage: Message = { sender: 'user', text: input };
            setMessages([...messages, userMessage]);

            // Bot'un cevabını simüle ediyoruz
            const botMessage: Message = { sender: 'bot', text: 'This is a bot response!' };
            setMessages((prevMessages) => [...prevMessages, botMessage]);

            // Input'u temizle
            setInput('');
        }
    };

    const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <Layout style={{ height: '100vh' }}>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo" />
                <OpenAIOutlined style={{ fontSize: '32px', color: '#fff', marginLeft: '10px', marginRight: '10px' }} />
                <h1 style={{ color: '#FFFF' }}>Diet Ai</h1>
            </Header>
            <Content style={{ padding: '0 12px' }}>
                <Layout style={{ padding: '12px 0' }}>
                    <Sider width={240}>
                        <h6 style={{ color: '#FFFF', fontSize: 12 }}>Geçmiş Konuşmalar</h6>
                        <Menu mode="inline" style={{ height: 'auto', backgroundColor: 'white' }} items={items2} />
                    </Sider>
                    <Content style={{ padding: '0 12px', minHeight: 280 }}>
                        <Card
                            style={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '75vh',
                                overflow: 'scroll'
                            }}
                        >
                            {/* Mesajlar kısmı */}
                            <div
                                ref={chatContainerRef}
                                style={{ display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto', marginBottom: '15px' }}
                            >
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start', // Kullanıcı sağda, bot solda
                                            backgroundColor: message.sender === 'user' ? '#1890ff' : '#f0f0f0', // Kullanıcı mavi, bot gri
                                            color: message.sender === 'user' ? '#fff' : '#000', // Yazı rengi
                                            borderRadius: '12px',
                                            padding: '10px',
                                            maxWidth: '70%',  // Mesaj baloncuklarının genişliği
                                            wordBreak: 'break-word',
                                            marginBottom: '10px',
                                        }}
                                    >
                                        {message.text}
                                    </div>
                                ))}
                            </div>
                        </Card>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onPressEnter={handleSendMessage}
                                placeholder="Type a message..."
                                style={{ flex: 1, marginRight: '10px' }}
                            />
                            <Button type="primary" onClick={handleSendMessage} style={{ minWidth: '70px' }}>
                                Send
                            </Button>
                        </div>
                    </Content>
                </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Diet Ai ©{new Date().getFullYear()} Created by Hilal Ezgi ÖZLEM
            </Footer>
        </Layout>
    );
};

export default ChatbotPage;
