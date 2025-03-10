import { VisitorStatistics } from '@/app/components/visitorStatistics/visitorStatistics';
import './pageWrap.scss'
export const PageWrap = ({ children }) => {
    return (
        <div className="page">
            <div className="page-in">
                <VisitorStatistics></VisitorStatistics>
                {children}
            </div>
        </div>
    )
}