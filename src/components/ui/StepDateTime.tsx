type StepDateTimeProps = {
  selectedDate: string
  selectedTime: string
  setSelectedDate: (v: string) => void
  setSelectedTime: (v: string) => void
  timeSlots: string[]
  onNext: () => void
  onBack: () => void
  canProceed: boolean
}

export const StepDateTime = ({
  selectedDate,
  selectedTime,
  setSelectedDate,
  setSelectedTime,
  timeSlots,
  onNext,
  onBack,
  canProceed,
}: StepDateTimeProps) => {
  return (
    <div>
      <h2 className="font-serif text-3xl text-primary mb-6">
        Select Date & Time
      </h2>

      <input
        type="date"
        className="w-full border p-2 rounded mb-4"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      <select
        className="w-full border p-2 rounded"
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
      >
        <option value="">Select time</option>
        {timeSlots.map((t) => (
          <option key={t}>{t}</option>
        ))}
      </select>

      <div className="flex justify-between mt-6">
        <button type="button" onClick={onBack}>
          Back
        </button>

        <button
          type="button"
          disabled={!canProceed}
          onClick={onNext}
          className="bg-primary text-white px-6 py-2 rounded disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
