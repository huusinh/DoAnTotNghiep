import type { NavItemConfig } from '@main/types/nav.types';

export const navItems = [
  { key: 'overview', title: 'Overview', href: '/', icon: 'chart-pie' },
  { key: 'customers', title: 'Customers', href: '/', icon: 'users' },
  { key: 'integrations', title: 'Integrations', href: '/', icon: 'plugs-connected' },
  { key: 'settings', title: 'Settings', href: '/', icon: 'gear-six' },
  { key: 'account', title: 'Account', href: '/', icon: 'user' },
  { key: 'error', title: 'Error', href: '/', icon: 'x-square' },
] satisfies NavItemConfig[];
