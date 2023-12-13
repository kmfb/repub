# EPUB Reader

---
[切换至中文版](README_CN.md)
---

This is a web application for reading EPUB ebooks built using Next.js. It allows users to access EPUB files stored on a WebDAV server, read the ebooks, and synchronize reading positions across devices.

## Key Features

- WebDAV integration - Access EPUB files stored on a WebDAV server
- EPUB reading - Read unencrypted EPUB format ebooks
- Sync reading position - Synchronize last read position across devices

### Reading Experience

The current page and position are synchronized in real-time between devices using configured authentication credentials. Simply open the same book on another device, and it will open to the current reading position.

## Build and Deployment

This project uses Next.js and React. The recommended node version is 16+.

### Deploying to Vercel

Click the button below to directly deploy the application to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/project?template=https://github.com/kmfb/repub)

## Contribution

Contributions are welcome! Please open an issue or PR to report any bugs or improvements.