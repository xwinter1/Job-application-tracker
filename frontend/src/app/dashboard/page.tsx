"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import { useGetJobs, useDeleteJob } from "@/hooks/useJobs";
import Navbar from "@/components/Navbar";
import JobCard from "@/components/JobCard";
import AddJobModal from "@/components/AddJobModal";
import { Plus } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const { data: jobs, isLoading } = useGetJobs();
  const { mutate: deleteJob } = useDeleteJob();

  useEffect(() => {
    if (!isLoggedIn()) router.push("/login");
  }, [router]);

  const stats = {
    total: jobs?.length ?? 0,
    interviews: jobs?.filter((j) => j.status === "interview").length ?? 0,
    offers: jobs?.filter((j) => j.status === "offer").length ?? 0,
    rejected: jobs?.filter((j) => j.status === "rejected").length ?? 0,
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Applied", value: stats.total, color: "text-blue-400" },
            { label: "Interviews", value: stats.interviews, color: "text-yellow-400" },
            { label: "Offers", value: stats.offers, color: "text-green-400" },
            { label: "Rejected", value: stats.rejected, color: "text-red-400" },
          ].map((stat) => (
            <div key={stat.label} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold text-xl">Applications</h2>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm"
          >
            <Plus size={16} />
            Add Job
          </button>
        </div>

        {/* Job List */}
        {isLoading ? (
          <div className="text-slate-400 text-center py-16">Loading...</div>
        ) : jobs?.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-400 mb-4">No applications yet.</p>
            <button
              onClick={() => setShowModal(true)}
              className="text-blue-400 hover:text-blue-300 text-sm underline"
            >
              Add your first job
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {jobs?.map((job) => (
              <JobCard key={job.id} job={job} onDelete={deleteJob} />
            ))}
          </div>
        )}
      </main>

      {showModal && <AddJobModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
