# DCS Pilot

A Progressive Web App (PWA) designed for use on a tablet or laptop while flying in DCS World. Works fully offline after the first load. No internet connection or install required — it runs straight from your local machine.

---

## Features

| Tab | Description |
|---|---|
| **Checklists** | Aircraft checklists by phase — built-in F/A-18C, AH-64D, and more. Add custom checklists for any airframe. |
| **Charts** | Upload and view airport charts (images or PDFs) with pinch/zoom. |
| **Scratch Pad** | A quick free-text notepad that auto-saves. |
| **CAS** | Close Air Support 9-line and other call builders with reference cards. |
| **Conversions** | Convert between LL, DMS, DMM, and MGRS coordinates. |
| **W&B** | C-130J Weight & Balance calculator with drag-and-drop cargo hold. |
| **Manuals** | Upload and view aircraft manuals (PDFs or images) with pinch/zoom. |

---

## Requirements

- **Python 3** — used to serve the files over your local network.
  - Download from [python.org](https://www.python.org/downloads/) if not already installed.
  - During install, check **"Add Python to PATH"**.

---

## Setup

### 1. Clone or download this folder

Place the `checklist` folder somewhere permanent on your PC (e.g. `Desktop\checklist`).

### 2. Create the Python virtual environment (one time only)

Open a terminal inside the `checklist` folder and run:

```
python -m venv .venv
```

This creates a `.venv` folder used by the start script.

---

## Starting the Server

Double-click **`start.bat`**.

- A console window will open showing `Starting DCS Pilot on http://localhost:4173`.
- Your default browser will open automatically to the app.
- **Leave the console window open** — closing it stops the server.

To stop the server, close the console window or press any key inside it.

---

## Using on the Same Machine (PC / Laptop)

After double-clicking `start.bat`, the app opens automatically at:

```
http://localhost:4173
```

You can bookmark this address or install it as a PWA:
- **Chrome / Edge:** Click the install icon (⊕) in the address bar → *Install*.
- Once installed it behaves like a standalone app with no browser chrome.

---

## Using on a Tablet (iPad, Android, etc.)

Your tablet and PC must be on the **same Wi-Fi network**.

### Step 1 — Find your PC's local IP address

Open a terminal and run:

```
ipconfig
```

Look for **IPv4 Address** under your Wi-Fi adapter. It will look like `192.168.1.x`.

### Step 2 — Start the server

Double-click **`start.bat`** on your PC.

### Step 3 — Open on your tablet

On your tablet's browser, navigate to:

```
http://192.168.1.x:4173
```

(Replace `192.168.1.x` with the IP you found in Step 1.)

### Step 4 — Install as a PWA (recommended)

**iPad / iPhone (Safari):**
1. Open the URL in Safari.
2. Tap the **Share** button (box with arrow).
3. Tap **Add to Home Screen**.
4. Tap **Add**.

> ⚠️ **Note:** Safari PWAs have limited offline support. The server must still be running for the app to function. For better offline capability, use Chrome on iPad.

**Android (Chrome):**
1. Open the URL in Chrome.
2. Tap the three-dot menu → **Add to Home screen**.
3. Tap **Add**.

Once installed and loaded once, Android Chrome will cache the app and work **fully offline** — no server or Wi-Fi needed until you update the files.

---

## Adding Checklists

1. Go to the **Checklists** tab.
2. Tap **＋** in the sidebar.
3. Select aircraft type, pick or type an aircraft name, enter a phase name, then list items one per line.
4. Prefix any item with `*` to mark it as a **warning** item (highlighted in amber).

---

## Adding Charts or Manuals

1. Go to the **Charts** or **Manuals** tab.
2. Tap **＋** in the sidebar.
3. Select one or more image or PDF files from your device.

> **Note:** Files are stored in your browser's `localStorage`. Very large PDFs (over ~5 MB) may not save reliably. For best results, split large manuals into sections before uploading.

---

## Updating the App

When files are changed on the PC:

1. Restart the server (close and re-run `start.bat`).
2. On the browser/PWA, do a **hard refresh**:
   - **PC:** `Ctrl + Shift + R`
   - **iPad Safari:** Close the app fully from the app switcher, then reopen it.
   - **Android Chrome:** Menu → *Reload* or clear site cache.

The service worker will detect the new version and update automatically on the next reload.

---

## Folder Structure

```
checklist/
├── index.html         # App shell and all tab markup
├── app.js             # All application logic
├── style.css          # Styles
├── sw.js              # Service worker (offline caching)
├── manifest.json      # PWA manifest
├── start.bat          # One-click server launcher (Windows)
├── .venv/             # Python virtual environment
└── assets/
    ├── icons/             # PWA home screen icons
    ├── cargo-icons/       # W&B cargo type icons
    ├── cas_pdf_pages/     # CAS reference card images
    ├── load_sheet.svg     # C-130J cargo hold diagram
    └── jPub reference cards printable.pdf  # CAS reference PDF
```
