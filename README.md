Uber Clone

To view video of the app please visit my portfolio linked below</br>
https://zaythedev.com/uber-clone

<b>Stack</b>
<li>React Native</li>
<li>Expo</li>
<li>TailwindCSS</li>
<li>Google Places API</li>
<li>Google Distance API</li>

Instructions for App
1.	Clone the repository
2.	Download XCode or use VS Code and Expo Go to start a virtual mobile simulator
3.	Enjoy the app


The Uber Clone was my first React Native project. The objective for this app was to demonstrate my ability for front-end app design and simulate the “Ride” feature in the Uber app. With many of the components in this app, I used Tailwind for the inline styling. If a component had many styling attributes, I used a separate style constant to avoid messy inline code. With the styling and advanced features in this clone, it looks and feels very similar to the actual Uber app. 

<b>Success</b><br/>
With API requests from Google's Places and Directions, I was able to implement address search field. A user can enter any address for their pickup and drop-off location. 

With Redux I was able to manage the users state and render components based off of address entry. After entering an address Redux dispatches a pull request to render the quickest route from the pickup to drop-off location. 

Pulling address data from Google API as in time, latitude and longitude,  I was able to properly calculate the total trip. The trip cost consist of the distance, time, and vehicle type. 

<b>Challenges</b><br/>
The challenging part for this project was styling the components. Using Tailwind made it easier, but their syntax and sizing properties are different from the standard CSS styles. So, throughout the entire project, I had to keep referring to Tailwind’s documentation to convert their sizing units to pixels. After using tailwind for a couple of days, I eventually got used to their sizing properties. I am now able to style apps a lot faster with the help of Tailwind.


<b>Features</b>
<li>Location search auto complete</li>
<li>Uber start and ending destination markers</li>
<li>View trip route</li>
<li>Trip total miles and ETA</li>
<li>Vehicle type with adjusted total trip price</li>
