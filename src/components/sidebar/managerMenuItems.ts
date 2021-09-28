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
    name: 'Create new post',
    to: 'manage/create',
    requireAdmin: true,
    key: 2,
  }
];

export default ManagerMenuItems;
