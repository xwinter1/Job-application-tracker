import { BriefcaseBusiness } from "lucide-react";

export default function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="bg-slate-900 border border-slate-800 rounded-full p-5 mb-4">
        <BriefcaseBusiness size={32} className="text-slate-600" />
      </div>
      <h3 className="text-white font-semibold text-lg mb-1">No applications yet</h3>
      <p className="text-slate-400 text-sm mb-6">Start tracking your job search journey</p>
      <button
        onClick={onAdd}
        className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-2.5 rounded-lg transition-colors text-sm"
      >
        Add your first job
      </button>
    </div>
  );
}
