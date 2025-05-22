import { useState } from 'react';

export default function FeedbackForm({ onSubmit }: { onSubmit: () => void }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, message }),
    });
    setName('');
    setMessage('');
    onSubmit();
  };

  return (
    <div className="space-y-2">
      <input className="border p-2 w-full" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <textarea className="border p-2 w-full" placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
    </div>
  );
}
