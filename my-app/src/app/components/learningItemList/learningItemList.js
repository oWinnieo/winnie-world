import { LearningItem } from '@/app/components/learningItem/learningItem'
export const LearningItemList = async () => {
    const { data } = await fetch('https://winnie-online.win/api/learning-item', {
        cache: 'no-store', // 等效于 SSR 的行为
    }).then(res => res.json());
    return (
        <ul>
            {/* {list.map(i => (
                <li key={i._id}>
                    <LearningItem
                        title={i.title}
                        content={i.content}
                    ></LearningItem>
                </li>
                // <p>{JSON.stringify(i)}</p>
            ))} */}
            {/* <p>wtest</p> */}
            {data.map(i => (
                <li key={i._id}>
                    <LearningItem
                        title={i.title}
                        content={i.content}
                        id={i._id}
                    ></LearningItem>
                </li>
                // <p>{JSON.stringify(i)}</p>
            ))}
        </ul>
    )
}