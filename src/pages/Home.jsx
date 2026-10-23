import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section>
      <h1>Home</h1>
      <p>This is the home page of the Vercel deploy test app.</p>
      <p data-testid="env-message">
        {import.meta.env.VITE_APP_MESSAGE ?? 'VITE_APP_MESSAGE is not set'}
      </p>
      <Link to="/about">Go to About</Link>
    </section>
  )
}
