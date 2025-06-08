'use client'
import Link from 'next/link'
import { html2txt, strSliced } from '@/lib/utils';
export const UserComment = ({
    item,
    itemUrl
}) => {
    return <li>
            <Link href={itemUrl}>{item.content} to: {item.belongToItemInfo?.content ?
            strSliced(html2txt(item.belongToItemInfo.content)) : '?'}</Link></li>
}