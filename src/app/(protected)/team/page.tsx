"use client";

import { motion } from "framer-motion";
import {
  Users,
  UserPlus,
  Mail,
  ShieldCheck,
  MoreVertical,
} from "lucide-react";

const teamMembers = [
  {
    name: "Akshat Goyal",
    email: "akshat@bizflow.com",
    role: "Admin",
  },
  {
    name: "Divyanshi",
    email: "divyanshi@bizflow.com",
    role: "Editor",
  },
  {
    name: "Neha Verma",
    email: "neha@bizflow.com",
    role: "Viewer",
  },
];

export default function TeamPage() {
  return (
    <div className="p-6 sm:p-8 bg-white min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <Users className="w-6 h-6" />
            Team
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your organization team members here.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 rounded-xl bg-black text-white px-4 py-2 text-sm font-medium"
        >
          <UserPlus className="w-4 h-4" />
          Invite Member
        </motion.button>
      </motion.div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.email}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-gray-200 p-5 shadow-sm"
          >
            {/* Card Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center font-semibold text-gray-700">
                  {member.name.charAt(0)}
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {member.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Mail className="w-3 h-3" />
                    {member.email}
                  </div>
                </div>
              </div>

              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            {/* Role */}
            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-gray-700">
              <ShieldCheck className="w-4 h-4" />
              {member.role}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
