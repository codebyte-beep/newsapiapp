// yaad rkhe class component m state and methods m this. lagana na bhule
import React, { useState, useEffect } from 'react'
import NewsItem from "./NewsItem.js"
import Spinner from "./Spinner.js"
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News= (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState([true])
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const Capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }
//   document.title = `${this.Capitalize(props.category)} - NewsMonkey`
const updateNews = async() => {
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2a4b10e08caa47a5a073b906557e5fb1&page=${page}&pageSize=${props.pageSize}`
  setLoading(true)
  let data = await fetch(url)
  let parsedData = await data.json()
  console.log(parsedData)
  setArticles(parsedData.articles)
  setTotalResults(parsedData.totalResults)
  setLoading(false)
}
useEffect(() => {
  updateNews()
}, [])


//   handlePrevClick = async () => {
//     setPage(page-1)
//     updatNews()
//   }
//   handleNextClick = async () => {
    //  setPage(page+1)
//     updateNews()
//   }
  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2a4b10e08caa47a5a073b906557e5fb1&page=${page+1}&pageSize=${props.pageSize}`
    setPage(page+1)
    let data = await fetch(url)
    let parsedData = await data.json()
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    
  }
    return (
      <div className="container my-3">
        <h1 className='text-center' style={{ marginTop: "84px", marginBottom: "24px" }}>NewsMonkey - Top {Capitalize(props.category)} Headlines  </h1>
      
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
          style={{overflowX: "hidden"}}
        >
            <div className="row">
              {console.log(articles.length)}
              {articles.map((element) => {
                return (
                  // jab bhi .map() krke iterate krte ho to unique key prop dena hota h
                  <div key={element.url} className="col-md-4">
                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : ""} newsUrl={element.url ? element.url : ""} author={element.author} date={element.publishedAt} source={element.source.name} />
                  </div>
                )
              })}
            </div>
        </InfiniteScroll>
        {/* <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              // jab bhi .map() krke iterate krte ho to unique key prop dena hota h
              <div key={element.url} className="col-md-4">
                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : ""} newsUrl={element.url ? element.url : ""} author={element.author} date={element.publishedAt} source={element.source.name}/>
              </div>
            )
          })}
        </div> */}
        {/* <div className="d-flex justify-content-between">
          <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button type="button" className="btn btn-dark" disabled={this.state.page === Math.ceil(this.state.totalResults / props.pageSize)}
            onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </div>
    )
  
}
News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general"
  }
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
export default News
