export default function Navbar({ onLogout }) {
  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CipherNotes</h1>
          <p className="mt-1 text-sm text-slate-400">
            Secure notes with a suspicious amount of personality.
          </p>
        </div>

        <button
          onClick={onLogout}
          className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300 active:scale-95"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
