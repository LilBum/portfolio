import './background.css'

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="folio-background about-background">
      <div className="folio-width about-layout">
        <div>
          <h2 id="about-title" className="background-heading">About me</h2>
          <p className="about-note">
            I live in Lynnwood, Washington. I was building lending software full time when
            I started studying psychology at UW. These days I split my time between software
            and neuroscience.
          </p>
        </div>
        <div className="education-record">
          <h3>Education</h3>
          <dl>
            <div>
              <dt>University of Washington</dt>
              <dd>B.S. in Psychology</dd>
              <dd className="education-date">Expected summer 2027</dd>
            </div>
            <div>
              <dt>Edmonds College</dt>
              <dd>Associate of Arts, 2025 · Full Stack Developer Certificate</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
