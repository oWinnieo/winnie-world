import { LearningItem } from '@/app/components/learningItem/learningItem'
export const LearningItemList = ({ list }) => {
    return (
        <ul>
            {list.map(i => (
                <li>
                    <LearningItem
                        title={i.title}
                        content={i.content}
                    ></LearningItem>
                </li>
                // <p>{JSON.stringify(i)}</p>
            ))}
        </ul>
    )
}