export interface ClusterContent {
  title: string;
  description: string;
  prev?: { title: string; slug: string };
  next?: { title: string; slug: string };
  content: string;
  styles?: string;
}
