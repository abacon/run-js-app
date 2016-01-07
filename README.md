# run-js-app
## a quick and dirty run-js app prototype

- Supports multiple instances of run-js watching different directories. No idea how the servers collide.
- You can start 'em and stop 'em.
- That's pretty much it.

The front-end is currently all written in jsx and compiled on-the-fly via babel-register, which is why it's so slow to load at first. I did this because I can't be bothered to set up compilation... which is exactly why run-js exists anyway.

I make no attempt to style anything, though I do use react-ratchet (a la [monu](https://github.com/maxogden/monu)). shrug! Something like [photon](https://github.com/connors/photon) might be nice, but it only has a mac theme at the moment.

## Running

```sh
npm i
./node_modules/.bin/electron .
```

The app should show up in your menubar as a little kitty! Once you pick a directory and start an instance, it'll open your web browser and file browser to the relevant places.
