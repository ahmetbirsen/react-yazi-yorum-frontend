import { api } from "../api";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router"; //Bunu kullanmamızın nedeni bu component'i app de tanımlamadığımız için history özelliğinini olmamasından dolayı.

const YaziFormu = (props) => {
  const [yazi, setYazi] = useState({ title: "", content: "" });
  const onInputChange = (event) => {
    setYazi({ ...yazi, [event.target.name]: event.target.value });
  };
  const [error, setError] = useState("");

  const onFormSubmit = (event) => {
    event.preventDefault(); //oluşturduğumuz yapı form değil ama ileride form'a dönüştürürsek sıkıntı çıkmaması için preventdefault yapabiliriz
    setError("");

    if (props.yazi?.title) {
      api()
        .put(`/posts/${props.match.params.id}`, yazi)
        .then((response) => {
          console.log(response);
          props.history.push(`/posts/${props.match.params.id}`);
        })
        .catch((err) => setError(err));
    } else {
      api()
        .post("https://react-yazi-yorum.herokuapp.com/posts", yazi)
        .then((response) => props.history.push("/"))
        .catch((error) => setError(error));
    }
  };

  useEffect(() => {
    if (props.yazi?.title && props.yazi?.content) setYazi(props.yazi);
  }, [props.yazi]);

  return (
    <React.Fragment>
      {error && (
        <div class="ui negative message">
          <i class="close icon"></i>
          <div class="header">Tüm Alanları Doldurunuz!</div>
        </div>
      )}

      <div className="ui form">
        <div className="field">
          <label>Yazı Başlığı</label>
          <input
            name="title"
            type="text"
            value={yazi.title}
            onChange={onInputChange}
          />
        </div>
        <div className="field">
          <label>Yazı İçeriği</label>
          <textarea
            rows="3"
            name="content"
            value={yazi.content}
            onChange={onInputChange}
          ></textarea>
        </div>
        <button className="ui primary button" onClick={onFormSubmit}>
          Gönder
        </button>
        <button className="ui button">İptal ET</button>
      </div>
    </React.Fragment>
  );
};

export default withRouter(YaziFormu);
