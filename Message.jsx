import React, { useState } from 'react';

function Message() {
  const [link, setLink] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSend = async () => {
    setStatus(''); // reset status

    try {
      const parts = link.split('/send/');
      const recipientId = parts[1];

      if (!recipientId || !message.trim()) {
        setStatus('Please enter a valid recipient link and a message.');
        return;
      }

      const res = await fetch('http://localhost:3001/api/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipientId, message }),
      });

      const text = await res.text();

      if (!res.ok) {
        setStatus('Error: ${text}');
        return;
      }

      setStatus('Message sent anonymously!');
      setMessage('');
      setLink('');
    } catch (error) {

    }
  };

  return (
    <div>
      {/* ... */}
      <input
        value={link}
        onChange={(e) => setLink(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />
      <textarea
        placeholder="Your anonymous message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={5}
        style={{ width: '100%', padding: 10, marginBottom: 10 }}
      />
      <button onClick={handleSend} style={{ padding: '10px 20px' }}>
        Send
      </button>
      {status && <p style={{ marginTop: 10 }}>{status}</p>}
    </div>
  );
}

export default Message;