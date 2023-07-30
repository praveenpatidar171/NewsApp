import React, {useState, useEffect} from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
const News = (props) =>{
    const[articles, setArticles] = useState([])
    const[loading,setLoading] = useState(true)
    const[page, setPage] = useState(1)
    const[totalResults, setTotalresults] = useState(9)
    const capatalizefirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6d2cf2d6410c4182ae09303e0a576d7a&page=${page}&pageSize=${props.pageSize}`;

        setLoading(false);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        setArticles(parsedData.articles);
        setTotalresults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(70);
        props.setProgress(100);
    }
    useEffect(() => {
       document.title = `${capatalizefirstLetter(props.category)} News`;
       updateNews();
    }, [])

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6d2cf2d6410c4182ae09303e0a576d7a&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1);
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles));
        setTotalresults(parsedData.totalResults);

    };
        return(
            <>
                {/* <div className="container my-2"> */}
                <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>NewsApp- Top {capatalizefirstLetter(props.category)} Headlines</h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                >
                    <div className="container my-2">
                        <div className="row my-4">
                            {articles.map((element) => {
                                return <div className="col-md-4 my-2" key={element.url}>
                                    <Newsitem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} author={element.author} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>

            </>
        )
                }

News.defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News