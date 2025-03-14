'use client'
// import Image from "next/image"; // wtest
import { Greet } from '../components/greet'
import { Counter } from '../components/counter'
import Link from 'next/link'
import { VisitorStatistics } from '@/app/components/visitorStatistics/visitorStatistics';
// import Hello from '@components/hello'; // wtest ts
import './style.scss'

// export const Home = () => { // wtest wrong?
const Home = () => {
    return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <div className="page-home">
    {/* <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start"> */}
        <div className="area area-welcome">
            <div className="area-in">
                <h2>Welcome to Winnie&apos;s World 1st Page</h2>
                {/* <Hello name="TypeScript"></Hello> */}
            </div>
        </div>
        <div className="area area-navigation">
            <div className="area-in">
                {/* <VisitorStatistics></VisitorStatistics> */}
                <ul>
                    <li><Link href="/about">About Me</Link></li>
                    <li><Link href="learning">Learning</Link></li>
                </ul>
            </div>
        </div>
        {/* <li><Link href="/blog/first-post">blog/first-post</Link></li> */}
        {/* <Greet />
        <Counter /> */}
        {/* </main> */}
    </div>
    )
}
export default Home;