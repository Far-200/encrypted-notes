export default function NoteForm({
  title,
  content,
  setTitle,
  setContent,
  editingNoteId,
  onSubmit,
  onCancelEdit,
  formLoading,
  error,
}) {
  return (
    <section className="mb-8 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold">
            {editingNoteId ? "Edit note" : "Create a note"}
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            {editingNoteId
              ? "Update your note and save the new encrypted version."
              : "Write something important. Or dramatic. Or both."}
          </p>
        </div>

        {editingNoteId && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-slate-500 hover:text-white active:scale-95"
          >
            Cancel Edit
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        <input
          className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="min-h-[140px] w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          type="submit"
          disabled={formLoading}
          className="rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {formLoading
            ? editingNoteId
              ? "Updating..."
              : "Saving..."
            : editingNoteId
              ? "Update Note"
              : "Add Note"}
        </button>
      </form>
    </section>
  );
}
