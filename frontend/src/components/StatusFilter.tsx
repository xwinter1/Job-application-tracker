type Status = "all" | "applied" | "interview" | "offer" | "rejected";

const filters: { label: string; value: Status }[] = [
  { label: "All", value: "all" },
  { label: "Applied", value: "applied" },
  { label: "Interview", value: "interview" },
  { label: "Offer", value: "offer" },
  { label: "Rejected", value: "rejected" },
];

interface Props {
  active: Status;
  onChange: (status: Status) => void;
}

export default function StatusFilter({ active, onChange }: Props) {
  return (
    <div className="flex gap-2 flex-wrap mb-4">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
            active === f.value
              ? "bg-blue-600 border-blue-600 text-white"
              : "bg-transparent border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
