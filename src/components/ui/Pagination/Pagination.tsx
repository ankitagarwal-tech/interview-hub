interface Props {
    page: number
    onPrev: () => void
    onNext: () => void
    disablePrev?: boolean
    disableNext?: boolean
}

export default function Pagination({ page, onPrev, onNext, disablePrev, disableNext }: Props) {
    return (
        <div className="inline-flex items-center space-x-2">
            <button
                onClick={onPrev}
                disabled={disablePrev}
                className={`px-3 py-1.5 rounded border text-sm ${disablePrev ? 'opacity-50 cursor-not-allowed' : 'bg-white hover:bg-slate-50'}`}
            >
                Prev
            </button>


            <div className="px-3 py-1.5 text-sm">{page}</div>


            <button
                onClick={onNext}
                disabled={disableNext}
                className={`px-3 py-1.5 rounded border text-sm ${disableNext ? 'opacity-50 cursor-not-allowed' : 'bg-white hover:bg-slate-50'}`}
            >
                Next
            </button>
        </div>
    )
}