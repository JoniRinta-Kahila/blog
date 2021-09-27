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
  },
  {
    name: 'All Posts',
    to: '',
    key: 2,
  }, 
  {
    name: 'Account',
    to: '',
    key: 3,
  },
];

export default ManagerMenuItems;
