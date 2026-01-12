import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Lock, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface AdminLoginProps {
  onLogin: (key: string) => void;
  onBack: () => void;
}

export function AdminLogin({ onLogin, onBack }: AdminLoginProps) {
  const [adminKey, setAdminKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple admin key validation (in production, this should be more secure)
    if (adminKey === "orivex_admin_2026") {
      toast.success("Login successful!");
      onLogin(adminKey);
    } else {
      toast.error("Invalid admin key");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 flex items-center justify-center px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="relative p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-lg">
          {/* Back button */}
          <Button
            variant="ghost"
            onClick={onBack}
            className="absolute top-4 left-4 text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {/* Logo/Title */}
          <div className="text-center mb-8 mt-8">
            <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Admin Login</h2>
            <p className="text-gray-400">Enter your admin key to access the panel</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="adminKey" className="text-white">
                Admin Key
              </Label>
              <Input
                id="adminKey"
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="Enter admin key"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading || !adminKey}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6"
            >
              {isLoading ? "Logging in..." : "Login to Admin Panel"}
            </Button>
          </form>

          {/* Info */}
          <div className="mt-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <p className="text-sm text-blue-300">
              <strong>Default Admin Key:</strong> orivex_admin_2026
            </p>
            <p className="text-xs text-gray-400 mt-1">
              (Change this in production for security)
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
