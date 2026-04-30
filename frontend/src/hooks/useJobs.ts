import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import toast from "react-hot-toast";

export interface Job {
  id: number;
  company: string;
  role: string;
  status: "applied" | "interview" | "offer" | "rejected";
  notes?: string;
  applied_date: string;
  owner_id: number;
}

export interface CreateJobPayload {
  company: string;
  role: string;
  status: "applied" | "interview" | "offer" | "rejected";
  notes?: string;
}

export const useGetJobs = () => {
  return useQuery<Job[]>({
    queryKey: ["jobs"],
    queryFn: async () => {
      const res = await api.get("/jobs/");
      return res.data;
    },
    enabled: typeof window !== "undefined" && !!localStorage.getItem("token"),
  });
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateJobPayload) => {
      const res = await api.post("/jobs/", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast.success("Job added successfully!");
    },
    onError: () => {
      toast.error("Failed to add job.");
    },
  });
};

export const useDeleteJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/jobs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast.success("Job removed.");
    },
    onError: () => {
      toast.error("Failed to delete job.");
    },
  });
};

export const useUpdateJobStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: number; status: Job["status"] }) => {
      const res = await api.patch(`/jobs/${id}`, { status });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast.success("Status updated!");
    },
    onError: () => {
      toast.error("Failed to update status.");
    },
  });
};
