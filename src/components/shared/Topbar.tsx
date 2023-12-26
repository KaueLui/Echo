import { Link } from 'react-router-dom'

const Topbar = () => {
  return (
    <section className='topbar'>
      <div className='flex-between py-4 px-5'>
        <Link to="/" className="flex gap-3 items-center">
        <img src="/assets/images/logo-2.svg" alt="logo" />
        </Link>
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2>
      </div>

    </section>
  )
}
 
export default Topbar