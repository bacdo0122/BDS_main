import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NewsCategories from '../components/news/NewsCategory';
import { fetchNews, fetchNewsCategory, fetchNewsDetails } from '../api/homeApi';

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
  const [news, setNews] = useState({});
  const [newsCategory, setNewsCategory] = useState([]);
  const [newCategoryId, setNewCategoryId] = useState(0);

  const handleChangeCategory = useCallback((id) => {
    setNewCategoryId(id);
  }, [newsCategory])

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

  const getNews = () => {
    fetchNewsDetails(id)
          .then((resp) => resp.json())
          .then((json) => {
            console.log("json:", json)
            setNews(json);
          });
  };
  useEffect(() => {
    getNews();
  }, [])


  if (!news) {
    return <p>Article not found!</p>;
  }
  return (
    <div style={{display: 'flex'}}>
    <NewsCategories newsCategory={newsCategory} handleChangeCategory={handleChangeCategory}/>
    <div style={styles.container}>
      <h1 style={styles.title}>{news.title}</h1>
      <p style={styles.date}>{news.createAt}</p>
      <img src={`http://localhost:3000/images/${news.image?.split(';')[0]}` || 'https://media.batdongsan.vn/crop/200x150/news/94551cadb4ef5db104fe.jpg'} alt={news.title} style={styles.image} />
      <span>
      {news.content?.split(/\\n|\n/).map((paragraph, index) => (
        <p key={index} style={styles.content}>{paragraph}</p>
      ))}

      </span>
    </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color:'#fff',
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
    color:'#fff',
    marginBottom: '10px',
    wordWrap: 'break-word',
  },
};

export default NewsDetail;