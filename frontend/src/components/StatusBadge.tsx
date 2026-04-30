type Status = "applied" | "interview" | "offer" | "rejected";

const styles: Record<Status, string> = {
  applied: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  interview: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  offer: "bg-green-500/10 text-green-400 border-green-500/30",
  rejected: "bg-red-500/10 text-red-400 border-red-500/30",
};

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border capitalize ${styles[status]}`}>
      {status}
    </span>
  );
}
