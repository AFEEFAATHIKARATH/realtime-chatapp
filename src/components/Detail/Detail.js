import React, { useEffect, useState } from "react";
import "./Detail.css";
import { auth, db } from "../../library/firebase";
import { useChatStore } from "../../library/chatStore";
import { useUserStore } from "../../library/userStore";
import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

function Detail() {
  const [media, setMedia] = useState([]);
  const [chatMedias, setChatMedias] = useState(false);
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } =
    useChatStore();
  const { currentUser } = useUserStore();

  const handleBlock = async () => {
    if (!user) return;
    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Fetch chat media data
    const unsubscribe = onSnapshot(doc(db, "chats", chatId), (snapshot) => {
      const chatData = snapshot.data();
      if (chatData && chatData.messages) {
        const media = chatData.messages.filter((message) => message.img);
        setMedia(media);
      }
    });

    return () => unsubscribe();
  }, [chatId]);
  console.log(media);
  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || "img/avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>Be enough for yourself..😏😎</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="img/arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img src="img/arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img
              src={chatMedias ? "img/arrowDown.png" : "img/arrowUp.png"}
              alt=""
              onClick={() => {
                setChatMedias((prev) => !prev);
              }}
            />
          </div>
          {media.map((i) => (
            <div
              className="photos"
              style={{ display: chatMedias ? "flex" : "none" }}
            >
              <div className="photoItem">
                <div className="photoDetail">
                  <img src={i.img} alt="" />
                  <span>photo_23/01</span>
                </div>
                <a href={i.img} download target="_blank">
                  <img src="img/download.png" alt="" className="icon" />
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="img/arrowUp.png" alt="" />
          </div>
        </div>
        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "You are Blocked!"
            : isReceiverBlocked
            ? `⭕  Unblock ${user?.username}`
            : `🚫  Block ${user?.username}`}
        </button>
      </div>
    </div>
  );
}

export default Detail;
