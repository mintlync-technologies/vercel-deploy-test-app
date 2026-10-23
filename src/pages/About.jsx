import { Link } from 'react-router-dom'

export default function About() {
  return (
    <section>
      <h1>About</h1>
      <p>This page is used to test SPA routing behaviour on Vercel.</p>
      <Link to="/">Go to Home</Link>
    </section>
  )
}
