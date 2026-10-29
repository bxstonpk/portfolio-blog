import Container from './Container.jsx'

export default function PageHeader({ title, description }) {
  return (
    <div className="border-b border-slate-200 bg-slate-50 py-14 dark:border-slate-800 dark:bg-slate-900/40">
      <Container>
        <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
        {description && (
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">{description}</p>
        )}
      </Container>
    </div>
  )
}
