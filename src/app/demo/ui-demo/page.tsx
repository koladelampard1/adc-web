export default function UIDemo() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-2xl space-y-4">
        <h1 className="text-2xl font-semibold">ADC UI Demo</h1>
        <p className="text-sm text-gray-600">
          Tailwind + shadcn/ui are configured correctly.
        </p>
        <div className="rounded-xl border bg-white p-4">
          <div className="flex items-center gap-2">
            <input
              className="flex-1 border rounded-md px-3 py-2"
              placeholder="Type something..."
            />
            <button className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-white">
              Save
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
