import React, { useState } from "react";
import { useEffect } from "react";
import { api } from "../api";
import axios from "axios";
import YaziYorumları from "./YaziYorumlari";
import { Link } from "react-router-dom";
import SilModal from "./SilModal";
import { useHistory } from "react-router";

const YaziDetayi = (props) => {
  const { id } = props.match.params;
  const [yaziDetayi, setYaziDetayi] = useState({});
  const [yorumlar, setYorumlar] = useState([]);
  const history = useHistory();
  const handleCommentSubmit = (event, yorum) => {
    api()
      .post(`https://react-yazi-yorum.herokuapp.com/posts/${id}/comments`, {
        display_name: yorum.display_name,
        body: yorum.body,
      })
      //adresten sonra gelen ikinci parametre olan obje veri tabanına kaydetmek istediğimiz yorumun objesi
      .then((response) => {
        setYorumlar(...yorumlar, response.data);
      })
      .catch((err) => console.error(err));
    event.preventDefault();
  };

  useEffect(() => {
    axios
      .all([
        api().get(`https://react-yazi-yorum.herokuapp.com/posts/${id}`),
        api().get(
          `https://react-yazi-yorum.herokuapp.com/posts/${id}/comments`
        ),
      ])
      .then((response) => {
        setYaziDetayi(response[0].data);
        setYorumlar(response[1].data);
      });
  }, []);

  return (
    <React.Fragment>
      <h2 className="ui header">{yaziDetayi.title}</h2>
      <p>{yaziDetayi.created_at}</p>
      <div className="ui buttons">
        <Link className="ui blue button" to={`/posts/${yaziDetayi.id}/edit`}>Düzenle</Link>
        <SilModal yazi={yaziDetayi} push={history.push}/>
      </div>
      <p>{yaziDetayi.content}</p>
      <YaziYorumları yorumlar={yorumlar} handleSubmit={handleCommentSubmit} />
    </React.Fragment>
  );
};
export default YaziDetayi;
