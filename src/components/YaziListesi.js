import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

const YaziListesi = (props) => {
  const [yaziListesi, setYaziListesi] = useState([]);

  useEffect(() => {
   api()
      .get("/posts")
      .then((response) => {
        setYaziListesi(response.data);
      });
  }, []);

  return (
    <div className="ui relaxed divided list">
      {yaziListesi.map((yazi) => {
        return (
          
            <div className="item" key={yazi.id}>
              <i className="large github middle aligned icon"></i>
              <div className="content">
                <Link to={`/posts/${yazi.id}`} className="header" href="/">
                  {yazi.title}
                </Link>
                <div className="description">{yazi.created_at}</div>
              </div>
            </div>
          
        );
      })}{" "}
    </div>
  );
};
export default YaziListesi;
