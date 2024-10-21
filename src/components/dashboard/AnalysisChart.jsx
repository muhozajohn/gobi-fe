"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Loader2 } from "lucide-react";

const AnalysisChart = () => {
  const [visitData, setVisitData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVisitData = async () => {
      try {
        const response = await fetch("/api/visits");
        if (!response.ok) throw new Error("Failed to fetch visits data");
        const data = await response.json();

        // Sort data by date
        const sortedData = [...data].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        setVisitData(sortedData);
      } catch (err) {
        console.error("Error fetching visit data:", err);
        setError("Failed to load visit data");
      } finally {
        setLoading(false);
      }
    };

    fetchVisitData();
  }, []);

  if (loading) {
    return (
      <Card className="mb-8">
        <CardContent className="h-80 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mb-8">
        <CardContent className="h-80 flex items-center justify-center text-red-500">
          {error}
        </CardContent>
      </Card>
    );
  }

  const formatNumber = (value) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value;
  };

  const formatDuration = (minutes) => {
    if (minutes >= 60) {
      return `${(minutes / 60).toFixed(1)}h`;
    }
    return `${minutes}m`;
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Website Analytics Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={visitData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
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
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 12 }}
                tickFormatter={formatNumber}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 12 }}
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-4 border rounded-lg shadow-lg">
                        <p className="font-medium">
                          {new Date(label).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                        {payload.map((entry, index) => (
                          <p
                            key={`tooltip-${index}`}
                            className="text-sm"
                            style={{ color: entry.stroke || entry.color }}
                          >
                            <span className="font-medium">{entry.name}: </span>
                            {entry.name === "Bounce Rate"
                              ? `${entry.value.toFixed(1)}%`
                              : entry.name === "Avg Session"
                              ? formatDuration(entry.value)
                              : formatNumber(entry.value)}
                          </p>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="visitors"
                name="Visitors"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="page_views"
                name="Page Views"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="bounce_rate"
                name="Bounce Rate"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisChart;
