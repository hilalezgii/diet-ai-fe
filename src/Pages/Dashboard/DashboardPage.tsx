import React from 'react';
import { Card, Typography } from 'antd';
import { useNavigate } from 'react-router';

const { Title, Text } = Typography;

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();

    const handleChatbotSelect = (chatbotId: string) => {
        navigate(`/chatbot/${chatbotId}`); // İlgili chatbot ekranına yönlendir
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                padding: '20px',
                background: '#dcdcdc', // Daha sade bir arka plan
                color: '#001529', // Ana renk uyumu
            }}
        >
            <Title style={{ color: '#001529', marginBottom: '30px' }}>AI Chatbot Dashboard</Title>
            <Text style={{ color: '#555', marginBottom: '30px', fontSize: '18px' }}>
                Aşağıdaki chatbotlardan birini seçerek hemen başla!
                Hedefine uygun kişisel asistanını bul ve ona merhaba de! 👋
            </Text>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                {/* Chatbot 1 - Kilo verme */}
                <Card
                    hoverable
                    style={{
                        width: 300,
                        background: '#f8f8ff', // Kartlar için beyaz arka plan
                        borderRadius: '15px',
                        textAlign: 'center',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Hafif gölge
                        border: '1px solid #e0e0e0', // Kart çerçevesi
                    }}
                    bodyStyle={{ padding: '20px' }}
                    onClick={() => handleChatbotSelect('fitbuddy')}
                >
                    <Title level={4} style={{ color: '#001529', marginBottom: '10px' }}>
                        Fit Buddy
                    </Title>
                    <Text style={{ color: '#555', fontSize: '16px' }}>
                        Hedefine ulaşmak için seni motive edecek planlar! 🏃‍♂️
                        Kilo vermek artık çok eğlenceli olacak!
                    </Text>
                </Card>

                {/* Chatbot 2 - Kilo alma */}
                <Card
                    hoverable
                    style={{
                        width: 300,
                        background: '#f8f8ff', // Kartlar için beyaz arka plan
                        borderRadius: '15px',
                        textAlign: 'center',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Hafif gölge
                        border: '1px solid #e0e0e0', // Kart çerçevesi
                    }}
                    bodyStyle={{ padding: '20px' }}
                    onClick={() => handleChatbotSelect('bulkupfit')}
                >
                    <Title level={4} style={{ color: '#001529', marginBottom: '10px' }}>
                        BulkUpFit
                    </Title>
                    <Text style={{ color: '#555', fontSize: '16px' }}>
                        Kas yaparken biraz eğlence! 💪
                        Kilo almak hiç bu kadar kolay ve eğlenceli olmamıştı!
                    </Text>
                </Card>

                {/* Chatbot 3 - Sağlıklı beslenme */}
                <Card
                    hoverable
                    style={{
                        width: 300,
                        background: '#f8f8ff', // Kartlar için beyaz arka plan
                        borderRadius: '15px',
                        textAlign: 'center',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Hafif gölge
                        border: '1px solid #e0e0e0', // Kart çerçevesi
                    }}
                    bodyStyle={{ padding: '20px' }}
                    onClick={() => handleChatbotSelect('healthyfit')}
                >
                    <Title level={4} style={{ color: '#001529', marginBottom: '10px' }}>
                        HealthyFit
                    </Title>
                    <Text style={{ color: '#555', fontSize: '16px' }}>
                        Sağlıklı bir yaşam için eğlenceli beslenme tüyoları! 🍏
                        Vücudunu besle, sağlığını koru ve enerjik ol!
                    </Text>
                </Card>
            </div>
        </div>
    );
};

export default DashboardPage;
