# EPUB Reader

---
[change to English version](README.md)

这是一个使用 Next.js 构建的 EPUB 电子书阅读器 Web 应用程序。它使用户能够从 WebDAV 服务器访问 EPUB 文件,阅读电子书,并在设备之间同步阅读位置。

## 主要功能

- WebDAV 集成 - 访问存储在 WebDAV 服务器上的 EPUB 文件
- EPUB 阅读 - 阅读未加密的 EPUB 格式电子书 
- 同步阅读位置 - 在设备之间同步上次阅读的位置

### 阅读体验

当前页面和位置使用配置的身份验证凭据在设备之间实时同步。只需在另一台设备上打开同一本书,它就会打开到当前的阅读位置。

## 构建和部署

这个项目使用 Next.js 和 React。推荐的 node 版本是 16+。

### 部署到 Vercel

点击下面的按钮将应用程序直接部署到 Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/project?template=https://github.com/kmfb/repub)


## 贡献

欢迎贡献!请打开 issue 或 PR 以报告任何错误或改进。