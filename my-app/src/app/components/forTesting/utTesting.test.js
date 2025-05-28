import React from 'react';
import { render, cleanup, waitForElement } from '@testing-library/react';
// import axios from 'axios';
import Hello from '../app/components/forTesting/utTesting';

const listOfData = {
    "dataNew":[
        {
            "_id":"68245f7b9a247a3eb144b89d",
            "title":"111",
            "content":"<p>111</p>",
            "authorId":"adminid",
            "tags":[],
            "status":"released",
            "createdAt":"2025-05-14T09:16:43.087Z",
            "updatedAt":"2025-05-14T09:16:43.087Z",
            "__v":0,
            "authorInfo": {
                "_id":"67cc69a9887513096c738abf",
                "name":"Ryuuna R",
                "email":"ryuuna2010@gmail.com",
                "userId":"adminid",
                "image":"https://aa.png",
                "role":"mainAdmin",
                "__v":0,
                "updatedAt":"2025-03-13T13:48:22.644Z",
                "editorId":"adminid"
            },
            "countComment":0,
            "countLike":0,
            "countFavorite":0,
            "countShare":0,
            "contentSliced":"111"
        },
        {
            "_id":"68245f5b9a247a3eb144b87f",
            "title":"11",
            "content":"<p>11</p>",
            "authorId":"adminid",
            "tags":[],
            "status":"released",
            "createdAt":"2025-05-14T09:16:11.216Z",
            "updatedAt":"2025-05-14T09:16:11.216Z",
            "__v":0,
            "authorInfo": {
                "_id":"67cc69a9887513096c738abf",
                "name":"Ryuuna R",
                "email":"ryuuna2010@gmail.com",
                "userId":"adminid",
                "image":"https://aa.png",
                "role":"mainAdmin",
                "__v":0,
                "updatedAt":"2025-03-13T13:48:22.644Z",
                "editorId":"adminid"
            },
            "countComment":0,
            "countLike":0,
            "countFavorite":0,
            "countShare":0,
            "contentSliced":"11"
        }
    ],
    "totalItems":11,
    "totalPages":6,
    "currentPage":1
}
// jest.mock('axios');
jest.mock('@/lib/getData', () => {
    return {
      getListDataOfItems: jest.fn().mockImplementation(() => ({
        ...listOfData, // 直接返回不是 Promise
      })),
    }
  })

afterEach(cleanup);

it('renders hello correctly', async () => {
//   axios.get.mockResolvedValue({
//     data: [
//       { id: 1, title: 'post one' },
//       { id: 2, title: 'post two' },
//     ],
//   });
  const { getByTestId, asFragment } = render(<Hello />);

  const listNode = await waitForElement(() => getByTestId('list'));
  expect(listNode.children).toHaveLength(2);
  expect(asFragment()).toMatchSnapshot();
});