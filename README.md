# GameSaver!
![Image of gamesaver site](/src/assets/images/example.png)
This is a project for finding game deals and watching historical price for games and deals. 
Visit the site [here!](https://gamesaver.vercel.app/)

[Link to logbook](https://github.com/Medieinstitutet/fed23s-exjobb-loggbok-retzerbil)


## About
My webapp allows the user to search for a game and find it’s current cheapest discounted price on web stores. They can then sort the games on alphabetical order, cheapest price and highest discount.

This allows gamers who want to save money or don’t have much money to spend on games to enjoy the games they want to play, no matter their financial situation. Keeping track of sales independent on a game platform can be hard since they would have to sign up to multiple services and keep track of multiple wishlist on these different storefronts. 

My target audience are gamers who like to save money on games so they can buy more in the long run. It could also be gamers with multiple gaming systems who don’t mind having the games on different platforms but would like to have an easier time finding and using discounts. It could also be gamers who are not in a stable financial situation who don’t have the money to buy games full price and would rather wait to buy a game on sale.

The goal is to have a webapp that allows the user to find discounts for their favorite games.

The product will be used to find games at their current cheapest price, and if it isn't on discount right now, ~~they can sign up to get an email notification when it comes on sale.~~ (The email sendout in the api work in a way where the users can only subscribe to a game that is already in the API, defeating the purpose for email sendouts.)

I wanted to have a detailed view for the games, such as a summary or review scores from Metacritic or a similar rating site, but the API doesn't supply this information and the Metacritic API was either expensive, and the free alternatives that used web-scraping weren't Typescript-friendly or were massively out of date and or of poor quality.

The app has Cypress E2E tests to make sure the site flow works as intended.

I was inspired by the Reddit page r/gamedeals since it is an easy way to keep track of game sales, however it lists all games on sale, and it can be hard to find a specific game. The Reddit thread also requires the user to go to it frequently to keep up to date on sales. Instead, they can just use GameSaver and not need to frequent the site if they so chose.

The app uses [CheapShark API](https://apidocs.cheapshark.com/) to fetch deals on games, [Mantine UI](https://mantine.dev/overview/) library for components and [Tabler Icons](https://tabler.io/docs/icons/react) for icons.


## Thoughts and reflections
In this project, I learned to understand and apply an API and its limitations to my work, often encountering situations where the API behaved in unexpected ways, requiring creative workarounds to optimize for efficiency, reduce the number of API calls, and ensure the implementation functioned as intended.
Additionally, I gained experience working with component libraries and discovered how efficient they are for building mobile-friendly websites, streamlining development while maintaining responsive and user-friendly designs.
