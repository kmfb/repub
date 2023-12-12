# EPUB Reader

This is an EPUB ebook reader web application built with Next.js. It enables users to access EPUB files from a WebDAV server, read ebooks, and sync reading locations across devices.

## Key Features

- WebDAV integration - Access EPUB files stored on a WebDAV server
- EPUB reading - Read unprotected EPUB formatted ebooks 
- Sync reading position - Sync last read location across devices  

### Reading Experience

The current page and location is synced across devices in real-time using the configured authentication credentials. Simply open the same book on another device and it will open to the current reading position.

## Building and Deployment 

This project uses Next.js and React. Recommended node version is 16+.

```
npm install
npm run dev
```

Compile and export static files for production:
```
npm run build
npm run export
```

The static export can be deployed to any web server. Configure authentication and syncing services appropriately.

## Contributions

Contributions are welcome! Please open issues or PRs for any bugs or improvements.