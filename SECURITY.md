# Security Policy

## Supported Versions

We release patches for security vulnerabilities regularly. Here are the versions currently receiving security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of MCP Generator seriously. If you believe you have found a security vulnerability, please report it to us as described below.

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report them via email at [INSERT EMAIL] or create a draft security advisory in the GitHub Security tab.

### What to Include

Please include the following information in your report:

* A clear description of the vulnerability
* Steps to reproduce the issue
* Affected versions
* Any potential impact
* If possible, suggestions for addressing the issue

### Response Timeline

* We will acknowledge receipt of your vulnerability report within **48 hours**
* We will send you a more detailed response within **5 business days** indicating the next steps
* We will keep you informed of our progress throughout the process
* We aim to resolve critical vulnerabilities within **30 days**

### Disclosure Policy

* Once a vulnerability is reported, we request that you keep it confidential until we have had a chance to investigate and prepare a fix
* We will coordinate with you on the public disclosure timeline
* We prefer to acknowledge your contribution in our security advisories (with your permission)

## Security Best Practices

When using MCP Generator, please follow these security best practices:

### For Generated MCP Servers

1. **Validate all inputs** - Always validate and sanitize user inputs in your tools
2. **Use environment variables** - Store sensitive configuration in environment variables, not in code
3. **Keep dependencies updated** - Regularly update your project's dependencies
4. **Review generated code** - Understand what the generator creates before deploying to production
5. **Use least privilege** - Run your MCP servers with minimal required permissions

### For Contributing

1. **Review dependencies** - Be cautious when adding new dependencies
2. **Follow secure coding practices** - Input validation, error handling, etc.
3. **Test thoroughly** - Ensure your changes don't introduce security issues

## Security Updates

Security updates will be released as patch versions (e.g., 1.0.1, 1.0.2). We recommend always using the latest version.

Security advisories will be published in the GitHub Security tab and included in release notes.

## Recognition

We believe in recognizing security researchers who help improve our security. Contributors who report valid security issues will be:

* Acknowledged in our security advisories (unless they prefer to remain anonymous)
* Listed in our SECURITY_HALL_OF_FAME.md (if created)
* Credited in release notes when appropriate

Thank you for helping keep MCP Generator and our users safe!
