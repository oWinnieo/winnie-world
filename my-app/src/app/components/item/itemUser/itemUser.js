'use client'
import { useState } from "react";
import { AvatarOfUser } from '@/app/components/avatarOfUser/avatarOfUser'
import './itemUser.scss'
export const ItemUser = ({ status, item, isEditItem, ToggleAddItem, params, id, session }) => {
    return (
        <div className="area-user">
            <div className="user-info">
                <div className="area-avatar">
                    {/* <img className="auth-avatar" src={item.image} alt="User Avatar" /> */}
                    <AvatarOfUser
                        srcImage={item.image}
                    ></AvatarOfUser>
                </div>
                <div className="area-info">
                    {isEditItem ? <div>editing</div> :
                    <>
                        <p>name: {item.name}</p>
                        <p>userId: {item.userId}</p>
                        {/* <p>_id: {item._id}</p> wtest */}
                        <p>email: {item.email}</p>
                        <p>role: {item.role}</p>
                        {session?.user?.role === 'mainAdmin' &&
                        <button className="btnEdit"
                            onClick={ToggleAddItem}>Edit</button>}
                    </>}
                </div>
            </div>
            
            {status &&
                <div className="area-content-tools">
                    <button className={status ? 'available' : 'disabled'} onClick={ToggleAddItem}>
                        {/* checkAddStatus wtest */}
                        {isEditItem ? 'Cancel Edit' : 'Edit Item'
                        }
                    </button>
                    {/* <button
                        onClick={() => delConfirm({ nameForConfrom: item.title })}>Delete</button> */}
                </div>
            }
        </div>
    )
}