import Link from 'next/link';
import { 
  Home,
  Users,
  Droplet,
  UserPlus,
  BarChart
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Donors', href: '/donors', icon: Users },
  { name: 'Blood Inventory', href: '/inventory', icon: Droplet },
  { name: 'Recipients', href: '/recipients', icon: UserPlus },
  { name: 'Reports', href: '/reports', icon: BarChart },
];

export const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold">Blood Bank</h2>
      </div>
      <nav className="space-y-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-md"
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};