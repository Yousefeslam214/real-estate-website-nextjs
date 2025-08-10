import BlogPostPage from "@/app/components/BlogPostPage";
import { baseUrl } from "@/services/shared/apiUrl";

export default async function Page({ params }: { params: { slug: string[] } }) {
  const res = await fetch(`${baseUrl}/posts/${params.slug[0]}`, {
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Post data");
  }

  const data = await res.json();
  console.log("Post data fetched:", params.slug[0]);
  console.log("Post data URL:", `${baseUrl}/posts/${params.slug[0]}`);
  console.log("Post data :", data);
  return <BlogPostPage id={params.slug[0]} initialData={data} />;
}
