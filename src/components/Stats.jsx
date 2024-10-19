import { Card, CardContent } from "@/components/ui/card";
const Stats = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 animate-fade-in">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">10K+</div>
              <div className="text-gray-600">Active Users</div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">50M+</div>
              <div className="text-gray-600">Data Points</div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">24/7</div>
              <div className="text-gray-600">Support</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Stats;
