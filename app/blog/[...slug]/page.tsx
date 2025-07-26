import BlogPostPage from "@/app/components/BlogPostPage";

export default function Page() {
  return <BlogPostPage />;
}

export async function generateStaticParams() {
  return [
    { slug: ["1"] },
    { slug: ["2"] },
    { slug: ["3"] },
    // Add all the slugs you want to statically generate
  ];
}
