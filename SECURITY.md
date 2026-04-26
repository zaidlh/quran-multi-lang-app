# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | Yes               |

## Reporting a Vulnerability

We take the security of this project seriously. If you discover a security
vulnerability, please report it responsibly.

**Do NOT open a public GitHub issue for security vulnerabilities.**

Instead, please email **lhouchzaid@gmail.com** with:

1. A description of the vulnerability
2. Steps to reproduce the issue
3. Potential impact assessment
4. Any suggested fixes (if applicable)

### What to Expect

- **Acknowledgment**: Within 48 hours of your report
- **Assessment**: We will evaluate the vulnerability within 7 days
- **Resolution**: Critical issues will be patched as quickly as possible
- **Credit**: We will credit you in the release notes (unless you prefer anonymity)

### Scope

The following are in scope:

- XSS vulnerabilities in the web application
- Injection vulnerabilities in the API
- Authentication/authorization bypasses
- Data exposure or leakage
- Dependency vulnerabilities

### Out of Scope

- Issues in third-party CDN services (EveryAyah, jsDelivr, QuranicAudio)
- Social engineering attacks
- Denial of service attacks
- Issues requiring physical access to a user's device

## Security Best Practices

This project follows these security practices:

- No secrets or API keys committed to the repository
- External API data rendered as text (not raw HTML) to prevent XSS
- Content Security Policy headers recommended for deployment
- Dependencies regularly audited with `npm audit` and `pip audit`
- Service worker uses cache-first strategy with versioned cache names
