import React from 'react';
import { useParams } from 'react-router-dom';

const newsArticles = [
  {
    id: 1,
    title: 'Real Estate Market Trends in 2024',
    date: 'August 20, 2024',
    content: `Năm 2024 chứng kiến nhiều biến động trong thị trường bất động sản...\n
    Với sự thay đổi trong nhu cầu nhà ở, các khu vực ngoại ô trở nên phổ biến hơn...\n
    Công nghệ đã và đang tác động lớn đến cách thức mua bán và quản lý bất động sản...`,
    imageUrl: 'https://media.batdongsan.vn/crop/200x150/news/94551cadb4ef5db104fe.jpg', // Link ảnh mẫu
  },
  {
    id: 2,
    title: 'How to Invest in Real Estate for Beginners',
    date: 'August 18, 2024',
    content: 'Investing in real estate can be daunting for beginners, but with the right approach...',
    imageUrl: 'https://example.com/image2.jpg',
  },
  {
    id: 3,
    title: 'Top Locations for Property Investment in 2024',
    date: 'August 15, 2024',
    content: 'With the changing landscape of real estate, certain locations have emerged...',
    imageUrl: 'https://example.com/image3.jpg',
  },
];

const NewsDetail = () => {
  const { id } = useParams();
  const article = newsArticles.find(article => article.id === parseInt(id));
  if (!article) {
    return <p>Article not found!</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{article.title}</h1>
      <p style={styles.date}>{article.date}</p>
      <img src={article.imageUrl} alt={article.title} style={styles.image} />
      {article.content.split('\n').map((paragraph, index) => (
        <p key={index} style={styles.content}>{paragraph}</p>
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
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#333',
  },
  date: {
    color: '#777',
    fontSize: '0.9rem',
    marginBottom: '20px',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  content: {
    lineHeight: '1.6',
    fontSize: '1.2rem',
  },
};

export default NewsDetail;