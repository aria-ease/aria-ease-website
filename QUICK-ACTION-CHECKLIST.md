# Quick Action Checklist - Your Tasks

## 🔥 Critical (Do These First)

### 1. Fix CodeBlock darkMode Prop

**What:** Add `darkMode={darkMode}` to ALL CodeBlockDemo components

**Files to update:**

- [ ] `src/pages/Homepage.jsx` - All CodeBlockDemo instances
- [ ] `src/pages/Documentation.jsx` - All CodeBlockDemo instances
- [ ] `src/pages/Examples.jsx` - All CodeBlockDemo instances
- [ ] `src/pages/ApiReference.jsx` - All CodeBlockDemo instances
- [ ] `src/pages/Testing.jsx` - All CodeBlockDemo instances
- [ ] `src/pages/Audit.jsx` - All CodeBlockDemo instances (if exists)

**Find:** `<CodeBlockDemo code={`
**Replace with:** `<CodeBlockDemo code={` ... `darkMode={darkMode}`

---

### 2. Create CLI Audit Screenshots

**What:** Capture the HTML audit report

**Steps:**

1. Run: `npx aria-ease audit --url https://ariaease.site`
2. Open the generated HTML report in `accessibility-reports/audit/`
3. Take these screenshots:
   - Full page overview (scroll and capture all)
   - Summary section with violation counts
   - Detailed violation view
   - Element highlighting feature
4. Optimize images (use Squoosh.app or TinyPNG)
5. Save as: `docs/src/assets/images/cli-audit-report.webp`

**Use in:** Homepage audit section, Audit page

---

### 3. Record 2-Minute Tutorial Video

**What:** Installation to working example

**Script:**

1. (0-15s) Show inaccessible menu, try keyboard - doesn't work
2. (15-30s) Run `npm i aria-ease` in terminal
3. (30-60s) Add 3 lines of code to component
4. (60-90s) Show menu working with keyboard (Tab, Arrow, Escape)
5. (90-120s) Show audit passing, before/after scores

**Tools:**

- Screen recorder (OBS, QuickTime)
- KeyCastr for showing key presses
- Good microphone

**Save as:** `docs/src/assets/videos/quick-start-tutorial.mp4`

---

## 📸 High Priority (This Week)

### 4. Before/After Audit Scores

- [ ] Run Lighthouse/axe on a site WITHOUT aria-ease
- [ ] Run Lighthouse/axe on same site WITH aria-ease
- [ ] Screenshot both side-by-side
- [ ] Save as: `docs/src/assets/images/audit-before-after.webp`

### 5. Keyboard Interaction GIFs

- [ ] Menu navigation (arrows, tab, escape) - 15s
- [ ] Accordion navigation - 15s
- [ ] Block/form navigation - 15s
- [ ] Save to: `docs/src/assets/images/demos/`

---

## 🎨 Medium Priority (Next Week)

### 6. Design Assets

- [ ] Bundle size comparison chart (aria-ease vs alternatives)
- [ ] Framework support icons grid
- [ ] Component interaction flowchart diagrams

### 7. Update Package.json Description

**Current:**

```json
"description": "Out-of-the-box accessibility utility package"
```

**Change to:**

```json
"description": "Turn 50 lines of accessibility boilerplate into 3 lines. Keyboard interaction, focus management, and WCAG compliance for any framework."
```

### 8. Update README Badges

Add to top of package/README.md:

```markdown
![Bundle Size](https://img.shields.io/bundlephobia/minzip/aria-ease)
![GitHub Stars](https://img.shields.io/github/stars/aria-ease/aria-ease)
```

---

## 🚀 Testing Before Deploy

### Pre-launch Checklist:

- [ ] Test all new sections on mobile
- [ ] Verify dark mode throughout
- [ ] Check all links work
- [ ] Test keyboard interaction on new sections
- [ ] Run Lighthouse audit on updated homepage
- [ ] Check console for errors
- [ ] Test on different browsers (Chrome, Firefox, Safari)

---

## 📝 Content to Create (Lower Priority)

### 9. Social Media Posts

**Twitter/LinkedIn:**

```
🎯 Accessibility shouldn't be hard.

We turned 50 lines of boilerplate into 3 lines.

✅ Keyboard interaction
✅ Focus management
✅ WCAG 2.1 AA compliant
✅ Works with any framework

See the difference: [link to homepage]

#WebAccessibility #A11y #OpenSource
```

### 10. GitHub Release Notes

**When deploying:**

```markdown
## 🎉 Major Documentation Update

We've completely redesigned our documentation to better showcase what makes aria-ease special:

- 📊 Before/After code comparison (50 lines → 3 lines)
- 🎯 Quick start guide (get results in 5 minutes)
- 🚀 Emphasized CLI audit tool
- 📱 Migration guide for existing projects
- 💎 Developer experience section

Check it out: https://ariaease.site
```

---

## 🎥 Video Production Notes

### Recording Settings:

- **Resolution:** 1920x1080 (1080p)
- **Frame rate:** 30fps (60fps for smooth demos)
- **Audio:** 48kHz, clear voice, minimize background noise
- **Format:** MP4 (H.264)

### Editing Tips:

- Cut pauses and "umms"
- Speed up slow parts (1.25x-1.5x)
- Add text overlays for key points
- Include captions/subtitles
- Add your logo/branding

### Tools:

- **Mac:** QuickTime, iMovie, or DaVinci Resolve
- **Keyboard viz:** KeyCastr
- **Audio:** Audacity for cleanup if needed

---

## 📍 File Locations Reference

```
docs/
  src/
    assets/
      images/
        cli-audit-report.webp              # YOU CREATE THIS
        audit-before-after.webp            # YOU CREATE THIS
        bundle-size-comparison.svg         # YOU CREATE THIS
        demos/
          menu-navigation.gif              # YOU CREATE THIS
          accordion-navigation.gif         # YOU CREATE THIS
          block-navigation.gif             # YOU CREATE THIS
      videos/
        quick-start-tutorial.mp4           # YOU CREATE THIS
```

---

## ✅ Done When...

- [ ] All CodeBlock components have darkMode prop
- [ ] CLI audit screenshot added and integrated
- [ ] Tutorial video recorded and placed
- [ ] Before/after scores created
- [ ] Homepage tested on mobile and desktop
- [ ] Dark mode works perfectly
- [ ] No console errors
- [ ] All links functional
- [ ] Performance is good (Lighthouse > 90)

---

## 🆘 Need Help?

If you get stuck on:

- **Code changes:** Run `npm run dev` and check browser console
- **Video editing:** Use iMovie or DaVinci Resolve tutorials
- **Image optimization:** Use https://squoosh.app
- **Dark mode issues:** Make sure all CodeBlock gets darkMode prop

---

## 🎯 Goal

Launch a homepage that:

- Immediately shows value (50→3 lines)
- Explains why aria-ease is different
- Makes CLI tool prominent
- Provides clear adoption path
- Shows great developer experience

You've got this! 🚀
