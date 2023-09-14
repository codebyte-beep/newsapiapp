// yaad rkhe class component m state and methods m this. lagana na bhule
// this is my version of harry.js essentially I have made an object state rather than individual states like in harry.js
import React, { useEffect, useState } from 'react'
import NewsItem from "./NewsItem.js"
import Spinner from "./Spinner.js"
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

    const Capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }
    const [whatever, setWhatever] = useState({
        articles: [],
        loading: true,
        page: 1,
        totalResults: 0,
    })
    
    const update = async (a) => {
        document.title = `${Capitalize(props.category)} - NewsMonkey`
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2a4b10e08caa47a5a073b906557e5fb1&page=${whatever.page + a}&pageSize=${props.pageSize}`
        // setWhatever({ loading: true })
        let data = await fetch(url)
        let parsedData = await data.json()
        // console.log(parsedData);
        setWhatever({
            articles: parsedData.articles,
            loading: false,
            page: whatever.page + a,
            totalResults: parsedData.totalResults,
            // articleLength: whatever.articleLength+parsedData.articles.length
        })
    }

    useEffect(() => {
        update(0)
    }, [])

    // const handlePrevClick = async () => {
    //     update(-1)
    // }
    // const handleNextClick = async () => {
    //     update(1)
    // }
    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2a4b10e08caa47a5a073b906557e5fb1&page=${whatever.page + 1}&pageSize=${props.pageSize}`
        let data = await fetch(url)
        let parsedData = await data.json()
        setWhatever({
            articles: whatever.articles.concat(parsedData.articles),
            loading: false,
            page: whatever.page + 1,
            totalResults: parsedData.totalResults,
            // articleLength: whatever.articleLength + parsedData.articles.length
        })
        // console.log(this.articles)
    }
    return (
        <div className="container my-3">
            <h1 className='text-center' style={{ marginTop: "84px", marginBottom: "24px" }}>NewsMonkey - Top {Capitalize(props.category)} Headlines  </h1>
            {whatever.loading && <Spinner/>}
            <InfiniteScroll
                dataLength={whatever.articles.length}
                next={fetchMoreData}
                // hasMore={whatever.articles?whatever.articles.length:0 !== whatever.totalResults}
                hasMore={whatever.articles.length !== whatever.totalResults}
                loader={<Spinner />}
                style={{ overflowX: "hidden" }}
            >
                <div className="row">
                    {whatever.articles.map((element) => {
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
                {!whatever.loading && whatever.articles.map((element) => {
                    return (
                        // jab bhi .map() krke iterate krte ho to unique key prop dena hota h
                        <div key={element.url} className="col-md-4">
                            <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : ""} newsUrl={element.url ? element.url : ""} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    )
                })}
            </div>
            <div className="d-flex justify-content-between">
                <button type="button" disabled={whatever.page <= 1} className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
                <button type="button" className="btn btn-dark" disabled={whatever.page === Math.ceil(whatever.totalResults / props.pageSize)}
                    onClick={handleNextClick}>Next &rarr;</button>
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
