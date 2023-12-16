const HomeTabExampleOne = () => {
  return (
    <div className="home-example-tab-one" id="home-example-tab-one">
        <button className="home-example-tab-one-item block-interactive" onClick={() => alert('Button clicked')}>One</button>
        <button className="home-example-tab-one-item block-interactive" onClick={() => alert('Button clicked')}>Two</button>
        <button className="home-example-tab-one-item block-interactive" onClick={() => alert('Button clicked')}>Three</button>
        <button className="home-example-tab-one-item block-interactive" onClick={() => alert('Button clicked')}>Four</button>
    </div>
  )
}

export default HomeTabExampleOne