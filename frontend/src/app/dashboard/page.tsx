"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import { useGetJobs, useDeleteJob, Job } from "@/hooks/useJobs";
import Navbar from "@/components/Navbar";
import JobCard from "@/components/JobCard";
import AddJobModal from "@/components/AddJobModal";
import SkeletonCard from "@/components/SkeletonCard";
import EmptyState from "@/components/EmptyState";
import StatusFilter from "@/components/StatusFilter";
import { Plus, Search } from "lucide-react";

type FilterStatus = "all" | Job["status"];

export default function DashboardPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [search, setSearch] = useState("");
  const { data: jobs, isLoading } = useGetJobs();
  const { mutate: deleteJob } = useDeleteJob();

  const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

useEffect(() => {
  if (!mounted) return;
  if (!isLoggedIn()) router.push("/login");
}, [mounted, router]);

  const filtered = jobs?.filter((job) => {
    const matchesStatus = filter === "all" || job.status === filter;
    const matchesSearch =
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.role.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

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

        {/* Search */}
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by company or role..."
            className="w-full bg-slate-900 border border-slate-800 text-white rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Filter */}
        <StatusFilter active={filter} onChange={(s) => setFilter(s)} />

        {/* Job List */}
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered?.length === 0 ? (
          <EmptyState onAdd={() => setShowModal(true)} />
        ) : (
          <div className="space-y-3">
            {filtered?.map((job) => (
              <JobCard key={job.id} job={job} onDelete={deleteJob} />
            ))}
          </div>
        )}
      </main>

      {showModal && <AddJobModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
