@echo off
echo Initializing Git repository...
git init

echo Adding all files...
git add .

echo Committing changes...
git commit -m "Enhance category images, layout, and logo"

echo Renaming branch to main...
git branch -M main

echo Setting remote URL to https://github.com/sssshyam/shreeshyamsilver.git...
git remote remove origin 2>nul
git remote add origin https://github.com/sssshyam/shreeshyamsilver.git

echo Pushing to GitHub...
echo Note: A popup may appear asking for your GitHub credentials.
git push -u origin main

echo Done!
pause
