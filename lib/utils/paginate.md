Got it — you want me to extract the pagination logic into a separate reusable function so you can use it in multiple places (like your blog, projects, etc.), and then integrate it here in BlogPage with a limit feature.

Here’s how I’ll structure it:

Utility function paginate in a shared helper file.

Use that function in BlogPage to slice the posts.

Add basic pagination controls.

1️⃣ Create a shared pagination helper

/utils/paginate.ts

export interface PaginationResult<T> {
data: T[];
currentPage: number;
totalPages: number;
totalItems: number;
}

export function paginate<T>(
items: T[],
page: number,
limit: number
): PaginationResult<T> {
const totalItems = items.length;
const totalPages = Math.ceil(totalItems / limit);
const startIndex = (page - 1) _ limit;
const endIndex = page _ limit;
const paginatedData = items.slice(startIndex, endIndex);

return {
data: paginatedData,
currentPage: page,
totalPages,
totalItems,
};
}

2️⃣ Use it inside BlogPage
import { paginate } from "@/utils/paginate";

const [page, setPage] = useState(1);
const limit = 6; // posts per page

const { data: paginatedPosts, totalPages } = paginate(filteredPosts, page, limit);

3️⃣ Add pagination controls at the bottom
{/_ Pagination Controls _/}

<div className="flex items-center gap-2 mt-8">
  <button
    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
    disabled={page === 1}
    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
  >
    {language === "ar" ? "السابق" : "Previous"}
  </button>

{Array.from({ length: totalPages }, (\_, i) => (
<button
key={i}
onClick={() => setPage(i + 1)}
className={`px-4 py-2 rounded ${
        page === i + 1
          ? "bg-blue-600 text-white"
          : "bg-gray-200 dark:bg-gray-700"
      }`} >
{i + 1}
</button>
))}

<button
onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
disabled={page === totalPages}
className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"

>

    {language === "ar" ? "التالي" : "Next"}

  </button>
</div>
