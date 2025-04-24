'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { 
  FiHome, 
  FiAlertCircle, 
  FiUsers, 
  FiFileText, 
  FiSettings,
  FiBarChart2,
  FiMenu,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiPieChart,
  FiAlertTriangle,
  FiChevronDown,
  FiChevronUp,
  FiUser,
  FiUserCheck,
  FiCalendar,
  FiAlertOctagon,
  FiShieldOff
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { PermissionGate } from '@/components/PermissionGate';
import { Permission } from '@/hooks/usePermissions';

interface MenuItem {
  title: string;
  href: string;
  icon: IconType;
  permissions?: Permission[];
  subItems?: Array<{
    title: string;
    href: string;
    icon?: IconType;
    permissions?: Permission[];
  }>;
}

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: FiHome
  },
  {
    title: 'Incidents',
    href: '/dashboard/incidents',
    icon: FiAlertTriangle,
    permissions: ['view:incidents']
  },
  {
    title: 'Emergencies',
    href: '/dashboard/emergencies',
    icon: FiAlertCircle,
    permissions: ['manage:emergencies']
  },
  {
    title: 'Emergency Control',
    href: '/dashboard/emergency-control',
    icon: FiShieldOff,
    permissions: ['manage:emergencies'],
    subItems: [
      {
        title: 'Active Emergencies',
        href: '/dashboard/emergency-control/active',
        icon: FiAlertCircle,
        permissions: ['manage:emergencies']
      },
      {
        title: 'Emergency History',
        href: '/dashboard/emergency-control/history',
        icon: FiCalendar,
        permissions: ['manage:emergencies']
      },
      {
        title: 'Emergency Settings',
        href: '/dashboard/emergency-control/settings',
        icon: FiSettings,
        permissions: ['manage:emergencies']
      }
    ]
  },
  {
    title: 'Users',
    href: '/dashboard/users',
    icon: FiUsers,
    permissions: ['manage:users'],
    subItems: [
      {
        title: 'All Users',
        href: '/dashboard/users',
        icon: FiUsers,
        permissions: ['manage:users']
      },
      {
        title: 'Residents',
        href: '/dashboard/users?type=resident',
        icon: FiUser,
        permissions: ['manage:users']
      },
      {
        title: 'Responders',
        href: '/dashboard/users?type=responder',
        icon: FiUserCheck,
        permissions: ['manage:users']
      }
    ]
  },
  {
    title: 'Reports',
    href: '/dashboard/reports',
    icon: FiFileText,
    permissions: ['manage:reports'],
    subItems: [
      {
        title: 'View Reports',
        href: '/dashboard/reports',
        permissions: ['manage:reports']
      },
      {
        title: 'Analytics',
        href: '/dashboard/reports/analytics',
        permissions: ['manage:reports']
      },
      {
        title: 'Generate Reports',
        href: '/dashboard/reports/generate',
        permissions: ['manage:reports']
      },
      {
        title: 'Manage Reports',
        href: '/dashboard/reports/manage',
        permissions: ['manage:reports']
      }
    ]
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: FiSettings,
    permissions: ['manage:settings']
  }
];

interface SidebarProps {
  isOpen: boolean;
  onMobileToggle: () => void;
  isDesktopCollapsed: boolean;
  onDesktopToggle: () => void;
}

export function Sidebar({ isOpen, onMobileToggle, isDesktopCollapsed, onDesktopToggle }: SidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['users']); // Default to users menu being expanded

  const isActive = (path: string) => {
    // Extract the base path and query parameters from the current URL
    const currentPath = pathname;
    const currentType = searchParams.get('type');

    // Extract the base path and query parameters from the menu item's href
    const [menuPath, menuQuery] = path.split('?');
    const menuType = menuQuery?.split('=')[1];

    // If there's no query parameter in the menu item's href
    if (!menuQuery) {
      // For the "All Users" link, it should be active only when there's no type parameter
      if (menuPath === '/users') {
        return currentPath === '/users' && !currentType;
      }
      return currentPath === menuPath;
    }

    // For links with query parameters (Residents/Responders)
    return currentPath === menuPath && currentType === menuType;
  };

  const isMenuExpanded = (menu: string) => expandedMenus.includes(menu);

  const toggleMenu = (menu: string) => {
    setExpandedMenus(prev =>
      prev.includes(menu)
        ? prev.filter(item => item !== menu)
        : [...prev, menu]
    );
  };

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={onMobileToggle}
        />
      )}

      {/* Mobile menu button */}
      <button
        onClick={onMobileToggle}
        className={`fixed top-4 left-4 z-50 rounded-md bg-[#1a1f37] p-2 text-gray-400 lg:hidden hover:text-white focus:outline-none ${isOpen ? 'hidden' : ''}`}
      >
        {isOpen ? <FiX className="h-6 w-6 hidden" /> : <FiMenu className="h-6 w-6" />}
      </button>

      {/* Desktop collapse button */}
      <button
        onClick={onDesktopToggle}
        className={`hidden lg:flex z-50 fixed h-8 w-8 items-center justify-center bg-blue-200 rounded-full text-[#1a1f37] shadow-lg transition-all duration-300 hover:bg-gray-100 focus:outline-none ${
          isDesktopCollapsed ? 'left-[3.2rem]' : 'left-[14.2rem]'
        }`}
        style={{ top: '1.5rem' }}
      >
        {isDesktopCollapsed ? (
          <FiChevronRight className="h-5 w-5" />
        ) : (
          <FiChevronLeft className="h-5 w-5" />
        )}
      </button>

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full w-[240px] transform bg-[#1a1f37] transition-transform duration-300 ease-in-out lg:sticky z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${
          isDesktopCollapsed ? 'lg:w-16' : ''
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-800 lg:justify-center lg:px-2">
            <h1 className={`text-xl font-bold text-white truncate ${isDesktopCollapsed ? 'lg:hidden' : ''}`}>
              Emergency Admin
            </h1>
            <button 
              onClick={onMobileToggle}
              className="text-gray-400 lg:hidden hover:text-white focus:outline-none"
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-4 lg:px-2">
            {menuItems.map((item) => {
              const hasActiveSubItem = item.subItems?.some(subItem => isActive(subItem.href));
              const isCurrentActive = isActive(item.href) || hasActiveSubItem;

              return (
                <PermissionGate key={item.href} permissions={item.permissions}>
                  <div>
                    {item.subItems ? (
                      // Menu item with sub-items (accordion)
                      <div>
                        <button
                          onClick={() => !isDesktopCollapsed && toggleMenu(item.title)}
                          className={`w-full flex items-center justify-between gap-3 mb-1 px-3 py-2.5 rounded-lg transition-colors ${
                            isCurrentActive
                              ? 'bg-blue-600 text-white'
                              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                          } ${
                            isDesktopCollapsed ? 'lg:justify-center lg:px-2' : ''
                          }`}
                          title={isDesktopCollapsed ? item.title : undefined}
                        >
                          <div className="flex items-center gap-3">
                            <item.icon className="h-5 w-5 flex-shrink-0" />
                            <span className={`text-sm font-medium truncate ${isDesktopCollapsed ? 'lg:hidden' : ''}`}>
                              {item.title}
                            </span>
                          </div>
                          {!isDesktopCollapsed && (
                            isMenuExpanded(item.title) ? (
                              <FiChevronUp className="h-4 w-4" />
                            ) : (
                              <FiChevronDown className="h-4 w-4" />
                            )
                          )}
                        </button>

                        {/* Sub-items with animation */}
                        <div 
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            isDesktopCollapsed ? 'lg:hidden' : ''
                          }`}
                          style={{ 
                            maxHeight: isMenuExpanded(item.title) ? `${item.subItems.length * 40}px` : '0',
                            opacity: isMenuExpanded(item.title) ? 1 : 0
                          }}
                        >
                          <div className="ml-8 mt-1 space-y-1">
                            {item.subItems.map((subItem) => (
                              <PermissionGate key={subItem.href} permissions={subItem.permissions}>
                                <Link
                                  href={subItem.href}
                                  onClick={() => {
                                    if (window.innerWidth < 1024) {
                                      onMobileToggle();
                                    }
                                  }}
                                  className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                                    isActive(subItem.href)
                                      ? 'bg-blue-600 text-white'
                                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    {subItem.icon && <subItem.icon className="h-4 w-4 flex-shrink-0" />}
                                    {subItem.title}
                                  </div>
                                </Link>
                              </PermissionGate>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Regular menu item
                      <Link
                        href={item.href}
                        onClick={() => {
                          if (window.innerWidth < 1024) {
                            onMobileToggle();
                          }
                        }}
                        className={`flex items-center gap-3 mb-1 px-3 py-2.5 rounded-lg transition-colors ${
                          isActive(item.href)
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        } ${
                          isDesktopCollapsed ? 'lg:justify-center lg:px-2' : ''
                        }`}
                        title={isDesktopCollapsed ? item.title : undefined}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        <span className={`text-sm font-medium truncate ${isDesktopCollapsed ? 'lg:hidden' : ''}`}>
                          {item.title}
                        </span>
                      </Link>
                    )}
                  </div>
                </PermissionGate>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
} 