# Aria-Ease Documentation Website

[![Audited by aria-ease](https://cdn.jsdelivr.net/gh/aria-ease/aria-ease@main/badges/audited-by-aria-ease.svg)](https://github.com/aria-ease/aria-ease)
[![Components tested: aria-ease](https://cdn.jsdelivr.net/gh/aria-ease/aria-ease@main/badges/components-tested-aria-ease.svg)](https://github.com/aria-ease/aria-ease)
This is the official documentation website for [Aria-Ease NPM Package](https://www.npmjs.com/package/aria-ease)

## The [open source package repo](https://github.com/aria-ease/aria-ease)

## 🎉 Recent Major Updates (March 2026)

The documentation has been significantly enhanced to better showcase aria-ease's value:

### New Sections Added:

- ✅ **Before/After Code Comparison** - Shows 50 lines vs 3 lines
- ✅ **"Why aria-ease?" Comparison** - Differentiates from alternatives
- ✅ **Enhanced CLI Audit Section** - Makes it a primary feature
- ✅ **Quick Wins Guide** - 5-minute getting started
- ✅ **Developer Experience Section** - Highlights DX features
- ✅ **Migration/Adoption Guide** - For existing codebases
- ✅ **Improved Examples** - Real-world context added
- ✅ **Better Syntax Highlighting** - Dark/light mode themes

### Component Updates:

- Enhanced `CodeBlock` component with theme switching
- Created `InteractivePlayground` component (coming soon)
- Updated hero section with stronger value proposition
- Improved visual hierarchy throughout

---

## 📚 Documentation Structure

```
docs/
├── CONTENT-CREATION-GUIDE.md      # Guide for creating videos/screenshots
├── IMPLEMENTATION-SUMMARY.md      # Summary of all improvements
├── QUICK-ACTION-CHECKLIST.md      # Your next steps
├── SYNTAX-HIGHLIGHTING-GUIDE.md   # How to use the new CodeBlock
├── src/
│   ├── components/
│   │   ├── CodeBlock.jsx          # Enhanced with theme support
│   │   ├── InteractivePlayground.jsx  # New playground component
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── ...
│   ├── pages/
│   │   ├── Homepage.jsx           # Major redesign
│   │   ├── Documentation.jsx
│   │   ├── Examples.jsx           # Improved context
│   │   ├── ApiReference.jsx
│   │   ├── Testing.jsx
│   │   └── ...
│   └── assets/
│       ├── images/                # Add screenshots here
│       └── videos/                # Add demo videos here
└── ...
```

---

## 🚀 Quick Start (Development)

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
cd docs
npm install
```

### Run Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Run Accessibility Contract Tests

The docs app uses contract DSL files for custom component policies. Test runs automatically build DSL contracts to JSON first.

```bash
npm run test
```

Equivalent command flow:

```bash
npx aria-ease build contracts
npx aria-ease test
```

Contract build sources are configured in `ariaease.config.js` under `contracts` as an array, so multiple contract groups can be built in one run.

### Build for Production

```bash
npm run build
```

---

## ✅ Immediate Action Items

### Critical (Do First):

1. **Add darkMode prop to all CodeBlock components**
   - See: `SYNTAX-HIGHLIGHTING-GUIDE.md`
   - Files: Homepage.jsx, Documentation.jsx, Examples.jsx, etc.

2. **Create CLI audit screenshots**
   - Run: `npx aria-ease audit --url https://ariaease.site`
   - Capture HTML report
   - Save to: `src/assets/images/cli-audit-report.webp`

3. **Record 2-minute tutorial video**
   - Follow script in `CONTENT-CREATION-GUIDE.md`
   - Show installation → working example
   - Save to: `src/assets/videos/quick-start-tutorial.mp4`

See `QUICK-ACTION-CHECKLIST.md` for complete task list.

---

## 📖 Documentation Guides

- **CONTENT-CREATION-GUIDE.md** - What videos/screenshots to create and how
- **IMPLEMENTATION-SUMMARY.md** - Overview of all improvements made
- **QUICK-ACTION-CHECKLIST.md** - Your actionable next steps
- **SYNTAX-HIGHLIGHTING-GUIDE.md** - How to use the enhanced CodeBlock component

---

## 🎨 Design System

### Colors:

- Primary: Blue (#2563eb)
- Success: Green (#10b981)
- Warning: Orange (#f59e0b)
- Error: Red (#ef4444)

### Typography:

- Headings: Bold, clear hierarchy
- Body: 16px minimum for readability
- Code: Monospace with syntax highlighting

### Components:

- Consistent padding (py-[80px] for sections)
- Responsive breakpoints
- Dark/light mode support throughout

---

## 📹 Media Assets Needed

See `CONTENT-CREATION-GUIDE.md` for detailed requirements.

### High Priority:

- CLI audit HTML report screenshot
- 2-minute tutorial video
- Before/after accessibility scores

### Medium Priority:

- Keyboard interaction GIFs
- Component interaction diagrams
- Bundle size comparisons

---

## 🧪 Testing

### Before Deploying:

- [ ] Test on mobile and desktop
- [ ] Verify dark mode works
- [ ] Check all links
- [ ] Test keyboard interaction
- [ ] Run Lighthouse audit (target: 90+)
- [ ] No console errors
- [ ] Test on Chrome, Firefox, Safari

### Accessibility:

- All new sections are keyboard navigable
- Proper heading hierarchy
- Alt text for images
- ARIA labels where needed
- Color contrast WCAG AA compliant

---

## 🚀 Deployment

The site is deployed to [production URL].

### Deploy Command:

```bash
npm run build
# Then deploy the `dist` folder
```

---

## 🤝 Contributing

When adding new content:

1. Follow the existing structure
2. Maintain dark/light mode support
3. Test on multiple devices
4. Add alt text to images
5. Keep performance in mind
6. Update this README if needed

---

## 📊 Success Metrics

Track these to measure documentation effectiveness:

- Time on homepage
- Scroll depth
- "Get Started" click-through rate
- GitHub stars / npm downloads
- Support questions about "how to start"

---

## 🆘 Need Help?

- Check the guide documents in this directory first
- Review the implementation summary
- Look at existing components for examples
- Test in development mode before deploying

---

## 📝 Recent Changes Log

### January 1, 2026

- Complete homepage redesign with value-focused sections
- Added before/after code comparison (50→3 lines)
- Created "Why aria-ease?" differentiation section
- Enhanced CLI audit prominence
- Added 5-minute Quick Start guide
- Created Developer Experience showcase
- Added Migration/Adoption guide
- Improved Examples with real-world context
- Enhanced CodeBlock with theme switching
- Created InteractivePlayground component
- Generated comprehensive documentation guides

---

For more details, see the documentation guides in this directory.
