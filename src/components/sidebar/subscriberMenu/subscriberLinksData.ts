interface ISidebarMenuItem {
  name: string
  to: string
  requireLogin: boolean
  requireAdmin: boolean
  key: number
}

export const SidebarLinksData: ISidebarMenuItem[] = [
  {
    key: 1,
    name: 'Profile',
    to:'/profile',
    requireLogin: true,
    requireAdmin: false,
  }
]