export type ProjectLinks = {
  github?: string;
  frontend?: string;
  backend?: string;
  live?: string;
};

export type ProjectCredentials = {
  email?: string;
  password?: string;
  note?: string;
};

export type RawProject = {
  id: number;
  user_id: number | null;
  title: string;
  subtitle: string | null;
  type: string;
  description: string | null;
  images: string[] | null;
  features: string[] | null;
  tech_stack: string[] | null;
  tags: string[] | null;
  links: ProjectLinks | null;
  credentials: ProjectCredentials | null;
  border_color: string | null;
  gradient: string | null;
  display_order: number;
  is_visible: boolean;
  created_at?: string;
  updated_at?: string;
};

export type Project = {
  id: number;
  userId: number | null;
  title: string;
  subtitle: string | null;
  type: string;
  description: string | null;
  images: string[];
  features: string[];
  techStack: string[];
  tags: string[];
  links: ProjectLinks;
  credentials: ProjectCredentials | null;
  borderColor: string | null;
  gradient: string | null;
  displayOrder: number;
  isVisible: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type ProjectCreateInput = {
  title: string;
  type: string;
  subtitle?: string;
  description?: string;
  images?: string[];
  features?: string[];
  techStack?: string[];
  tags?: string[];
  links?: ProjectLinks;
  credentials?: ProjectCredentials | null;
  borderColor?: string;
  gradient?: string;
  displayOrder?: number;
  isVisible?: boolean;
};

export type ProjectUpdateInput = Partial<ProjectCreateInput>;

export type ReorderItem = { id: number; displayOrder: number };

export function mapProject(raw: RawProject): Project {
  return {
    id: raw.id,
    userId: raw.user_id,
    title: raw.title,
    subtitle: raw.subtitle,
    type: raw.type,
    description: raw.description,
    images: raw.images ?? [],
    features: raw.features ?? [],
    techStack: raw.tech_stack ?? [],
    tags: raw.tags ?? [],
    links: raw.links ?? {},
    credentials: raw.credentials,
    borderColor: raw.border_color,
    gradient: raw.gradient,
    displayOrder: raw.display_order,
    isVisible: raw.is_visible,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  };
}

export function unmapProjectInput(
  input: ProjectCreateInput | ProjectUpdateInput,
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  if (input.title !== undefined) out.title = input.title;
  if (input.type !== undefined) out.type = input.type;
  if (input.subtitle !== undefined) out.subtitle = input.subtitle;
  if (input.description !== undefined) out.description = input.description;
  if (input.images !== undefined) out.images = input.images;
  if (input.features !== undefined) out.features = input.features;
  if (input.techStack !== undefined) out.tech_stack = input.techStack;
  if (input.tags !== undefined) out.tags = input.tags;
  if (input.links !== undefined) out.links = input.links;
  if (input.credentials !== undefined) out.credentials = input.credentials;
  if (input.borderColor !== undefined) out.border_color = input.borderColor;
  if (input.gradient !== undefined) out.gradient = input.gradient;
  if (input.displayOrder !== undefined) out.display_order = input.displayOrder;
  if (input.isVisible !== undefined) out.is_visible = input.isVisible;
  return out;
}
