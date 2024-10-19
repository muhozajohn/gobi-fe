import AnalysisChart from "@/components/dashboard/AnalysisChart";
import CustomerDataTable from "@/components/dashboard/CustomerDataTable";
import Navigation from "@/components/dashboard/navigation";
import StatsOverview from "@/components/dashboard/welcome";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <StatsOverview />
        {/*Analysis Chart */}
        <AnalysisChart />
        {/* Customer Data Table */}
        <CustomerDataTable />
      </main>
    </div>
  );
};

export default Dashboard;
