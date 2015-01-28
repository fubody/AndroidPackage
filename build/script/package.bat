@echo off

set package_id=%1
set source_path=%2
set output_path=%3

mkdir %output_path%\package_%package_id%

cp %source_path%/* %output_path%\package_%package_id%