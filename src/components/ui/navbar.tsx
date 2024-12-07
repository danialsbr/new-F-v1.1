import { Home, Upload, Package, Download, Truck } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', to: '/', icon: Home },
  { name: 'Upload', to: '/upload', icon: Upload },
  { name: 'Orders', to: '/orders', icon: Package },
  { name: 'Transfer', to: '/transfer', icon: Truck },
  { name: 'Download', to: '/download', icon: Download },
];

export function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'inline-flex items-center px-1 pt-1 text-sm font-medium',
                    isActive
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  )
                }
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}