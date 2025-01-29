import GetTweet from './GetTweet'

function Home() {
  return (
    <div className="home-container max-w-[90vw] md:max-w-[60vw] mx-auto mt-8">
      <GetTweet />
    </div>
  )
}

export { Home }
