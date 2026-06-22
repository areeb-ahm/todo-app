
export default function FilterBar({ filter, onFilterChange, searchQuery, onSearchChange }) {
	const options = ['all', 'active', 'completed']

	return (
		<div className="space-y-3">
			<input
				type="text"
				value={searchQuery}
				onChange={(e) => onSearchChange(e.target.value)}
				placeholder="Search tasks..."
				className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
			/>

			<div className="flex gap-2">
				{options.map((option) => {
					const active = option === filter
					const label = option.charAt(0).toUpperCase() + option.slice(1)
					const base = 'px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer'
					const classes = active
						? `${base} bg-blue-600 text-white`
						: `${base} bg-slate-800 text-slate-400 hover:text-white border border-slate-700`
					return (
						<button key={option} onClick={() => onFilterChange(option)} className={classes}>
							{label}
						</button>
					)
				})}
			</div>
		</div>
	)
}

