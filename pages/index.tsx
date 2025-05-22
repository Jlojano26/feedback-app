import React, { useEffect, useState } from 'react';
import FeedbackForm from '@/components/FeedbackForm';

type Feedback = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

export default function Home() {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);

  const fetchFeedback = async () => {
    const res = await fetch('/api/feedback');
    const data = await res.json();
    setFeedbackList(data);
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return (
    <main className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6">Feedback Board</h1>
      <FeedbackForm onSubmit={fetchFeedback} />
      <div className="mt-8 space-y-4">
        {feedbackList.map(f => (
          <div key={f.id} className="border p-4 rounded">
            <div className="font-bold">{f.name}</div>
            <div>{f.message}</div>
            <div className="text-xs text-gray-500">{new Date(f.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
