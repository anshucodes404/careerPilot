import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const DashboardPage = () => {
  return (
    <>
      <Card className="md:col-span-2 shadow-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <CardHeader>
          <CardTitle className="text-black dark:text-white">
            Progress Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* Resume Status */}
            <div className="p-4 rounded-lg bg-neutral-100 dark:bg-neutral-800">
              <h3 className="text-lg font-medium text-black dark:text-white">
                Resume
              </h3>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                1
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Uploaded
              </p>
            </div>

            {/* Goals Progress */}
            <div className="p-4 rounded-lg bg-neutral-100 dark:bg-neutral-800">
              <h3 className="text-lg font-medium text-black dark:text-white">
                Goals
              </h3>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                5
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                In Progress
              </p>
            </div>

            {/* AI Interactions */}
            <div className="p-4 rounded-lg bg-neutral-100 dark:bg-neutral-800">
              <h3 className="text-lg font-medium text-black dark:text-white">
                AI Chats
              </h3>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                12
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Conversations
              </p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <h3 className="text-lg font-medium text-black dark:text-white mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg border border-neutral-200 dark:border-neutral-800"
                >
                  <div>
                    <p className="text-black dark:text-white font-medium">
                      Updated Resume
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      2 days ago
                    </p>
                  </div>
                  <Badge variant="outline">Resume</Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default DashboardPage;
