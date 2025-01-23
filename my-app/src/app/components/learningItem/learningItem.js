import Link from 'next/link'
import { timeFormatter } from '../../../../lib/util'
import './learningItem.scss'
export const LearningItem = ({ title, content, createdAt, id }) => {
    const itemUrl = `/learning/english/${id}`
    return (
        <div className="item-learning">
            <h3>{title}</h3>
            <p>{content}</p>
            <p>{timeFormatter(createdAt)}</p>
            <Link href={itemUrl}>More...</Link>
        </div>
    )
}