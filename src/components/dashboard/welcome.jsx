"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StatsOverview = () => {
  const [metric, setMetric] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch("/api/metrics");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        if (!data) {
          setError("No data found.");
        } else {
          setMetric(data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  // Loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  // Error state
  if (error) {
    return <p>{error}</p>;
  }

  // No data state
  if (!metric) {
    return <p>No data found.</p>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-500">
            Total Visitors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {metric.total_visitors.toLocaleString()}
          </div>
          <p className="text-green-600 text-sm">
            + {metric.monthly_growth}% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-500">
            Bounce Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metric.bounce_rate}%</div>
          <p className="text-red-600 text-sm">
            +{metric.bounce_rate.toFixed(1)}% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-500">
            Avg. Session Duration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {Math.floor(metric.avg_session_duration / 60)}m{" "}
            {metric.avg_session_duration % 60}s
          </div>
          <p className="text-green-600 text-sm">
            +{Math.floor(metric.avg_session_duration / 100)}% from last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsOverview;
