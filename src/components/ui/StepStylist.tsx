type StepStylistProps = {
  stylists: any[]
  selectedStylist: string
  setSelectedStylist: (v: string) => void
  onBack: () => void
  canSubmit: boolean
}

export const StepStylist = ({
  stylists,
  selectedStylist,
  setSelectedStylist,
  onBack,
  canSubmit,
}: StepStylistProps) => {
  return (
    <div>
      <h2 className="font-serif text-3xl text-primary mb-6">
        Select Stylist
      </h2>

      <select
        className="w-full border p-2 rounded"
        value={selectedStylist}
        onChange={(e) => setSelectedStylist(e.target.value)}
      >
        <option value="">Select stylist</option>
        {stylists.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      <div className="flex justify-between mt-6">
        <button type="button" onClick={onBack}>
          Back
        </button>

        <button
          type="submit"
          disabled={!canSubmit}
          className="bg-primary text-white px-6 py-2 rounded disabled:opacity-50"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  )
}
