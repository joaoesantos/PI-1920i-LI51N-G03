@echo off
for /R %%f in (.\*-tests.js) do call npx mocha %%f
pause