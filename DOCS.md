# Link Strategy

## Link Background

From https://stackoverflow.com/questions/65086108/next-js-link-vs-router-push-vs-a-tag...

> Buttons are for actions and links are to go somewhere.
> 
> If you are using NextJs, I'm assuming SEO matters to you here.
> 
> Consider these before making a decision:
> 
> - `router.push()` is mostly used in an event handler (like `onClick`). This is an action. So let's say you click on the button, then you do some task, and based on the result you take the user to another page. Then you'd want to use `router.push()`. Don't use it just to go to another page. Note that this is bad for SEO if you want it to be crawled.
> 
> - `Link` does some heavy lifting for you and has a bunch of props that you can pass to customize it. This is what you need most of the time to go to another page. When you are using it, the default browser's behavior to reload the whole page (as you'd see with the `<a>` tag) is overridden. Crawlers see it as a link to another page, so it's good for SEO.
> 
> - `<a>` tag is just a plain HTML element, with all the default behaviors. When you use it, a full reload happens. If you are using it, try switching to `<Link>`. Similar to `<Link>`, it's good for SEO and accessibility.

## Link Strategy For This App

### Internal Link via HTML element

- wrap the `<a>` in a `<Link>` provided by NextJS

### Internal Link via onClick handler

- destructure `router` from NextJS's `useRouter()`, use `router.push()`

### External Link via HTML element
- use an `<a>`

### External Link via onClick handler
- use the `openExternalLink` function in `utils`

