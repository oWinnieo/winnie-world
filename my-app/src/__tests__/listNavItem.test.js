/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { ListNavItem, itemDelete } from '@/app/components/list/listNavItem/listNavItem'
/* wtest */
import Link from 'next/link';
// import { useAlert } from '@/app/contexts/AlertContext'
// import { useModal } from '@/app/contexts/ModalContext'
// import { ModalContentDelConfirm } from '@/app/components/dialogElement/modal/modalContentDelConfirm'

// const { showAlert } = useAlert()
    // const { openModal, closeModal } = useModal()
const mockShowAlert = jest.fn()
jest.mock('@/app/contexts/AlertContext', () => ({
  useAlert: () => ({
    showAlert: mockShowAlert
  })
}))

// jest.mock('@/app/contexts/ModalContext', () => ({
//   useModal: () => ({
//     openModal: jest.fn(),
//     closeModal: jest.fn()
//   })
// }))
const mockCloseModal = jest.fn()
const mockOpenModal = jest.fn()

jest.mock('@/app/contexts/ModalContext', () => ({
  useModal: () => ({
    openModal: mockOpenModal,
    closeModal: mockCloseModal
  })
}))


jest.mock('@/app/components/dialogElement/modal/modalContentDelConfirm', () => ({
  ModalContentDelConfirm: ({ valueHandler }) => (
    <div>
      <button onClick={() => valueHandler(val)}>Check</button>
    </div>
  )
}))
/* /wtest */

// Mock 依赖
// jest.mock('next/link', () => ({ children }) => children)



// jest.mock('@/app/components/dialogElement/modal/modalContentDelConfirm', () => ({
//   ModalContentDelConfirm: ({ valueHandler }) => (
//     <div data-testid="modal-content">
//       <button onClick={() => valueHandler('delete')}>Confirm Delete</button>
//       <button onClick={() => valueHandler('cancel')}>Cancel Delete</button>
//     </div>
//   )
// }))

// mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true }),
  })
)
const defaultProps = {
  status: true,
  isEditItem: false,
  ToggleAddItem: jest.fn(),
  params: { urlDomain: '/api/delete', collectionName: 'test', group: "management" },
  id: '123',
  item: {
    authorId: "adminid",
    colName: "nextjs",
    createdAt: "2025-04-01T05:55:04.800Z",
    groupName: "learning",
    isEditItem: false,
    link: "/nextjs",
    title: "Nextjs",
    updatedAt: "2025-04-01T05:55:04.800Z",
    __v: 0,
    _id: "67eb7fb8604821e9484b9a21"
  }
}
describe('ListNavItem', () => {
  

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('title renders', () => {
    render(<ListNavItem {...defaultProps} />)
    expect(screen.getByText('Nextjs')).toBeInTheDocument()
  })

  it('edit button and delete button when status is true', () => {
    render(<ListNavItem {...defaultProps} />)
    expect(screen.getByText('Edit Item')).toBeInTheDocument()
    expect(screen.getByText('Delete')).toBeInTheDocument()
  })

  it('edit button displays "Cancel Edit" when isEditItem is true', () => {
    const defaultPropsWithIsEditItemTrue = {
      ...defaultProps,
      isEditItem: true
    }
    render(<ListNavItem {...defaultPropsWithIsEditItemTrue} />)
    expect(screen.getByText('Cancel Edit')).toBeInTheDocument()
  })



  it('opens modal when clicking Delete', () => {
    render(<ListNavItem {...defaultProps} />)
    fireEvent.click(screen.getByText('Delete'))
    expect(mockOpenModal).toHaveBeenCalled()
  })


})



describe('itemDelete', () => {
  let originalLocation
  beforeEach(() => {
    // global.fetch = jest.fn()
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ success: true }),
    })
  
    // window.location.reload = jest.fn()
    originalLocation = window.location;
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: {
        ...window.location,
        reload: jest.fn(),
      },
    })
  })
  afterEach(() => {
    // 恢复原始方法
    Object.defineProperty(window, 'location', {
      value: originalLocation,
      configurable: true,
      writable: true,
      enumerable: true,
    });
  });

  it('calls API and reloads page on success', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ success: true }),
    })

    await act(async () => {
      await itemDelete({
        params: { urlDomain: '/api/delete', collectionName: 'test' },
        id: '123',
      })
    })

    expect(fetch).toHaveBeenCalledWith('/api/delete?collectionName=test', expect.objectContaining({
      method: 'DELETE',
    }))
    expect(window.location.reload).toHaveBeenCalled()
  })

  it('throws error on failure response', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ success: false }),
    })

    await expect(itemDelete({
      params: { urlDomain: '/api/delete', collectionName: 'test' },
      id: '123',
    })).rejects.toThrow('Failed to delete an item.')
  })
})


describe('delConfirm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('opens modal with correct content when delete button is clicked', () => {
    render(<ListNavItem {...defaultProps} />);
    fireEvent.click(screen.getByText('Delete'));
    
    // 断言模态框被正确调用
    expect(mockOpenModal).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'del confirm',
        content: `<${defaultProps.item.title}>: Are you sure to delete this item? (If yes, please enter the world \'delete\')`,
        childEl: expect.any(Function),
      })
    );
  });
  
  it('passes enterDelWord as valueHandler to ModalContentDelConfirm', () => {
    render(<ListNavItem {...defaultProps} />);
    fireEvent.click(screen.getByText('Delete'));
    
    // 获取传递给 openModal 的 childEl 函数
    const { childEl } = mockOpenModal.mock.calls[0][0];
    const { valueHandler } = childEl().props;
    
    // 断言 valueHandler 是 enterDelWord 函数
    expect(valueHandler).toBeInstanceOf(Function);
    
    // 模拟调用 valueHandler 并验证行为
    valueHandler('delete');
    
    expect(mockShowAlert).toHaveBeenCalledWith({
      message: 'delete confirm',
      type: 'success',
    });
  });
});