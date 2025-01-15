import './learningItem.scss'
export const LearningItem = ({ title, content, addSuccess }) => {
    return (
        <div className="item-learning">
            <h3>{title}</h3>
            <p>{content}</p>
        </div>
    )
}