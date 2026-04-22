"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { useAuth } from "@/components/auth/AuthProvider";
import { createProject, updateProject } from "@/lib/api/projects";
import { buildProjectSlug } from "@/lib/slug";
import { requestRevalidate } from "@/lib/revalidate";
import type {
  Project,
  ProjectCreateInput,
  ProjectUpdateInput,
} from "@/types/project";

type FormState = {
  title: string;
  subtitle: string;
  type: string;
  description: string;
  images: string[];
  features: string[];
  techStack: string[];
  tags: string[];
  linkGithub: string;
  linkFrontend: string;
  linkBackend: string;
  linkLive: string;
  credEmail: string;
  credPassword: string;
  credNote: string;
  borderColor: string;
  gradient: string;
  displayOrder: string;
  isVisible: boolean;
};

const DEFAULT_TYPES = [
  "Full Stack",
  "Next.js",
  "React.js",
  "JavaScript",
  "AI/ML",
];

function initialState(project?: Project): FormState {
  return {
    title: project?.title ?? "",
    subtitle: project?.subtitle ?? "",
    type: project?.type ?? "Full Stack",
    description: project?.description ?? "",
    images: project?.images ?? [],
    features: project?.features ?? [],
    techStack: project?.techStack ?? [],
    tags: project?.tags ?? [],
    linkGithub: project?.links.github ?? "",
    linkFrontend: project?.links.frontend ?? "",
    linkBackend: project?.links.backend ?? "",
    linkLive: project?.links.live ?? "",
    credEmail: project?.credentials?.email ?? "",
    credPassword: project?.credentials?.password ?? "",
    credNote: project?.credentials?.note ?? "",
    borderColor: project?.borderColor ?? "#6366F1",
    gradient: project?.gradient ?? "",
    displayOrder:
      project?.displayOrder != null ? String(project.displayOrder) : "",
    isVisible: project?.isVisible ?? true,
  };
}

function buildInput(state: FormState): ProjectCreateInput & ProjectUpdateInput {
  const credentials =
    state.credEmail || state.credPassword || state.credNote
      ? {
          email: state.credEmail || undefined,
          password: state.credPassword || undefined,
          note: state.credNote || undefined,
        }
      : null;

  const links: Record<string, string> = {};
  if (state.linkGithub.trim()) links.github = state.linkGithub.trim();
  if (state.linkFrontend.trim()) links.frontend = state.linkFrontend.trim();
  if (state.linkBackend.trim()) links.backend = state.linkBackend.trim();
  if (state.linkLive.trim()) links.live = state.linkLive.trim();

  const displayOrder = state.displayOrder.trim()
    ? Number.parseInt(state.displayOrder, 10)
    : undefined;

  return {
    title: state.title.trim(),
    type: state.type.trim(),
    subtitle: state.subtitle.trim() || undefined,
    description: state.description.trim() || undefined,
    images: state.images.map((s) => s.trim()).filter(Boolean),
    features: state.features.map((s) => s.trim()).filter(Boolean),
    techStack: state.techStack.map((s) => s.trim()).filter(Boolean),
    tags: state.tags.map((s) => s.trim()).filter(Boolean),
    links,
    credentials,
    borderColor: state.borderColor || undefined,
    gradient: state.gradient.trim() || undefined,
    displayOrder:
      displayOrder !== undefined && Number.isFinite(displayOrder)
        ? displayOrder
        : undefined,
    isVisible: state.isVisible,
  };
}

function previewProject(state: FormState, base?: Project): Project {
  return {
    id: base?.id ?? 0,
    userId: base?.userId ?? null,
    title: state.title || "Untitled project",
    subtitle: state.subtitle || null,
    type: state.type || "Project",
    description: state.description || null,
    images: state.images.filter(Boolean),
    features: state.features.filter(Boolean),
    techStack: state.techStack.filter(Boolean),
    tags: state.tags.filter(Boolean),
    links: {
      github: state.linkGithub || undefined,
      frontend: state.linkFrontend || undefined,
      backend: state.linkBackend || undefined,
      live: state.linkLive || undefined,
    },
    credentials:
      state.credEmail || state.credPassword || state.credNote
        ? {
            email: state.credEmail || undefined,
            password: state.credPassword || undefined,
            note: state.credNote || undefined,
          }
        : null,
    borderColor: state.borderColor || null,
    gradient: state.gradient || null,
    displayOrder: state.displayOrder
      ? Number.parseInt(state.displayOrder, 10) || 0
      : 0,
    isVisible: state.isVisible,
  };
}

const inputClass =
  "h-10 w-full rounded-md border border-border bg-surface px-3 text-sm text-text placeholder:text-text-subtle focus:outline-none focus-visible:border-border-strong disabled:opacity-60";

const textareaClass =
  "min-h-[100px] w-full rounded-md border border-border bg-surface p-3 text-sm leading-relaxed text-text placeholder:text-text-subtle focus:outline-none focus-visible:border-border-strong disabled:opacity-60";

const labelClass =
  "text-xs font-semibold uppercase tracking-[0.14em] text-text-subtle";

export function ProjectForm({ project }: { project?: Project }) {
  const router = useRouter();
  const { getIdToken, idToken } = useAuth();
  const [state, setState] = useState<FormState>(() => initialState(project));
  const [submitting, setSubmitting] = useState(false);

  const preview = useMemo(() => previewProject(state, project), [state, project]);
  const isEdit = Boolean(project);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!state.title.trim()) {
      toast.error("Title is required.");
      return;
    }
    if (!state.type.trim()) {
      toast.error("Type is required.");
      return;
    }

    setSubmitting(true);
    try {
      const token = idToken ?? (await getIdToken());
      if (!token) throw new Error("You must be signed in.");
      const input = buildInput(state);

      if (isEdit && project) {
        const updated = await updateProject(token, project.id, input);
        const slug = buildProjectSlug(updated.title, updated.id);
        await requestRevalidate({
          idToken: token,
          slugPaths: [`/projects/${slug}`],
        });
        toast.success("Project updated.");
        router.replace("/dashboard/projects");
      } else {
        const created = await createProject(token, input);
        const slug = buildProjectSlug(created.title, created.id);
        await requestRevalidate({
          idToken: token,
          slugPaths: [`/projects/${slug}`],
        });
        toast.success("Project created.");
        router.replace("/dashboard/projects");
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to save project.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-text-subtle">
            {isEdit ? "Edit" : "Create"}
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-text sm:text-3xl">
            {isEdit ? project?.title || "Edit project" : "New project"}
          </h1>
        </div>
        <div className="flex gap-2">
          <NextLink
            href="/dashboard/projects"
            className="inline-flex h-10 items-center rounded-md border border-border bg-surface px-4 text-sm font-medium text-text hover:bg-surface-muted"
          >
            Cancel
          </NextLink>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex h-10 items-center rounded-md bg-brand px-4 text-sm font-medium text-brand-foreground hover:opacity-90 disabled:opacity-60"
          >
            {submitting ? "Saving…" : isEdit ? "Save changes" : "Create project"}
          </button>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-5">
          <Field label="Title" htmlFor="title" required>
            <input
              id="title"
              value={state.title}
              onChange={(e) => update("title", e.target.value)}
              required
              maxLength={120}
              disabled={submitting}
              className={inputClass}
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Subtitle" htmlFor="subtitle">
              <input
                id="subtitle"
                value={state.subtitle}
                onChange={(e) => update("subtitle", e.target.value)}
                maxLength={160}
                disabled={submitting}
                className={inputClass}
              />
            </Field>
            <Field label="Type" htmlFor="type" required>
              <input
                id="type"
                value={state.type}
                list="project-types"
                onChange={(e) => update("type", e.target.value)}
                required
                maxLength={40}
                disabled={submitting}
                className={inputClass}
              />
              <datalist id="project-types">
                {DEFAULT_TYPES.map((t) => (
                  <option key={t} value={t} />
                ))}
              </datalist>
            </Field>
          </div>

          <Field label="Description" htmlFor="description">
            <textarea
              id="description"
              value={state.description}
              onChange={(e) => update("description", e.target.value)}
              rows={5}
              disabled={submitting}
              className={textareaClass}
            />
          </Field>

          <DynamicList
            label="Images (URLs)"
            values={state.images}
            onChange={(next) => update("images", next)}
            placeholder="https://…"
            disabled={submitting}
            renderPreview={(url) =>
              isLikelyImageUrl(url) ? (
                <img
                  src={url}
                  alt=""
                  loading="lazy"
                  className="mt-2 h-16 w-28 rounded-sm border border-border object-cover"
                />
              ) : null
            }
          />

          <DynamicList
            label="Features"
            values={state.features}
            onChange={(next) => update("features", next)}
            placeholder="e.g. Real-time collaboration"
            disabled={submitting}
          />

          <DynamicList
            label="Tech stack"
            values={state.techStack}
            onChange={(next) => update("techStack", next)}
            placeholder="e.g. Next.js"
            disabled={submitting}
          />

          <DynamicList
            label="Tags"
            values={state.tags}
            onChange={(next) => update("tags", next)}
            placeholder="e.g. @nextjs"
            disabled={submitting}
          />

          <fieldset className="flex flex-col gap-3 rounded-lg border border-border bg-bg-elevated p-4">
            <legend className={labelClass}>Links</legend>
            <Field label="Live" htmlFor="linkLive">
              <input
                id="linkLive"
                type="url"
                value={state.linkLive}
                onChange={(e) => update("linkLive", e.target.value)}
                disabled={submitting}
                className={inputClass}
              />
            </Field>
            <Field label="Frontend repo" htmlFor="linkFrontend">
              <input
                id="linkFrontend"
                type="url"
                value={state.linkFrontend}
                onChange={(e) => update("linkFrontend", e.target.value)}
                disabled={submitting}
                className={inputClass}
              />
            </Field>
            <Field label="Backend repo" htmlFor="linkBackend">
              <input
                id="linkBackend"
                type="url"
                value={state.linkBackend}
                onChange={(e) => update("linkBackend", e.target.value)}
                disabled={submitting}
                className={inputClass}
              />
            </Field>
            <Field label="Source / GitHub" htmlFor="linkGithub">
              <input
                id="linkGithub"
                type="url"
                value={state.linkGithub}
                onChange={(e) => update("linkGithub", e.target.value)}
                disabled={submitting}
                className={inputClass}
              />
            </Field>
          </fieldset>

          <fieldset className="flex flex-col gap-3 rounded-lg border border-border bg-bg-elevated p-4">
            <legend className={labelClass}>Demo credentials (optional)</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Email" htmlFor="credEmail">
                <input
                  id="credEmail"
                  value={state.credEmail}
                  onChange={(e) => update("credEmail", e.target.value)}
                  disabled={submitting}
                  className={inputClass}
                />
              </Field>
              <Field label="Password" htmlFor="credPassword">
                <input
                  id="credPassword"
                  value={state.credPassword}
                  onChange={(e) => update("credPassword", e.target.value)}
                  disabled={submitting}
                  className={inputClass}
                />
              </Field>
            </div>
            <Field label="Note" htmlFor="credNote">
              <input
                id="credNote"
                value={state.credNote}
                onChange={(e) => update("credNote", e.target.value)}
                disabled={submitting}
                className={inputClass}
              />
            </Field>
          </fieldset>

          <fieldset className="flex flex-col gap-3 rounded-lg border border-border bg-bg-elevated p-4">
            <legend className={labelClass}>Visual + ordering</legend>
            <div className="grid gap-3 sm:grid-cols-[160px_1fr]">
              <Field label="Border color" htmlFor="borderColor">
                <div className="flex items-center gap-2">
                  <input
                    id="borderColor"
                    type="color"
                    value={state.borderColor || "#000000"}
                    onChange={(e) => update("borderColor", e.target.value)}
                    disabled={submitting}
                    className="h-10 w-14 cursor-pointer rounded-md border border-border bg-surface p-1"
                  />
                  <input
                    value={state.borderColor}
                    onChange={(e) => update("borderColor", e.target.value)}
                    disabled={submitting}
                    className={inputClass}
                  />
                </div>
              </Field>
              <Field label="Gradient (CSS)" htmlFor="gradient">
                <input
                  id="gradient"
                  value={state.gradient}
                  onChange={(e) => update("gradient", e.target.value)}
                  placeholder="linear-gradient(145deg, #6366F1, #000)"
                  disabled={submitting}
                  className={inputClass}
                />
              </Field>
            </div>
            <div className="grid gap-3 sm:grid-cols-[160px_1fr]">
              <Field label="Display order" htmlFor="displayOrder">
                <input
                  id="displayOrder"
                  type="number"
                  value={state.displayOrder}
                  onChange={(e) => update("displayOrder", e.target.value)}
                  disabled={submitting}
                  className={inputClass}
                />
              </Field>
              <label className="flex items-center gap-2 self-end pb-1">
                <input
                  type="checkbox"
                  checked={state.isVisible}
                  onChange={(e) => update("isVisible", e.target.checked)}
                  disabled={submitting}
                  className="h-4 w-4 rounded border-border"
                />
                <span className="text-sm text-text">Visible on public site</span>
              </label>
            </div>
          </fieldset>
        </div>

        <aside className="flex flex-col gap-3 lg:sticky lg:top-20 lg:self-start">
          <span className={labelClass}>Live preview</span>
          <div className="pointer-events-none">
            <ProjectCard project={preview} />
          </div>
        </aside>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-1.5">
      <span className={labelClass}>
        {label}
        {required ? <span className="ml-1 text-accent">*</span> : null}
      </span>
      {children}
    </label>
  );
}

function DynamicList({
  label,
  values,
  onChange,
  placeholder,
  disabled,
  renderPreview,
}: {
  label: string;
  values: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  renderPreview?: (value: string) => React.ReactNode;
}) {
  function setAt(i: number, value: string) {
    onChange(values.map((v, idx) => (idx === i ? value : v)));
  }
  function removeAt(i: number) {
    onChange(values.filter((_, idx) => idx !== i));
  }
  function move(i: number, dir: -1 | 1) {
    const target = i + dir;
    if (target < 0 || target >= values.length) return;
    const next = values.slice();
    [next[i], next[target]] = [next[target]!, next[i]!];
    onChange(next);
  }
  function add() {
    onChange([...values, ""]);
  }

  return (
    <fieldset className="flex flex-col gap-2 rounded-lg border border-border bg-bg-elevated p-4">
      <legend className={labelClass}>{label}</legend>
      {values.length === 0 ? (
        <p className="text-xs text-text-subtle">No entries yet.</p>
      ) : null}
      <ul className="flex flex-col gap-2">
        {values.map((value, i) => (
          <li key={i} className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <input
                value={value}
                onChange={(e) => setAt(i, e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                className={inputClass}
              />
              <button
                type="button"
                aria-label="Move up"
                onClick={() => move(i, -1)}
                disabled={disabled || i === 0}
                className="inline-flex h-10 w-9 items-center justify-center rounded-md border border-border bg-surface text-text-muted hover:text-text disabled:opacity-40"
              >
                ↑
              </button>
              <button
                type="button"
                aria-label="Move down"
                onClick={() => move(i, 1)}
                disabled={disabled || i === values.length - 1}
                className="inline-flex h-10 w-9 items-center justify-center rounded-md border border-border bg-surface text-text-muted hover:text-text disabled:opacity-40"
              >
                ↓
              </button>
              <button
                type="button"
                aria-label="Remove"
                onClick={() => removeAt(i)}
                disabled={disabled}
                className="inline-flex h-10 w-9 items-center justify-center rounded-md border border-danger/40 bg-danger/10 text-danger hover:bg-danger/20 disabled:opacity-40"
              >
                ✕
              </button>
            </div>
            {renderPreview ? renderPreview(value) : null}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={add}
        disabled={disabled}
        className="mt-1 inline-flex h-9 w-fit items-center rounded-md border border-border bg-surface px-3 text-xs font-medium text-text hover:bg-surface-muted disabled:opacity-60"
      >
        + Add
      </button>
    </fieldset>
  );
}

function isLikelyImageUrl(url: string): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return /^https?:$/.test(parsed.protocol);
  } catch {
    return false;
  }
}
