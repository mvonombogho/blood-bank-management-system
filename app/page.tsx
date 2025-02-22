import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { RecentDonations } from '@/components/dashboard/RecentDonations';
import { BloodInventoryOverview } from '@/components/dashboard/BloodInventoryOverview';

export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome to the Blood Bank Management System</p>
      </div>
      
      <DashboardStats />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentDonations />
        <BloodInventoryOverview />
      </div>
    </div>
  );
}