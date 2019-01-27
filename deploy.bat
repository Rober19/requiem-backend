@echo off
git status
MD tempF1
CD tempF1
for /F "usebackq tokens=1" %%A IN (`git config user.name`) do (
  set gituser=%%A
)
echo  ^<-- GIT User> "%gituser%"
findstr /A:0a /S "<--" "%gituser%" 
cd..
RD /s /q tempF1
git add -A
REM tambien en la fecha se puede usar el %date%
REM git commit -m "[%gituser%] [%date
str%] %commit% "
call npm version patch -f
git push origin master
pause