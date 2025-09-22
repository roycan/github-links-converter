# Regular Expressions (Regex) Deep Dive (Grade 9 Friendly)

Regular Expressions (often shortened to **regex**) are patterns used to match text. Think of them like super-smart search tools that can find exactly the kind of text you want.

---
## 🎯 What Can Regex Do?
- Check if a link is a GitHub repository link
- Pull out the username or repository name
- Validate simple formats (like emails, file paths, etc.)

In `app.js`, regex helps the program decide: *Is this a GitHub repo file link? Or a GitHub Pages link?*

---
## 🧱 Basic Building Blocks
| Symbol | Meaning | Example | Matches |
|--------|---------|---------|---------|
| `^` | Start of the string | `^Hi` | "Hi there" (YES), "Oh Hi" (NO) |
| `$` | End of the string | `end$` | "the end" (YES) |
| `.` | Any single character | `a.c` | "abc", "a-c" |
| `+` | One or more of previous | `a+` | "a", "aa", "aaa" |
| `*` | Zero or more | `ba*` | "b", "ba", "baaa" |
| `?` | Optional (0 or 1) | `colou?r` | "color", "colour" |
| `[...]` | One of these characters | `[abc]` | "a", "b", or "c" |
| `[^...]` | NOT these characters | `[^/]` | any character except `/` |
| `( )` | Group things | `(dog)+` | "dog", "dogdog" |
| `|` | OR | `cat|dog` | "cat" or "dog" |
| `\` | Escape special character | `\.` | A literal dot `.` |

---
## 🔍 Example from This Project
Repository link pattern:
```javascript
/^https:\/\/github\.com\/([^\/]+)\/([^\/]+)\/blob\/([^\/]+)\/(.+)$/
```
Let’s break it apart:
| Piece | Meaning |
|-------|---------|
| `^https:\/\/github\.com\/` | Must start with `https://github.com/` |
| `([^\/]+)` | Capture username (1+ characters not `/`) |
| `\/` | Literal `/` |
| `([^\/]+)` | Capture repo name |
| `\/blob\/` | Literal `blob/` (part of GitHub URL) |
| `([^\/]+)` | Capture branch name (ex: `main`) |
| `\/` | Next slash |
| `(.+)` | Capture the rest (file path) |
| `$` | End of string |

Captured groups become an array when you do `url.match(pattern)`:
```javascript
const match = url.match(repoPattern);
// match[1] = username
// match[2] = repo name
// match[3] = branch
// match[4] = file path
```

---
## 🌐 GitHub Pages Pattern
```javascript
/^https:\/\/([^\.]+)\.github\.io\/([^\/]+)\/(.+)$/
```
Differences:
| Part | Meaning |
|------|---------|
| `([^\.]+)` | Username (characters until a dot) |
| `\.github\.io\/` | The literal `.github.io/` part |
| `([^\/]+)` | Repository name |
| `(.+)` | File path |

---
## 🧪 Try Matching Yourself
Test string:
```
https://github.com/alice/portfolio/blob/main/index.html
```
Ask:
- Username? → `alice`
- Repo? → `portfolio`
- Branch? → `main`
- File path? → `index.html`

---
## 🛠️ Mini Practice Patterns
| Goal | Pattern | Example Match |
|------|---------|---------------|
| Any `.html` file | `/\.html$/` | `about.html` |
| Number | `/^[0-9]+$/` | `12345` |
| Username (letters/numbers/underscore) | `/^[A-Za-z0-9_]+$/` | `user_42` |
| Simple email | `/^[^@]+@[^@]+\.[^@]+$/` | `me@test.com` |

---
## 🧠 Tips for Reading Regex
1. Look for `/.../` → pattern borders
2. Find groups `( ... )` → captured information
3. Escape sequences like `\.` mean actual dot
4. Read from left to right slowly
5. Rewrite it in words first

Example rewrite:
```
/^https:\/\/github\.com\/([^\/]+)\/([^\/]+)\/blob\/([^\/]+)\/(.+)$/
"Start, then 'https://github.com/', then username, slash, repo, slash 'blob/', branch, slash, file path, end"
```

---
## 🧪 Mini Challenges
1. Write a pattern that matches any PNG image file name: `photo.png`, `icon.PNG` (hint: use `[Pp][Nn][Gg]` or case-insensitive flag).
2. Pattern to match a URL that ends with `.css`.
3. Pattern to capture two words separated by a dash: `hello-world` → groups: `hello`, `world`.

### Possible Answers
1. `/^.+\.[Pp][Nn][Gg]$/`
2. `/\.css$/`
3. `/^([a-z]+)-([a-z]+)$/`

---
## 🧰 Build Your Own Simple Tester (Optional)
```javascript
const pattern = /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)/;
const url = 'https://github.com/alice/portfolio';
const match = url.match(pattern);
if (match) {
  console.log('User:', match[1]);
  console.log('Repo:', match[2]);
} else {
  console.log('Not a match');
}
```

---
## 📖 Glossary
| Term | Meaning |
|------|--------|
| Pattern | The rule you write to match text |
| Match | When text fits the pattern |
| Capture Group | Part of the match you saved in `( )` |
| Escape | Use `\` to treat a special character as normal |
| Anchor | `^` or `$` marking start/end |

---
## ❤️ Final Thought
Regex looks scary at first, like a secret code. But once you learn the symbols, you can read and write patterns like a detective following clues. Practice a few patterns a day!
