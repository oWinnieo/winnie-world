import { PageWrap } from '@components/pageWrap/pageWrap'
import { AreaTitle } from '@components/areaTitle/areaTitle'
import Link from 'next/link'

const listLearning = [
    {
        title: 'English',
        link: '/learning/english'
    },
    {
        title: 'Japanese',
        link: '/learning/japanese'
    },
    {
        title: 'Server Deployment',
        link: '/learning/server'
    },
    // {
    //     title: 'Coming Soon ...',
    // },
    // {
    //     title: 'Coming Soon ...',
    // }
]

export default function Learning () {
    return (
        <PageWrap>
            <AreaTitle>Learning Area</AreaTitle>
            <ul>
                {
                    listLearning.map(item => (
                        item.link
                            ? <li key={item.title}><Link href={item.link}>{item.title}</Link></li>
                            : <li key={item.title}>{item.title}</li>
                    ))
                }
            </ul>
        </PageWrap>
    )
}