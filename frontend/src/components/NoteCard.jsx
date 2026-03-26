export default function NoteCard({ note, onTogglePin, onEdit, onDelete }) {
  return (
    <article className="rounded-3xl border border-slate-800 bg-slate-950 p-5 shadow-lg transition duration-300 hover:border-cyan-400 hover:scale-[1.01]">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h4 className="text-2xl font-bold break-words">{note.title}</h4>

            {note.isPinned && (
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-300">
                Pinned
              </span>
            )}
          </div>

          <p className="whitespace-pre-wrap break-words text-slate-300">
            {note.content}
          </p>

          <p className="mt-4 text-xs text-slate-500">
            {note.updatedAt
              ? `Updated: ${new Date(note.updatedAt).toLocaleString()}`
              : ""}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 md:justify-end">
          <button
            onClick={() => onTogglePin(note._id)}
            className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-300 transition hover:bg-amber-500/20 active:scale-95"
          >
            {note.isPinned ? "Unpin" : "Pin"}
          </button>

          <button
            onClick={() => onEdit(note)}
            className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/20 active:scale-95"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(note._id)}
            className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/20 active:scale-95"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
