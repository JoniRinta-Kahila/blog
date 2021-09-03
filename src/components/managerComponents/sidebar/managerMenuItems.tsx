import React from "react";

interface IManagerMenuItem {
    name: string
    to: string
    key: number
}

const ManagerMenuItems: IManagerMenuItem[] = [
    {
        name: 'Editor',
        to: '/editor',
        key: 1,
    }
]

export default ManagerMenuItems;