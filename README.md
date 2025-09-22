# GitHub Links Converter

A simple and elegant static web application that converts between GitHub repository links and GitHub Pages links bidirectionally.

![GitHub Links Converter](https://img.shields.io/badge/GitHub-Links%20Converter-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Bulma](https://img.shields.io/badge/Bulma-00D1B2?style=flat&logo=bulma&logoColor=white)

## 🚀 Features

- **Bidirectional Conversion**: Convert from GitHub repository links to GitHub Pages links and vice versa
- **Real-time Validation**: Instant feedback on link format validity
- **Copy to Clipboard**: One-click copying of converted links
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Clean UI**: Built with Bulma CSS framework for a modern, professional look
- **Accessibility**: Keyboard navigation and screen reader friendly
- **Error Handling**: Comprehensive error messages and input validation

## 🔄 How It Works

### Repository → GitHub Pages
Converts links from:
```
https://github.com/username/repo/blob/branch/path/file.html
```
To:
```
https://username.github.io/repo/path/file.html
```

### GitHub Pages → Repository
Converts links from:
```
https://username.github.io/repo/path/file.html
```
To:
```
https://github.com/username/repo/blob/main/path/file.html
```

## 📋 Examples

| Type | Example |
|------|---------|
| **GitHub Repository** | `https://github.com/ycbjarme/CS3_1stQtrPortfolio/blob/main/public/Q13GSodiumJarme.html` |
| **GitHub Pages** | `https://ycbjarme.github.io/CS3_1stQtrPortfolio/public/Q13GSodiumJarme.html` |

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Custom styling and animations
- **JavaScript (ES6+)**: Core functionality and DOM manipulation
- **Bulma CSS**: Modern CSS framework for responsive design
- **Font Awesome**: Icons for enhanced user interface

## 📁 Project Structure

```
github-links-converter/
├── index.html          # Main HTML file
├── app.js             # JavaScript functionality
├── styles.css         # Custom CSS styles
├── test.js           # Test suite for conversion logic
└── README.md         # Project documentation
```

## 🚀 Getting Started

### Local Development

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd github-links-converter
   ```

2. **Start a local server**:
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser**:
   Navigate to `http://localhost:8000`

### GitHub Pages Deployment

1. **Create a new repository** on GitHub
2. **Push your code** to the repository
3. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"
4. **Access your app** at `https://yourusername.github.io/repository-name`

## 🧪 Testing

Run the test suite to verify the conversion logic:

```bash
node test.js
```

The test suite includes:
- ✅ Repository to Pages conversion
- ✅ Pages to Repository conversion  
- ✅ Edge case validation
- ✅ Error handling verification

## 🎯 Usage Instructions

1. **Enter a GitHub link** in the input field
2. **Click "Convert Link"** or press Enter
3. **Copy the result** using the copy button
4. **Open the link** in a new tab if needed
5. **Clear fields** to start over

## 🔧 Customization

### Styling
- Modify `styles.css` for custom themes
- Update Bulma variables for color schemes
- Add animations in the CSS file

### Functionality
- Extend `app.js` for additional URL formats
- Add support for other Git hosting services
- Implement bulk conversion features

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Bulma CSS](https://bulma.io) for the beautiful framework
- [Font Awesome](https://fontawesome.com) for the icons
- GitHub for the amazing platform

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](../../issues) section
2. Create a new issue with detailed description
3. Include browser version and error messages

---

**Made with ❤️ for the developer community**