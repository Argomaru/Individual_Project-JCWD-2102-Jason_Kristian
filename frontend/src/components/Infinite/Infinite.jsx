import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
// import UserService from 'services/UserService';

export default function InfiniteScrollerWithReactInfiniteScroller() {
  const [contentList, setContentList] = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [loadCom, setLoadCom] = useState(1);
  const fetchList = async () => {
    setTimeout(() => {
      axiosInstance
        .get(`/post`)
        .then((res) => {
          const temp = res.data.result;
          setContentList(temp);

          console.log(res);
        })
        .catch((err) => {})
        .finally(() => {
          setIsLoadingPost(false);
        });
    }, 2000);
  };

  const loadPage = async () => {
    const req = await axiosInstance.get(
      `/post/getPostPaging?=page=${loadPage}&limit=5`
    );
    const data = req.data.result;
    if (data.length != 0) {
      setPage(page + 1);
      setContentList([...contentList, ...newPost]);
    }
    console.log(page);
    console.log(req.data.result);
    console.log(contentList.length);

    
  };

  return (
    <div>
      <div className="section">
        <InfiniteScroll
          threshold={0}
          pageStart={0}
          loadMore={loadUserList}
          hasMore={hasMoreItems}
          loader={<div className="text-center">loading data ...</div>}
        >
          {userList.map((user, i) => (
            <div className="box m-3 user" key={i}>
              <img src={user.avatar} alt={user.first_name} />
              <div className="user-details">
                <strong>Email</strong>: {user.email}
                <br />
                <strong>First Name</strong>: {user.first_name}
                <br />
                <strong>Last Name</strong>: {user.last_name}
                <br />
              </div>
            </div>
          ))}
        </InfiniteScroll>
        {hasMoreItems ? (
          ""
        ) : (
          <div className="text-center">no data anymore ...</div>
        )}
      </div>
    </div>
  );
}
