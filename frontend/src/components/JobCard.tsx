import { Trash2 } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { Job } from "@/hooks/useJobs";

interface Props {
  job: Job;
  onDelete: (id: number) => void;
}

export default function JobCard({ job, onDelete }: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl px-5 py-4 flex items-center justify-between hover:border-slate-700 transition-colors">
      <div className="flex flex-col gap-1">
        <span className="text-white font-semibold">{job.company}</span>
        <span className="text-slate-400 text-sm">{job.role}</span>
        {job.notes && <span className="text-slate-500 text-xs mt-1">{job.notes}</span>}
      </div>
      <div className="flex items-center gap-4">
        <StatusBadge status={job.status} />
        <span className="text-slate-600 text-xs hidden sm:block">
          {new Date(job.applied_date).toLocaleDateString()}
        </span>
        <button
          onClick={() => onDelete(job.id)}
          className="text-slate-600 hover:text-red-400 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
