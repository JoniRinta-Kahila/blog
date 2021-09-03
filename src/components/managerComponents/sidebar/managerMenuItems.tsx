import React from "react";

interface IManagerMenuItem {
    name: string
    url: string
    key: number
}

const ManagerMenuItems: IManagerMenuItem[] = [
    {
        name: 'Editor',
        url: '/editor',
        key: 1,
    }
]

export default ManagerMenuItems;