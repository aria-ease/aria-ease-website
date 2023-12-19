import { useEffect } from "react"
import { makeBlockAccessible } from "aria-ease"

const HomeTabExampleOne = () => {

  useEffect(() => {
    makeBlockAccessible('home-example-tab-one', 'home-example-tab-one-item')
  },[])

  return (
    <div className="home-example-tab-one" id="home-example-tab-one">
        <button className="home-example-tab-one-item" onClick={() => alert('Button clicked')}>One</button>
        <button className="home-example-tab-one-item" onClick={() => alert('Button clicked')}>Two</button>
        <button className="home-example-tab-one-item" onClick={() => alert('Button clicked')}>Three</button>
        <button className="home-example-tab-one-item" onClick={() => alert('Button clicked')}>Four</button>
    </div>
  )
}

export default HomeTabExampleOne