import React, { useCallback, useEffect, useState } from 'react';
import NewsCategories from '../components/news/NewsCategory';
import { fetchHomeDetails, fetchNews, fetchNewsCategory } from '../api/homeApi';
import { useParams } from 'react-router-dom';

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
  const params = useParams('id')
  const [news, setNews] = useState([]);
  const [newsCategory, setNewsCategory] = useState([]);

  const getNews = () => {
    fetchNews(params.newCategoryId)
          .then((resp) => resp.json())
          .then((json) => {
            setNews(json.data);
          });
  };

  const getNewsCategory = () => {
    fetchNewsCategory()
          .then((resp) => resp.json())
          .then((json) => {
            setNewsCategory(json.data);
          });
  };
  useEffect(()=>{
    getNewsCategory()
  }, [])

  useEffect(() => {
    getNews();
  }, [params.newCategoryId])




  console.log("news:", news[0].image.split(';')[0])
  return (
    <div style={{display: 'flex'}}>
    <NewsCategories newsCategory={newsCategory}/>
    <div style={styles.container}>
      <h1 style={styles.title}>Tin tức bất động sản</h1>
      {news.map(article => (
        <div key={article.id} style={styles.article}>
            <a href={`/news/getDetails/${article.id}`}>
          <img src={`http://localhost:3000/images/${article.image.split(';')[0]}`} alt={article.title} style={styles.image} />
          <h2>{article.title}</h2>
            </a>
          <p style={styles.date}>{article.createAt}</p>
          <span >{(article.content.substring(0, 200) + '...').split('\n').map((paragraph, index) => (
    <p key={index} style={styles.content}>{paragraph}</p>
  ))} <a href={`/news/getDetails/${article.id}`} style={styles.readMore}>Xem thêm</a></span>
         
        </div>
      ))}
    </div>
    </div>
  );
};

const styles = {
  content: {
    marginBottom: '10px',
    wordWrap: 'break-word',
  },
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    flex: 1
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