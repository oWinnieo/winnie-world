// https://stackoverflow.com/questions/60115885/how-to-solve-the-update-was-not-wrapped-in-act-warning-in-testing-library-re

/*
这个警告说明：组件 Hello 内部发生了 setState 或副作用更新，但这个更新没有被 act(...) 包裹，从而导致测试环境中的行为和用户环境可能不一致。

即使你在 render(...) 外部用了 act(...)，如果组件内部有 useEffect(() => asyncFn(), [])，而 asyncFn() 内部再 setState，这些异步状态更新 仍然可能“逃逸”出 act(...) 的追踪，从而触发这个警告。
*/
import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { getListDataOfItems } from '@/lib/getData'

const wtest_p1 = {"urlDomain":"http://localhost:3000/api/learning","collectionName":"english","group":"learning","page":1,"limit":5}


export default function Hello(defaultProps) {
  const {
    urlDomain,
    group,
    collectionName,
    learningItemConfig,
    // listData, // wtest page
    session
} = defaultProps
  const [posts, setPosts] = useState([]);
  const getListDataOfCol = async ({ urlDomain }) => {
    // setListData([])
    const {
        dataNew: listData,
        totalItems,
        totalPages,
        currentPage
    } = await getListDataOfItems({
        ...wtest_p1,
        page: 1,
        limit: 100
    });
    // setListData(listData)
    // setTotalItems(totalItems)
    // setTotalPages(totalPages)
    // setCurrentPage(currentPage)
    return {
      listData,
      totalItems,
      totalPages,
      currentPage
  }
}

  useEffect(() => {
    const fetchData = async () => {
      // const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      const response = await getListDataOfCol({ urlDomain })
      // setPosts(response.data);
      console.log('response.listData', response.listData)
      setPosts(response.listData);
    };

    fetchData();
  }, []);

  return (
    <div>wtest
      <ul data-testid="list">
        {posts.map((post) => (
          <li key={post._id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}