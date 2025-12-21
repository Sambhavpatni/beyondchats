
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/articles')
      .then(res => setArticles(res.data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>BeyondChats Articles</h1>
      {articles.map(a => (
        <div key={a.id} style={{ margin: 20, padding: 20, border: '1px solid #ccc' }}>
          <h2>{a.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: a.content }} />
        </div>
      ))}
    </div>
  );
}

export default App;
