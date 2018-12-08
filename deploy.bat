@echo off
MD tempF1
CD tempF1
for /F "usebackq tokens=1" %%A IN (`git config user.name`) do (
  set gituser=%%A
)
echo  ^<-- GIT User> "%gituser%"
findstr /A:0a /S "<--" "%gituser%" 
cd..
RD /s /q tempF1
echo.
set /p commit=Enter commit name: 
git add -A
for /f "tokens=1-4 delims=/ " %%i in ("%date%") do (
     set dow=%%i
     set month=%%j
     set day=%%k
     set year=%%l
)
set p1=%git config user.name%
echo %p1%
set datestr=%month%_%day%_%year%

xcopy "D:\Software\ProyectosWEB\SOA\Requiem-\backend-heroku\config" "D:\Software\ProyectosWEB\SOA\Requiem-\backend-github\config" /e /s /k /q /c /i /y /h
xcopy "D:\Software\ProyectosWEB\SOA\Requiem-\backend-heroku\controller" "D:\Software\ProyectosWEB\SOA\Requiem-\backend-github\controller" /e /s /k /q /c /i /y /h
REM xcopy "D:\Software\ProyectosWEB\SOA\Requiem-\backend-heroku\functions" "D:\Software\ProyectosWEB\SOA\Requiem-\backend-github\functions" /e /s /k /q /c /i /y /h
xcopy "D:\Software\ProyectosWEB\SOA\Requiem-\backend-heroku\middlewares" "D:\Software\ProyectosWEB\SOA\Requiem-\backend-github\middlewares" /e /s /k /q /c /i /y /h
xcopy "D:\Software\ProyectosWEB\SOA\Requiem-\backend-heroku\model" "D:\Software\ProyectosWEB\SOA\Requiem-\backend-github\model" /e /s /k /q /c /i /y /h
xcopy "D:\Software\ProyectosWEB\SOA\Requiem-\backend-heroku\routes" "D:\Software\ProyectosWEB\SOA\Requiem-\backend-github\routes" /e /s /k /q /c /i /y /h
xcopy "D:\Software\ProyectosWEB\SOA\Requiem-\backend-heroku\services" "D:\Software\ProyectosWEB\SOA\Requiem-\backend-github\services" /e /s /k /q /c /i /y /h
xcopy "D:\Software\ProyectosWEB\SOA\Requiem-\backend-heroku\model" "D:\Software\ProyectosWEB\SOA\Requiem-\backend-github\model" /e /s /k /q /c /i /y /h
REM xcopy "D:\Software\ProyectosWEB\SOA\Requiem-\backend-heroku\package.json" "D:\Software\ProyectosWEB\SOA\Requiem-\backend-github" /e /s /k /q /c /i /y /h
REM xcopy "D:\Software\ProyectosWEB\SOA\Requiem-\backend-heroku\index.js" "D:\Software\ProyectosWEB\SOA\Requiem-\backend-github" /e /s /k /q /c /i /y /h
REM xcopy "D:\Software\ProyectosWEB\SOA\Requiem-\backend-heroku\app.js" "D:\Software\ProyectosWEB\SOA\Requiem-\backend-github" /e /s /k /q /c /i /y /h
REM xcopy "D:\Software\ProyectosWEB\SOA\Requiem-\backend-heroku\.gitignore" "D:\Software\ProyectosWEB\SOA\Requiem-\backend-github" /e /s /k /q /c /i /y /h

git commit -m "[%gituser%] [%datestr%] %commit% "
git push origin master
