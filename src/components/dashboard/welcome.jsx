import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const StatsOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-500">
            Total Visitors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">124,892</div>
          <p className="text-green-600 text-sm">+12.3% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-500">
            Bounce Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">45.2%</div>
          <p className="text-red-600 text-sm">+2.1% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-500">
            Avg. Session Duration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2m 45s</div>
          <p className="text-green-600 text-sm">+0.3% from last month</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsOverview;
