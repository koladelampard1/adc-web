export default function CoursesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium">Courses</h2>
        <a href="/admin/courses/new" className="px-3 py-2 rounded bg-black text-white">New Course</a>
      </div>
      {/* We will render a table here next phase */}
      <div className="text-sm text-muted-foreground">No courses yet.</div>
    </div>
  )
}