export const QUOTES = [
  'Losing is not a big deal',
  'Everything is gonna be okay',
  'You will eventually lose',
  'HA!',
  'You are the best',
  'You might lose at this game, but you have a successful life',
  'I\'m a bad guy, duh!',
  'You did great',
  'Nice try'
]

export const randomQuotes = () => {
  const randIndex = Math.floor(Math.random() * QUOTES.length);
  return QUOTES[randIndex];
}