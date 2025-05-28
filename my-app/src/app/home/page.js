'use client'
// import Image from "next/image"; // wtest
// import { Greet } from '../components/forTesting/greet' // wtest
import Hello from '@/app/components/forTesting/utTesting'
import { Counter } from '../components/forTesting/counter' // wtest
import { Greeting } from '../components/forTesting/Greeting'
import Link from 'next/link'
import { VisitorStatistics } from '@/app/components/visitorStatistics/visitorStatistics';
import { FontSvg } from './fontSvg';
//  from '@components/recentNote/recentNote'
import './style.scss'

// export const Home = () => { // wtest wrong?
/* wtest */
const defaultProps = {
    "urlDomain":"learning",
    "collectionName":"english",
    "learningItemConfig": {
        "title": {
            "title":"Title",
            "editType":"text",
            "default":"",
            "required":true
        },
        "status": {
            "title":"Status",
            "editType":"radioBox",
            "default":"draft",
            "required":true,
            "options": [
                {"name":"draft","lvl":0},
                {"name":"released","lvl":1}
            ]
        },
        "content": {
            "title":"Content",
            "editType":"richText",
            "default":"",
            "required":true
        },
        "authorInfo":{},
        "tags":{}
    },
    "session": {
        "user": {
            "name":"aa",
            "email":"aa@qq.com",
            "userId":"123",
            "image":"https://aa.png",
            "role":"mainAdmin"
        }
    },
    'group': 'learning'
}
/* /wtest */
const Home = () => {
    return (
    <div className="page-home">
        <div className="area area-welcome">
            <div className="area-in">
                {/* <!-- 定义SVG滤镜 --> */}
                <h2>Welcome to </h2><FontSvg />
            </div>
        </div>
        <div className="area area-navigation">
            <div className="area-in">
                {/* <Hello {...defaultProps}></Hello> */}
                {/* <Greeting name="UT Testing"></Greeting> */}
                {/* <Greet {...defaultProps}></Greet> */}
                {/* <VisitorStatistics></VisitorStatistics> */}
                <ul>
                    <li><Link href="/about">About Me</Link></li>
                    <li><Link href="learning">Learning</Link></li>
                </ul>
            </div>
        </div>
    </div>
    )
}
export default Home;
