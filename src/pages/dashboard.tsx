import { Package, ArrowUpCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Dashboard() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-700">
          Welcome to your order management system
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Total Orders"
          value="156"
          icon={Package}
          trend="+12% from last month"
        />
        <DashboardCard
          title="Pending Orders"
          value="23"
          icon={ArrowUpCircle}
          trend="-5% from last month"
          trendDown
        />
        <DashboardCard
          title="Fulfilled Orders"
          value="133"
          icon={CheckCircle2}
          trend="+18% from last month"
        />
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  icon: Icon,
  trend,
  trendDown,
}: {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  trend: string;
  trendDown?: boolean;
}) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Icon className="h-6 w-6 text-gray-400" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  {value}
                </div>
                <div
                  className={cn(
                    'ml-2 flex items-baseline text-sm font-semibold',
                    trendDown ? 'text-red-600' : 'text-green-600'
                  )}
                >
                  {trend}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}