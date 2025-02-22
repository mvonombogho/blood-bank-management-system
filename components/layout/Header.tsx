import Link from 'next/link';

export const Header = () => {
  return (
    <header className="bg-white shadow-md p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Blood Bank Management</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            New Donation
          </button>
          <div className="relative">
            <span className="text-gray-600">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};