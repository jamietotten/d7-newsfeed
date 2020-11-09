import React from "react";
import { truncate, formatDate } from "../utils/utils";

const NewsArticle = ({ article }) => {
  return (
    article.urlToImage &&
      <article className="news-article" style={{backgroundImage: `url(${article.urlToImage})`}}>
        <section className="article-copy">

          <header>
            <h2>{truncate(article.title, 65)}</h2>
            <section className="article-metadata">
            { !!article.author ? <span><span>{article.author}</span><span className="metadata-divider">|</span></span> : ""} <span>{formatDate(article.publishedAt)}</span>
            </section>
          </header>

          <section className="article-description">
            <p>{truncate(article.description, 180)}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noreferrer"
              className="button"
            >
              Read More
            </a>
          </section>

        </section>
      </article>
  );
};

export default NewsArticle;
