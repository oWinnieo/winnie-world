// // import { useSelector, useDispatch } from 'react-redux';
// // import { setRecentNote } from './recentNoteSlice';

// export const RecentNote = () => {
// //   const recentNote = useSelector((state) => state.recentNote.content);
// //   const dispatch = useDispatch();

// //   const handleReadNote = (noteContent) => {
// //     dispatch(setRecentNote(noteContent));
// //   };

//   return (
//     <div>
//       <h1>个人博客首页</h1>
//       {/* {recentNote && (
//         <div>
//           <h2>最近阅读的笔记</h2>
//           <p>{recentNote}</p>
//         </div>
//       )}
//       <button onClick={() => handleReadNote('这是一条示例笔记内容')}>阅读笔记</button> */}
//     </div>
//   );
// }

// ~~~~~~
// 


// components/RecentNote.tsx
'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/../store';
import { setRecentNote } from '@/../store/recentNoteSlice';
import { updateEditPost, clearEditPost } from '@/../store/editPostCacheSlice';
import { strSliced, html2txt } from '@/lib/utils';

const RecentNote = () => {
  const dispatch = useDispatch<AppDispatch>();
  const recentNote = useSelector((state: RootState) => state.recentNote.content);
  const editPost = useSelector((state: RootState) => state.editPostCache.con)

  const handleViewNote = () => {
    // dispatch(setRecentNote({ title: '最近的笔记', body: '这是你刚刚查看的内容。' }));
  };

  return (
    <div style={{ padding: 20 }}>
      <p>11</p>
      <button onClick={handleViewNote}>模拟查看一条数据</button>

      {editPost ? ( // wtest recentNote
        <div style={{ marginTop: 20, padding: 10, border: '1px solid #ccc' }}>
          <h3>最近查看：</h3>
          {/* <p><strong>{recentNote.title}</strong></p>
          <p>{recentNote.body}</p> */}
          <p>{JSON.stringify(editPost.title)}, {JSON.stringify(strSliced(html2txt(editPost.content), 20))}</p>
        </div>
      ) : (
        <p>暂无最近查看内容</p>
      )}
    </div>
  );
};

export { RecentNote }