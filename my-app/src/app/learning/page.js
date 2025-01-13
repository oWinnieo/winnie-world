import { PageWrap } from '@components/pageWrap/pageWrap'
import { AreaTitle } from '@components/areaTitle/areaTitle'
import Link from 'next/link'

export default function Learning () {
    return (
        <PageWrap>
            <AreaTitle>Learning Area</AreaTitle>
            <ul>
                <li><Link href="/learning/english">English</Link></li>
                <li><Link href="/learning/japanese">Japanese</Link></li>
                <li>Coming Soon ...</li>
                <li>Coming Soon ...</li>
                <li>Coming Soon ...</li>
            </ul>
        </PageWrap>
    )
}