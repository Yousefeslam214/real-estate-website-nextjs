import BlogPostPage from "@/components/BlogPostPage";
import { baseUrl } from "@/services/shared/apiUrl";

export default async function Page({ params }: { params: { slug: string[] } }) {
  const res = await fetch(`${baseUrl}/posts/${params.slug[0]}`, {
    next: { revalidate: 0 },
  });
  console.log("Fetching post data for slug:", params.slug[0]);
  if (!res.ok) {
    throw new Error("Failed to fetch post data");
  }
  const data = await res.json();
  console.log("Post data:", data);
  
  return <BlogPostPage id={params.slug[0]} initialData={data} />;
}
