import React from 'react';

const HomeNews = () => {
  const news = [
    { id: 1, title: 'Match Day Review', image: 'news1.jpg', excerpt: 'An exciting start to the league...' },
    { id: 2, title: 'Top Scorers', image: 'news2.jpg', excerpt: 'A look at the current top scorers...' },
    { id: 3, title: 'Injury Report', image: 'news3.jpg', excerpt: 'Players who might miss the next match...' }
  ];

  return (
    <div className="news-section mt-4">
      <h2>Latest News</h2>
      <div className="row">
        {news.map(item => (
          <div key={item.id} className="col-md-4">
            <div className="card mb-4">
              <img className="card-img-top" src={item.image} alt={item.title} />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.excerpt}</p>
                <a href="#" className="btn btn-primary">Read More</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeNews;
