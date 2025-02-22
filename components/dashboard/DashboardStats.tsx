import { Users, Droplet, UserPlus, Activity } from 'lucide-react';

const stats = [
  {
    name: 'Total Donors',
    value: '2,543',
    icon: Users,
    change: '+12.3%',
    changeType: 'positive',
  },
  {
    name: 'Available Blood Units',
    value: '1,825',
    icon: Droplet,
    change: '-3.2%',
    changeType: 'negative',
  },
  {
    name: 'Recipients Served',
    value: '948',
    icon: UserPlus,
    change: '+8.1%',
    changeType: 'positive',
  },
  {
    name: 'Successful Transfusions',
    value: '1,432',
    icon: Activity,
    change: '+5.4%',
    changeType: 'positive',
  },
];

export const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{stat.name}</p>
              <p className="text-2xl font-semibold mt-1">{stat.value}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <stat.icon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <span
              className={`text-sm ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {stat.change}
            </span>
            <span className="text-sm text-gray-600"> from last month</span>
          </div>
        </div>
      ))}
    </div>
  );
};