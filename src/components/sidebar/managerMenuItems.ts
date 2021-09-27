interface IManagerMenuItem {
    name: string
    to: string
    requireAdmin: boolean
    key: number
}

const ManagerMenuItems: IManagerMenuItem[] = [
  {
    name: 'Dashboard',
    to: '/manage',
    requireAdmin: true,
    key: 1,
  },
  {
    name: 'Editor',
    to: '/manage/editor',
    requireAdmin: true,
    key: 2,
  },
  {
    name: 'Sign out',
    to: '',
    requireAdmin: false,
    key: 3,
  }
];

export default ManagerMenuItems;
