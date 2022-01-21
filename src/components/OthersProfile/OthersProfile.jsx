import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { sortPostsList } from "../../helpers/sortPostsList";
import { useParams } from "react-router-dom";

import HeaderProfile from "../HeaderProfile/HeaderProfile";
import PostContent from "../PostContent/PostContent";

import "./othersProfile.css";

function OthersProfile() {
  const { postsList, loggedUsers } = useContext(AppContext);
  const { authorUid } = useParams();

  //Obtiene la informacion la foto y el nickname del autor del post:
  const infoUser = loggedUsers
    .filter((logged) => logged.uid === authorUid)
    .map((logged) => {
      return {
        color: logged.color,
        nickname: logged.nickname,
        photo: logged.photo,
      };
    });

  //Filtra la lista de los posts y devuelve solo los que corresponden al autor:
  const filteredList = postsList.filter((post) => post.authorUid === authorUid);

  //Ordena lista de post según la fecha de publicación:
  sortPostsList(postsList);

  return (
    <div>
      {infoUser.map((info) => (
        <HeaderProfile
          color={info.color}
          key={info.nickname}
          nickname={info.nickname}
          src={info.photo}
        />
      ))}

      <hr />

      {filteredList.map((post) => (
        <PostContent
          authorUid={post.authorUid}
          color={post.authorColor}
          key={post.id}
          message={post.message}
          nickname={post.authorNickname}
          photo={post.authorPhoto}
          postId={post.id}
        />
      ))}
    </div>
  );
}

export default OthersProfile;
