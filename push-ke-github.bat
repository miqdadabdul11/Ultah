@echo off
title Push Website Ulang Tahun ke GitHub
echo ========================================================
echo Mendorong website ulang tahun ke GitHub...
echo Repositori: https://github.com/miqdadabdul11/Ultah.git
echo ========================================================
echo.
cd /d "%~dp0"
git push -u origin main
echo.
if %ERRORLEVEL% equ 0 (
    echo ========================================================
    echo BERHASIL! Website sudah ter-push ke GitHub.
    echo Silakan refresh halaman GitHub Anda.
    echo ========================================================
) else (
    echo Gagal melakukan push. Pastikan Anda sudah login saat jendela browser muncul.
)
pause
