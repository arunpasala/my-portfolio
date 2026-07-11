type EditBlogPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditBlogPage({
  params,
}: EditBlogPageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-[#070707] px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
          Portfolio CMS
        </p>

        <h1 className="mt-3 text-3xl font-semibold">
          Edit blog
        </h1>

        <p className="mt-3 text-white/50">
          Blog ID: {id}
        </p>
      </div>
    </main>
  );
}