# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 2.x     | ✅ Yes     |
| 1.x     | ✅ Yes     |
| < 1.0   | ❌ No      |

## Reporting a Vulnerability

If you discover a security vulnerability in WealthyWidgets, please **do not** open a public GitHub issue.

Instead, report it privately via one of the following:

- **GitHub Security Advisories** — [Report a vulnerability](https://github.com/anom-developer/wealthywidgets/security/advisories/new) (preferred)
- **Email** — security@wealthywidgets.dev

Please include:
- A description of the vulnerability and its potential impact
- Steps to reproduce or a proof-of-concept
- The affected version(s)

We will acknowledge your report within **48 hours** and aim to release a patch within **7 days** for critical issues.

## Scope

WealthyWidgets is a client-side UI component library. The main security surface areas are:

- **XSS via `dangerouslySetInnerHTML`** — we do not use this anywhere in the library
- **Dependency vulnerabilities** — run regular dependency security audits and update packages promptly
- **AI prompt injection** — the `onAiGenerate` callback is entirely user-supplied; WealthyWidgets does not make any AI API calls itself

Thank you for helping keep WealthyWidgets safe!
