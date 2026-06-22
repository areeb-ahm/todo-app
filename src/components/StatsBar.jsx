
export default function StatsBar({ stats }) {
	return (
		<div className="grid grid-cols-3 gap-3">
			<div className="bg-slate-800 rounded-xl p-4 text-center border border-slate-700">
				<p className="text-2xl font-bold text-white">{stats.total}</p>
				<p className="text-xs text-slate-400 mt-1 uppercase tracking-wide">Total</p>
			</div>

			<div className="bg-slate-800 rounded-xl p-4 text-center border border-slate-700">
				<p className="text-2xl font-bold text-blue-400">{stats.active}</p>
				<p className="text-xs text-slate-400 mt-1 uppercase tracking-wide">Active</p>
			</div>

			<div className="bg-slate-800 rounded-xl p-4 text-center border border-slate-700">
				<p className="text-2xl font-bold text-emerald-400">{stats.completed}</p>
				<p className="text-xs text-slate-400 mt-1 uppercase tracking-wide">Done</p>
			</div>
		</div>
	)
}

