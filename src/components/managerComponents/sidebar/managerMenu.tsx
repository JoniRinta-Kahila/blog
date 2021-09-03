import React from "react";
import ManagerMenuItems from './managerMenuItems';
import styles from './managerMenu.module.scss';

interface ManagerMenuProps {

};

const ManagerMenu : React.FC<ManagerMenuProps> = () => {

    return (
        <div>
            {
                ManagerMenuItems.map(item => {
                    return (
                        <b className={styles.menuItem} key={item.key}>{item.name}</b>
                    )
                })
            }

        </div>
    );
};

export default ManagerMenu;