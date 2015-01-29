@echo off

set package_id=%1
set source_path=%2
set output_path=%3

mkdir %output_path%\package_%package_id%

ping 234.23.111.2 -n 1 -w 10000
cp %source_path%/* %output_path%\package_%package_id%