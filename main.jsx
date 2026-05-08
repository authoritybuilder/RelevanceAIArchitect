# Contributing

Thanks for thinking about contributing. Read this before opening a PR; it'll save us both time.

## What I'm happy to merge

- **Bug fixes.** Especially anything with reproduction steps. The X-button saga (see git history) is exactly the kind of bug worth filing.
- **New scan prompts.** The 11 in the AskAi panel are a starting set, not the full set. If you've got a calibrated prompt that consistently produces useful AI output for a specific use case (cost optimisation, compliance review, multi-agent decomposition), open a PR adding it to `SCAN_LIBRARY`.
- **Better generator outputs.** The Skill MD, Claude Project bundle, and Business Justification memo are all rewriteable. If you can produce a sharper version, show me.
- **Accessibility fixes.** Missing ARIA, low contrast, keyboard nav broken — yes please.
- **Mobile fixes.** I tested on a few devices but not all of them.
- **New panels.** Open an issue first to discuss the scope.

## What I'm probably going to push back on

- **Splitting the single file into modules.** The single-file architecture is a deliberate choice for the audience (bootcamp users who paste into Claude). If you're forking heavily, split it in your fork. In the main repo, it stays one file.
- **Adding a state library** (Redux, Zustand, etc.). Prop drilling is fine for this size of app. Adding a state lib adds bundle weight and onboarding friction.
- **Adding analytics.** No tracking, no telemetry, no "anonymous" pings. The artefact stays private to the user's device.
- **Adding em-dashes.** Zero em-dashes is a project-wide constraint. The build pipeline sweeps them. If you submit code with em-dashes, the PR will fail the sweep.
- **Adding "AI-generated" content** without testing. Several scan prompts went through 5+ iterations with real users to get the calibration right. New prompts need to clear that bar before merging.
- **Bundle bloat.** Adding heavy dependencies for cosmetic gains is a no.

## Before opening a PR

1. **Open an issue first** for anything more than a typo fix. I'd rather discuss design before you write code than after.
2. **Run the file through Babel parsing.** It needs to parse cleanly. The validation pattern is in `docs/ARCHITECTURE.md`.
3. **Run the em-dash sweep.** `python3 -c "import sys; s=open('src/AgentArchitect.jsx').read(); print('em:', s.count(chr(0x2014)))"` should print 0.
4. **Test the render of every panel** with the mock UAT pattern. 24 panels should all render to more than 100 characters.
5. **Test paste-into-Claude** if the change touches anything user-facing. The Vite dev path is for development, not the canonical run target.

## Voice and writing style

If your PR adds text content (panel copy, scan prompts, generator outputs), it should match the project's voice:

- **Sage + Everyperson archetype** — measured, plain, no jargon, second person
- **Stance over description** — lead with what the user should DO or KNOW, not "this section is about..."
- **Specific over impressive** — "240 hours/year" beats "significant time savings"
- **Hemingway grade 9 readability** — short sentences, common words, active voice
- **No "AI fingerprint" phrases** — no "leverage", "transformative", "robust", "comprehensive", "crucial", "meticulously", "streamlined"
- **No em-dashes**, ever (use comma-comma or restructure)

The voice canon is documented inside the codebase comments. Read a few of the scan prompts to absorb the pattern before contributing copy.

## Code style

- **Inline styles** with the `T` design token object. No CSS framework.
- **CSS-in-JS object literals**, not styled-components or emotion.
- **Functional components only**, no classes.
- **Hooks** for state (`useState`, `useReducer`), effects (`useEffect`), refs (`useRef`), memoization (`useMemo`).
- **Single file**, single React tree.
- **Prop drilling is fine.** Don't add a state library to avoid it.

## License

By contributing, you agree your contributions ship under the project's MIT license. Standard stuff.

## Questions?

Open an issue with the `question` label. I check them when I can.
