import React from 'react'
const Newsitem = (props) => {
    let {title, description, imageUrl, newsUrl, author, date, source} = props 
    return (
        <div className="card">
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"92%", zIndex: '1'}}>{source}</span>
            <img src={imageUrl?imageUrl:"https://images.indianexpress.com/2023/04/supermassive-black-hole.jpg"} className="card-img-top" alt="..."/>
            <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-body-secondary"> By {author? author: "Unknown"} on {new Date(date).toGMTString()} </small></p>
            <a rel="noopener noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn-primary">Read More</a>
            </div>
      </div>
    )
}

export default Newsitem