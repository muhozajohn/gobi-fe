"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AnalysisChart = () => {
  // Mock data for visualization
  const visitData = [
    { date: "2024-03-15", visitors: 1200, pageViews: 3500, bounceRate: 45 },
    { date: "2024-03-16", visitors: 1300, pageViews: 3800, bounceRate: 42 },
    { date: "2024-03-17", visitors: 1100, pageViews: 3200, bounceRate: 48 },
    { date: "2024-03-18", visitors: 1400, pageViews: 4000, bounceRate: 40 },
    { date: "2024-03-19", visitors: 1250, pageViews: 3600, bounceRate: 44 },
    { date: "2024-03-20", visitors: 1500, pageViews: 4200, bounceRate: 38 },
    { date: "2024-03-21", visitors: 1350, pageViews: 3900, bounceRate: 41 },
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Website Visits Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={visitData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="visitors"
                stroke="#3b82f6"
                name="Visitors"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="pageViews"
                stroke="#10b981"
                name="Page Views"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisChart;
