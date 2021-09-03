import React from "react";
import ManagerMenuItems from './managerMenuItems';
// import styles from './managerMenu.module.scss';
import { Link } from 'react-router-dom';

interface ManagerMenuProps {

};

const ManagerMenu : React.FC<ManagerMenuProps> = () => {

    return (
        <div>
            {
                ManagerMenuItems.map(item => {
                    return (
                        <Link key={item.key} to={item.to} >{item.name}</Link>
                        // <b className={styles.menuItem} key={item.key}>{item.name}</b>
                    )
                })
            }

        </div>
    );
};

export default ManagerMenu;