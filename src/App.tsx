import { useState } from 'react'
import './App.css'

function App() {
  const [day, setDay] = useState<number>()
  const [month, setMonth] = useState<number>()
  const [year, setYear] = useState<number>(2026)
  const [message, setMessage] = useState('')
  const [overlay2, setShowIntro] = useState(true)

  const handleSubmit = (event: any) => {
    event.preventDefault()

    const selectedDay = Number(day)
    const selectedMonth = Number(month)
    const selectedYear = Number(year)
    const isLeapYear = selectedYear % 4 === 0
      && (selectedYear % 100 !== 0 || selectedYear % 400 === 0)
    const daysInMonth = selectedMonth === 2
      ? (isLeapYear ? 29 : 28)
      : ([4, 6, 9, 11].includes(selectedMonth) ? 30 : 31)

    if (selectedDay > daysInMonth) {
      setMessage('Please enter a valid date.')
      return
    }

    setMessage(
      `Your future date is set for ${String(selectedDay).padStart(2, '0')}/${String(selectedMonth).padStart(2, '0')}/${selectedYear}.`,
    )
  }

  return (
    <>
      {overlay2 && (
        <div className="overlay" onClick={() => setShowIntro(false)}>
          <div className="topline">
            <video autoPlay muted loop src={'/greetings.mp4'} />
            <h2 id="title">welcome to the future teller, [user]!</h2>
          </div>
          <p>A highly sophisticated, yet extremely simple system. Select any date you'd like to see what's fated for you. <br/> Excited?</p>
          <h6>Tap anywhere to continue</h6>
        </div>
      )}
      
      <div className={`content ${overlay2 ? ' is-blurred' : ''}`} aria-hidden={overlay2} inert={overlay2}>
        <div className="ambient ambient-top" aria-hidden="true" />
        <div className="ambient ambient-bottom" aria-hidden="true" />

        <div className="check-in">
          <h1 id="page-title">What am I<br />today?</h1>
          <p className="intro">Choose a future date and see what the day has in store.</p>

          <form className="date-form" onSubmit={handleSubmit}>
            <fieldset className="date-picker">
              <div className="date-unit">
                <input
                  id="day"
                  aria-label="Day"
                  type="number"
                  step="1"
                  inputMode="numeric"
                  placeholder="DD"
                  value={day}
                  onChange={(event) => {
                    if (event.target.value === '') setDay(undefined)
                    setDay(Math.max(Math.min(Number(event.target.value), 31), 1))
                    setMessage('')
                  }}
                  required
                />
              </div>
              <span className="date-separator" aria-hidden="true">/</span>
              <div className="date-unit">
                <input
                  id="month"
                  aria-label="Month"
                  type="number"
                  step="1"
                  inputMode="numeric"
                  placeholder="MM"
                  value={month}
                  onChange={(event) => {
                    if (event.target.value === '') setMonth(undefined)
                      setMonth(Math.max(Math.min(Number(event.target.value), 12), 1))
                    setMessage('')
                  }}
                  required
                />
              </div>
              <span className="date-separator" aria-hidden="true">/</span>
              <div className="date-unit date-unit-year">
                <input
                  id="year"
                  aria-label="Year"
                  type="number"
                  step="1"
                  inputMode="numeric"
                  placeholder="YYYY"
                  value={year}
                  onChange={(event) => {
                    if (event.target.value === '') setYear(undefined as unknown as number)
                    setYear(Math.max(Math.min(Number(event.target.value), 9999), 1))
                    setMessage('')
                  }}
                  required
                />
              </div>
            </fieldset>

            <button className="submit-button" type="submit">tell me teeeeell meeeee</button>
            <p className="response" role="status" aria-live="polite">{message}</p>
          </form>
        </div>

        <h6 className="troubleshoot">
          Something not working?
          <span onClick={() => window.location.reload()}>Troubleshoot</span>
        </h6>
      </div>
    </>
  )
}

export default App
