@echo off
title DCS Pilot - Web Server
echo Starting DCS Pilot on http://localhost:4173
start "" "http://localhost:4173"
"%~dp0.venv\Scripts\python.exe" -m http.server 4173 --bind 0.0.0.0
pause
