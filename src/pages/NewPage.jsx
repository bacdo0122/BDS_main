import React from 'react';

const newsArticles = [
  {
    id: 1,
    title: 'Real Estate Market Trends in 2024',
    date: 'August 20, 2024',
    excerpt: 'Explore the latest trends in the real estate market as we move through 2024...',
    content: 'The real estate market in 2024 is experiencing significant shifts...',
    imageUrl: 'https://media.batdongsan.vn/crop/200x150/news/94551cadb4ef5db104fe.jpg', // Link ảnh mẫu
  },
  {
    id: 2,
    title: 'How to Invest in Real Estate for Beginners',
    date: 'August 18, 2024',
    excerpt: 'If you are new to real estate investing, here are some tips...',
    content: 'Investing in real estate can be daunting for beginners, but with the right approach...',
    imageUrl: 'https://media.batdongsan.vn/crop/200x150/news/photo1631669156989-16316691571161473395667.jpg', // Link ảnh mẫu
  },
  {
    id: 3,
    title: 'Top Locations for Property Investment in 2024',
    date: 'August 15, 2024',
    excerpt: 'Discover the best locations for property investment this year...',
    content: 'With the changing landscape of real estate, certain locations have emerged...',
    imageUrl: 'https://media.batdongsan.vn/crop/200x150/news/photo1631669156989-16316691571161473395667.jpg', // Link ảnh mẫu
  },
];

const NewsPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Real Estate News</h1>
      {newsArticles.map(article => (
        <div key={article.id} style={styles.article}>
            <a href={`/news/${article.id}`}>
          <img src={article.imageUrl} alt={article.title} style={styles.image} />
          <h2>{article.title}</h2>
            </a>
          <p style={styles.date}>{article.date}</p>
          <p>{article.excerpt}</p>
          <a href={`/news/${article.id}`} style={styles.readMore}>Read More</a>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    textAlign: 'center',
    marginBottom: '40px',
    fontSize: '2.5rem',
    color: '#333',
  },
  article: {
    marginBottom: '30px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  date: {
    color: '#777',
    fontSize: '0.9rem',
    marginBottom: '10px',
  },
  readMore: {
    color: '#007bff',
    textDecoration: 'none',
  }
};

export default NewsPage;