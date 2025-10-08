import { Button } from "@/components/ui/button";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
const HomePage = () => {
  return (
    <div className="bg-white dark:bg-background min-h-screen">
      <main className="px-4 md:px-8 py-20 text-center flex flex-col items-center justify-center">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Navigate Your Career Journey with Confidence
        </motion.h2>

        <motion.p
          className="text-md sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          CareerCopilot helps you track job applications, manage interview prep,
          and stay on top of your goals — all in one place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button size="lg" className="px-8 py-4 text-lg">
            Get Started for Free
          </Button>
        </motion.div>
      </main>

      {/* Feature Highlights using ShadCN Card */}
      <section className="px-4 md:px-16 py-16 bg-white dark:bg-background">
        <h3 className="text-2xl md:text-3xl font-semibold text-center mb-12 text-gray-800 dark:text-white">
          Why Choose CareerCopilot?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-md hover:shadow-lg transition dark:bg-muted">
            <CardContent className="p-6 text-center">
              <CardTitle className="text-xl font-bold text-teal-600 dark:text-teal-400 mb-2">Track Applications</CardTitle>
              <p className="text-gray-600 dark:text-gray-300">
                Manage all your job and internship applications in one place.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition dark:bg-muted">
            <CardContent className="p-6 text-center">
              <CardTitle className="text-xl font-bold text-teal-600 dark:text-teal-400 mb-2">Plan Interview Prep</CardTitle>
              <p className="text-gray-600 dark:text-gray-300">
                Organize DSA topics, project ideas, and notes efficiently.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition dark:bg-muted">
            <CardContent className="p-6 text-center">
              <CardTitle className="text-xl font-bold text-teal-600 dark:text-teal-400 mb-2">Stay Motivated</CardTitle>
              <p className="text-gray-600 dark:text-gray-300">
                Track your progress, set goals, and stay on top of deadlines.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition dark:bg-muted">
            <CardContent className="p-6 text-center">
              <CardTitle className="text-xl font-bold text-teal-600 dark:text-teal-400 mb-2">Set Daily Goals</CardTitle>
              <p className="text-gray-600 dark:text-gray-300">
                Define daily learning and coding tasks to stay focused and productive.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition dark:bg-muted">
            <CardContent className="p-6 text-center">
              <CardTitle className="text-xl font-bold text-teal-600 dark:text-teal-400 mb-2">Track Your Progress</CardTitle>
              <p className="text-gray-600 dark:text-gray-300">
                Visualize your achievements and milestones with progress tracking.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition dark:bg-muted">
            <CardContent className="p-6 text-center">
              <CardTitle className="text-xl font-bold text-teal-600 dark:text-teal-400 mb-2">Ask AI for Suggestions</CardTitle>
              <p className="text-gray-600 dark:text-gray-300">
                Get personalized insights on topics, resources, and job prep using AI.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-teal-600 text-white py-16 px-6 text-center">
        <h4 className="text-2xl md:text-3xl font-bold mb-4">Ready to take control of your career?</h4>
        <p className="mb-6 text-lg">Join thousands of students using CareerCopilot to land their dream jobs.</p>
        <Button size="lg" variant="secondary" className="bg-white text-teal-600 hover:bg-gray-100">
          Sign Up Now
        </Button>
      </section>

      {/* Footer */}
      <footer className="text-white py-8 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} CareerCopilot. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;