// import { useState } from 'react'
import './tabs.scss'
export const Tabs = ({ areaName, setAreaName, items }) => {
    return <div className="area-tabs">
        {/* <button
            className="btn-recent"
            onClick={() => setAreaName('recent')}>Recent Posts</button> */}
        {
            items.map((item, index) => <button key={`${item.itemName}-${index}`}
            className={`btn-${item.itemName} ${areaName === item.itemName && 'btn-strong'}`}
            onClick={() => setAreaName(item.itemName)}>{item.itemTitle}</button>)
        }
    </div>
}