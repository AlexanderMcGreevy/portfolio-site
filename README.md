# The Climb

A portfolio you scroll up a mountain. Seven stops on the way up Mt. Washington, each one a part of the story:

1. **Home** – trailhead
2. **Journey** – the trail log (experience)
3. **Gear** – the pack (skills)
4. **Trail** – signs along the path (projects)
5. **Hut** – the hut list (wins and extras)
6. **Summit** – the view from the top (goals)
7. **Range** – what's next and how to reach me

There is also a plain [classic portfolio](classic.html) with everything on one page.

## Run it

It's static HTML, so any file server works:

```bash
python3 -m http.server 8766
```

Then open http://localhost:8766/.

## How it's put together

- `index.html` – the shell. It owns scrolling, the nav, and the transitions, and loads each stop in its own iframe.
- `stops/*.html` – one self-contained page per stop. Each one can also be opened on its own.
- `bridge.js` – how the shell and the stops talk to each other (`window.Climb`).
- `content.js` – every word on the site. Each fact has exactly one home here; the pages only read from it.
- `data/` – terrain and map data for the Summit and Range 3D scenes.
- `classic.html` – the one-page version, built from the same `content.js`.

To change any text, edit `content.js`. A blank value hides that element (for example `resume: ''` hides the Resume links until a PDF is added).
