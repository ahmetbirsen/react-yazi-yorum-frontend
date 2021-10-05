import React, { useEffect, useState } from "react";
import { api } from "../api";
import YaziFormu from "./YaziFormu";

const YaziDuzenle = (props)=> {
    const [yazi,setYazi] = useState({});
    const {id} = props.match.params;

    useEffect(()=>{
        api().get(`/posts/${id}`).
        then(respose =>{
            setYazi({title : respose.data.title , content : respose.data.content});
        });
    })
    return(
        <div>
            <h1>Yazi Duzenle</h1>
            <YaziFormu yazi={yazi}/>
        </div>
    )
}
export default YaziDuzenle;