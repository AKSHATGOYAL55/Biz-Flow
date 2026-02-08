"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRole } from "@/hooks/use-role";
import { getProjects } from "@/services/project.service";

type Project = {
  id: string;
  name: string;
  description: string | null;
  status: string;
};

export default function ProjectsPage() {
  const {isAdmin } = useRole(); // 'admin' | 'team' | 'client'
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects();
        setProjects(data ?? []);
      } catch (error) {
        console.error("Failed to load projects", error);
      } finally {
        setLoading(false);
      } 
    }

    loadProjects();
  }, []);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Projects</h1>
        {isAdmin  && (
          <Button onClick={() => setOpen(true)}>
            Create Project
          </Button>
        )}
      </div>

      {/* Loading */}
      {loading && <p className="text-sm text-muted-foreground">Loading projects...</p>}

      {/* Empty state */}
      {!loading && projects.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No projects found
        </p>
      )}

      {/* Project list */}
      <div className="grid gap-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-md border p-4"
          >
            <h3 className="font-medium">{project.name}</h3>
            {project.description && (
              <p className="text-sm text-muted-foreground">
                {project.description}
              </p>
            )}
            <span className="text-xs text-muted-foreground">
              Status: {project.status}
            </span>
          </div>
        ))}
      </div>

      {/* Create Project Modal (later) */}
      {open && (
        <div>
          {/* yahan baad me Create Project form aayega */}
        </div>
      )}
    </div>
  );
}
