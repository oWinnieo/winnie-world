import { useDispatch } from 'react-redux';
import { setRecentNote } from '@/../store/recentNoteSlice';
import { AppDispatch } from '@/../store';

interface NoteType {
  id: string;
  title: string;
  body: string;
}

export const NoteCard = ({ note }: { note: NoteType }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    // 设置为最近查看
    dispatch(setRecentNote(note));
    // 可选：跳转详情页
    // router.push(`/notes/${note.id}`);
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      <h3>{note.title}</h3>
      <p>{note.body.slice(0, 50)}...</p>
    </div>
  );
};

{/* <div onClick={handleClick} style={{ cursor: 'pointer' }}>
                    <h3>{note.title}</h3>
                    <p>{note.body.slice(0, 50)}...</p>
                  </div> */}
                  {/* <p>--- ~~~</p> */}