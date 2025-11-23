# Sacrifice

[ninofiliu.com/sacrifice](https://ninofiliu.com/sacrifice/)

## Installation

This installation requires:

- A [Pioneer DDJ 200](https://www.pioneerdj.com/en-us/product/controller/archive/ddj-200/black/overview/)
- A PC with a relatively good GPU (RTX2080 laptops are good enough)
- An internet connexion

1. Check that the DDJ200 can communicate with your web browser
   1. Firefox theoretically supports [WebMIDI](https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API) as well as Chromium, but I had less issues with Chrome
   1. Open up a WebMIDI debugger [like this one](https://hardwaretester.com/midi)
   1. Using the DDJ200 buttons should log MIDI events
1. [Install node](https://nodejs.org/en/download) with the method of your choice, if not done already
1. [Install pnpm](https://pnpm.io/installation)
1. Clone the repo
   ```sh
   git clone git@github.com:ninofiliu/sacrifice
   cd sacrifice
   ```
1. Install dependencies
   ```sh
   pnpm install --frozen-lockfile
   pnpm approve-builds
   ```
1. Run the dev server
   ```sh
   pnpm dev
   ```
1. Open the web app in your browser
   1. Navigate to [`localhost:5173`](http://localhost:5173)
   1. Go fullscreen with `F11`
   1. Refresh with `F5`

## Going further

### Troubleshooting

If something does not work as expected, check out the [browser console](https://www.browserstack.com/guide/open-console-in-chrome), there might be some errors being displayed.

### Supporting other DJ decks

The code works _specifically_ for a Pioneer DDJ200, it has no additional drivers like rekordbox does. All this program needs to work is a DJ deck that sends in MIDI signal, in other words, a DJ controller, not a DJ mixer, which outputs sounds, and is oftentimes more expensive due to the builtin audio card.

It could be relatively easy to support other DJ controllers like the [Pioneer FLX2](https://pioneerdjstore.com/products/ddj-flx2), by finding out the MIDI mapping of all buttons, and updating [`ddj.ts`](./src/ddj.ts) accordingly, namely the variables `buttonsMap`, `knobsMap`, and `offsetsMap`.

To find out about a custom controller button mapping, go to [the web midi debugger](https://hardwaretester.com/midi) and move buttons around. When a button code shows, you'll know which value to update the the typescript file
