import { useState, useEffect, type ChangeEvent } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import {
  LogOut,
  Download,
  Trash2,
  BarChart3,
  Search,
  RefreshCw,
} from "lucide-react";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  technology: string;
  deadline: string;
  budgetRange: string;
  additionalRequirements: string;
  timestamp: string;
  status: string;
}

interface Stats {
  total: number;
  new: number;
  inProgress: number;
  completed: number;
  byProjectType: Record<string, number>;
}

interface AdminPanelProps {
  onLogout: () => void;
  adminKey: string;
}

export function AdminPanel({ onLogout, adminKey }: AdminPanelProps) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-0134e8c8/inquiries?adminKey=${encodeURIComponent(adminKey)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch inquiries");
      }

      setInquiries(data.inquiries);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to load inquiries",
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-0134e8c8/stats?adminKey=${encodeURIComponent(adminKey)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch stats");
      }

      setStats(data.stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      toast.error(error instanceof Error ? error.message : "Failed to load stats");
    }
  };

  useEffect(() => {
    fetchInquiries();
    fetchStats();
  }, []);

  const updateStatus = async (inquiryId: string, status: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-0134e8c8/update-inquiry-status?adminKey=${encodeURIComponent(adminKey)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inquiryId, status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update status");
      }

      toast.success("Status updated successfully");
      fetchInquiries();
      fetchStats();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const deleteInquiry = async (inquiryId: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-0134e8c8/inquiry/${inquiryId}?adminKey=${encodeURIComponent(adminKey)}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete inquiry");
      }

      toast.success("Inquiry deleted successfully");
      fetchInquiries();
      fetchStats();
    } catch (error) {
      console.error("Error deleting inquiry:", error);
      toast.error("Failed to delete inquiry");
    }
  };

  const exportToCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Project Type",
      "Technology",
      "Deadline",
      "Budget Range",
      "Additional Requirements",
      "Status",
      "Timestamp",
    ];

    const rows: string[][] = filteredInquiries.map((inquiry: Inquiry) => [
      inquiry.name,
      inquiry.email,
      inquiry.phone,
      inquiry.projectType,
      inquiry.technology || "N/A",
      inquiry.deadline || "N/A",
      inquiry.budgetRange || "N/A",
      inquiry.additionalRequirements || "N/A",
      inquiry.status,
      new Date(inquiry.timestamp).toLocaleString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row: string[]) =>
        row
          .map((cell: string) => `"${cell.toString().replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `orivex_inquiries_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    toast.success("Data exported successfully");
  };

  const filteredInquiries = inquiries.filter((inquiry: Inquiry) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      inquiry.name.toLowerCase().includes(searchLower) ||
      inquiry.email.toLowerCase().includes(searchLower) ||
      inquiry.phone.includes(searchTerm) ||
      inquiry.projectType.toLowerCase().includes(searchLower)
    );
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-500/20 text-blue-300 border-blue-500/50";
      case "in-progress":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/50";
      case "completed":
        return "bg-green-500/20 text-green-300 border-green-500/50";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/50";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ORIVEX
              </span>{" "}
              Admin Panel
            </h1>
            <p className="text-gray-400">Manage project inquiries and leads</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                fetchInquiries();
                fetchStats();
              }}
              className="border-white/20 hover:bg-white/10 text-white"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button
              variant="outline"
              onClick={exportToCSV}
              className="border-white/20 hover:bg-white/10 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button
              variant="outline"
              onClick={onLogout}
              className="border-red-500/50 hover:bg-red-500/10 text-red-400"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Total Inquiries</span>
                <BarChart3 className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-white">{stats.total}</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">New</span>
                <div className="w-3 h-3 rounded-full bg-blue-500" />
              </div>
              <div className="text-3xl font-bold text-white">{stats.new}</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">In Progress</span>
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
              </div>
              <div className="text-3xl font-bold text-white">{stats.inProgress}</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Completed</span>
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-3xl font-bold text-white">{stats.completed}</div>
            </motion.div>
          </div>
        )}

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name, email, phone, or project type..."
              value={searchTerm}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Inquiries Table */}
        <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-lg overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-400">Loading inquiries...</div>
          ) : filteredInquiries.length === 0 ? (
            <div className="p-12 text-center text-gray-400">No inquiries found</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-white/5">
                    <TableHead className="text-gray-300">Name</TableHead>
                    <TableHead className="text-gray-300">Contact</TableHead>
                    <TableHead className="text-gray-300">Project Type</TableHead>
                    <TableHead className="text-gray-300">Technology</TableHead>
                    <TableHead className="text-gray-300">Budget</TableHead>
                    <TableHead className="text-gray-300">Deadline</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300">Date</TableHead>
                    <TableHead className="text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInquiries.map((inquiry) => (
                    <TableRow
                      key={inquiry.id}
                      className="border-white/10 hover:bg-white/5"
                    >
                      <TableCell className="text-white font-medium">
                        {inquiry.name}
                      </TableCell>
                      <TableCell className="text-gray-400">
                        <div className="text-sm">{inquiry.email}</div>
                        <div className="text-sm">{inquiry.phone}</div>
                      </TableCell>
                      <TableCell className="text-gray-400">
                        {inquiry.projectType}
                      </TableCell>
                      <TableCell className="text-gray-400">
                        {inquiry.technology || "N/A"}
                      </TableCell>
                      <TableCell className="text-gray-400">
                        {inquiry.budgetRange || "N/A"}
                      </TableCell>
                      <TableCell className="text-gray-400">
                        {inquiry.deadline
                          ? new Date(inquiry.deadline).toLocaleDateString()
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={inquiry.status}
                          onValueChange={(value: string) =>
                            updateStatus(inquiry.id, value)
                          }
                        >
                          <SelectTrigger
                            className={`w-32 border ${getStatusColor(
                              inquiry.status
                            )}`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-white/10">
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="in-progress">
                              In Progress
                            </SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-gray-400 text-sm">
                        {new Date(inquiry.timestamp).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteInquiry(inquiry.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
