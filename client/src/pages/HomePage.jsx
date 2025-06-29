import { Button } from "@/components/ui/button";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
      <main className="px-4 md:px-8 py-20 text-center flex flex-col items-center justify-center">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 text-gray-800"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Navigate Your Career Journey with Confidence
        </motion.h2>

        <motion.p
          className="text-md sm:text-lg md:text-xl text-gray-600 max-w-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          CareerPilot helps you track job applications, manage interview prep,
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

      {/* Feature Highlights */}
      <section className="px-4 md:px-16 py-16 bg-white">
        <h3 className="text-2xl md:text-3xl font-semibold text-center mb-12 text-gray-800">
          Why Choose CareerPilot?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-slate-50 rounded-2xl shadow hover:shadow-md transition">
            <h4 className="text-xl font-bold text-teal-600 mb-2">Track Applications</h4>
            <p className="text-gray-600">Manage all your job and internship applications in one place.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl shadow hover:shadow-md transition">
            <h4 className="text-xl font-bold text-teal-600 mb-2">Plan Interview Prep</h4>
            <p className="text-gray-600">Organize DSA topics, project ideas, and notes efficiently.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl shadow hover:shadow-md transition">
            <h4 className="text-xl font-bold text-teal-600 mb-2">Stay Motivated</h4>
            <p className="text-gray-600">Track your progress, set goals, and stay on top of deadlines.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-teal-600 text-white py-16 px-6 text-center">
        <h4 className="text-2xl md:text-3xl font-bold mb-4">Ready to take control of your career?</h4>
        <p className="mb-6 text-lg">Join thousands of students using CareerPilot to land their dream jobs.</p>
        <Button size="lg" variant="secondary" className="bg-white text-teal-600 hover:bg-gray-100">
          Sign Up Now
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} CareerPilot. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;