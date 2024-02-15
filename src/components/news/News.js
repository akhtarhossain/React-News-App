import React, { useEffect, useState } from "react";

const News = () => {
  const [mynews, setMyNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("general");

  const fetchData = async () => {
    let response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${selectedCategory}&apiKey=0028eeb12be34323af08f159639a48df`
    );
    let data = await response.json();
    setMyNews(data.articles);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    fetchData();
  }, [selectedCategory]);

  return (
    <>
      <h1 className="text-center my-3">Enjoy Daily Top - Headlines</h1>
      <div className="container">
          <div className="col-3 mb-2">
            <label htmlFor="category">Select Category:</label>
            <select
              id="category"
              className="form-select"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <option value="general">General</option>
              <option value="business">Business</option>
              <option value="technology">Technology</option>
              <option value="science">Science</option>
              <option value="sport">Sport</option>
            </select>
          </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {mynews.map((ele, index) => (
            <div className="col" key={index}>
              <div className="card">
                <img
                  src={
                    ele.urlToImage == null
                      ? "https://kubrick.htvapps.com/vidthumb/f6865cb1-d77d-4a31-ba83-d57c4b2324d8/4b9c9d8f-ad14-47ea-bcf4-bf24ee0bb1f3.jpg?crop=0.383xw:0.383xh;0.517xw,0.252xh&resize=1200:*"
                      : ele.urlToImage
                  }
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {ele.author === "" ? "Janelle Ash" : ele.author}
                  </h5>
                  <p className="card-text">{ele.title}</p>
                  <a
                    href={ele.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default News;
