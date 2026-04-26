# Contributing

Thank you for your interest in contributing to the Quran Multi-Language App. This project aims to make the Holy Quran accessible to everyone through open-source technology.

## How to Contribute

### Adding Translations
1. Find an open-licensed translation (MIT, CC-BY, CC0, GPL)
2. Format it as JSON following the schema in `resources/text/en/translation.json`
3. Place it in `resources/text/{lang_code}/translation.json`
4. Update `docs/RESOURCES.md` with source and license info
5. Run `python scripts/validate_data.py` to verify

### Adding Reciters
1. Create a manifest JSON in `resources/audio/manifests/{reciter_id}.json`
2. Follow the schema of existing manifests
3. Only include URLs to publicly available audio (never commit MP3 files)

### Improving the Web/Mobile/API
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests (`npm run lint` for web, `pytest` for API)
5. Submit a pull request

## Code Style
- TypeScript/JavaScript: Follow ESLint config in `src/web`
- Python: Follow PEP 8, use type hints
- JSON: 2-space indentation, UTF-8 encoding

## Important Rules
- ONLY include permissively licensed resources
- Never commit binary audio/video files to git
- Ensure Arabic text is stored as UTF-8 Unicode
- All JSON files must include a `version` field
- Test your changes before submitting a PR

## Reporting Issues
Use the GitHub issue templates for bug reports and feature requests.
