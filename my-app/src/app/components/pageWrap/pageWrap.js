import './pageWrap.scss'
export const PageWrap = ({ children }) => {
    return (
        <div className="page">
            <div className="page-in">
                {children}
            </div>
        </div>
    )
}