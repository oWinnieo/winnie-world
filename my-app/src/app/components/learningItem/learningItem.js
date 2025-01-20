import Link from 'next/link'
import './learningItem.scss'
export const LearningItem = ({ title, content, id }) => {
    const itemUrl = `/learning/english/${id}`
    return (
        <div className="item-learning">
            <h3>{title}</h3>
            <p>{content}</p>
            <p>{}</p>
            <Link href={itemUrl}>More...</Link>
        </div>
    )
}